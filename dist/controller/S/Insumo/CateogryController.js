"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = __importDefault(require("../../AbstractController"));
const CategoryModel_1 = __importDefault(require("../../../model/insumo/category/CategoryModel"));
const auth_1 = require("../../../middlewares/auth");
class CategoryController extends AbstractController_1.default {
    constructor() {
        super();
    }
    RenderCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.render(`s/insumo/category/create.hbs`, {
                currentPage: {
                    title: `Crear categoria`,
                    notResult: ``,
                    labels: [],
                    actions: [
                        { label: `Panel`, path: `/`, permissions: [`ROOT`, `ADMIN`, `DOCTOR`] },
                        { label: `Insumos`, path: `/insumo`, permissions: [`ROOT`, `ADMIN`, `DOCTOR`] },
                        { label: `Lista`, path: `/insumo/category/`, permissions: [`ROOT`, `ADMIN`, `DOCTOR`] },
                    ],
                }
            });
        });
    }
    RenderUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new CategoryModel_1.default();
            const id = req.params.id;
            const result = instance.findCategory({ filter: { id } });
            return res.render(`s/insumo/category/update.hbs`, {
                data: yield result,
                id,
                currentPage: {
                    title: `Actualizar Categoria`,
                    notResult: `se encontró la categoria ${id}`,
                    actions: [
                        { label: `Insumos`, path: `/insumo/?categoryId=${id}`, permissions: [`ROOT`, `ADMIN`, `DOCTOR`] },
                        { label: `Lista`, path: `/insumo/category`, permissions: [`ROOT`, `ADMIN`, `DOCTOR`] },
                        { label: `Crear`, path: `/insumo/category/create`, permissions: [`ROOT`, `ADMIN`] },
                        { label: `Eliminar`, path: `/insumo/category/${id}/delete` },
                    ],
                    labels: [],
                },
            });
        });
    }
    RenderList(req, res) {
        const _super = Object.create(null, {
            getRoles: { get: () => super.getRoles }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new CategoryModel_1.default();
            const user = req.user;
            const { param } = req.query;
            let queryString = ``;
            const take = req.query.take ? Number(req.query.take) : 10;
            const skip = req.query.skip ? Number(req.query.skip) : 0;
            const filter = [];
            // filter.push({ isDelete:false });
            if (param) {
                queryString += `param=${param}`;
                filter.push({ name: { contains: param } });
            }
            const listPromise = instance.findManyCategory({
                filter: { AND: [{ isDelete: false }, { OR: filter }] },
                skip,
                take,
            });
            const countPromise = instance.countCategory({ filter: { AND: [{ isDelete: false }, { OR: filter }] } });
            const returnData = {
                currentPage: {
                    title: `Categorias`,
                    notResult: `No hay categorias`,
                    labels: [`Nombre`, `Creador`, `Insumos`, ``],
                    actions: [
                        { label: `Insumos`, path: `/insumo`, permissions: [`ROOT`, `ADMIN`, `DOCTOR`] },
                        { label: `Crear`, path: `/insumo/category/create`, permissions: [`ROOT`, `ADMIN`] },
                    ],
                },
                list: [],
                countRender: ``,
                foundNext: false,
                urlNext: ``,
                foundPrevious: false,
                urlPrevious: ``,
                roleList: _super.getRoles.call(this),
                address: [],
                speciality: [],
                search: {
                    status: true,
                    path: `/insumo/category/`,
                    value: param
                },
                filter: {
                    skip,
                    take,
                    param
                }
            };
            const list = yield listPromise;
            const count = yield countPromise;
            // next
            returnData.foundNext = count - skip > 10 ? true : false;
            returnData.urlNext = `/insumo/category/?skip=${skip + 10}&take=${take}`;
            // previus
            returnData.foundPrevious = take <= skip ? true : false;
            returnData.urlPrevious = `/insumo/category/?skip=${skip - 10}&take=${take}`;
            if (queryString) {
                returnData.urlNext += `&${queryString}`;
                returnData.urlPrevious += `&${queryString}`;
            }
            returnData.list = list;
            returnData.countRender = `${count - skip < 11 ? count : skip + take}/${count}`;
            return res.render(`s/insumo/category/list.hbs`, returnData);
        });
    }
    RenderUnique(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const instance = new CategoryModel_1.default();
            const data = instance.findCategory({ filter: { id } });
            const dataReturn = {
                data: [],
                form: {},
                speciality: [],
                currentPage: {
                    title: `Ver categoria`,
                    notResult: `se encontró la categoria ${id}`,
                    actions: [
                        { label: `Lista`, path: `/insumo/category` },
                        { label: `Crear`, path: `/insumo/category/create` },
                    ],
                    labels: [],
                },
            };
            dataReturn.data = yield data;
            return res.render(`s/insumo/category/unique.hbs`, dataReturn);
        });
    }
    CreateLogic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new CategoryModel_1.default();
                const { name } = req.body;
                const user = req.user;
                if (!name) {
                    req.flash(`error`, `Debe completar los datos correctamente`);
                    return res.redirect(`/insumo/category/`);
                }
                let data = {
                    createReference: { connect: { id: user.id } },
                    name,
                };
                let currentDescription = `Nombre:${name}, creador: ${user.name} ${user.lastname}`;
                yield instance.createCategory({ data });
                if (user) {
                    yield instance.PushStatictics({ objectId: user.id, objectName: `user` });
                }
                yield instance.CreateHistory({
                    description: `creación de categoria`,
                    userReference: { connect: { id: user.id } },
                    objectId: user.id,
                    objectName: `insumo/category`,
                    objectReference: true,
                    action: `create.category`,
                    descriptionAlt: currentDescription
                });
                req.flash(`succ`, `Categoria creada.`);
                return res.redirect(`/insumo/category/`);
            }
            catch (error) {
                req.flash(`Error`, `Error temporal.`);
                return res.redirect(`/insumo/category/`);
            }
        });
    }
    EditLogic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new CategoryModel_1.default();
                const { name } = req.body;
                const user = req.user;
                const id = req.params.id;
                let dataUpdate = {};
                let currentDescription = `actualizador: ${user.name} ${user.lastname}`;
                if (name) {
                    currentDescription += `, nombre:${name}`;
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { name });
                }
                if (user) {
                    yield instance.PushStatictics({ objectId: user.id, objectName: `user` });
                }
                yield instance.updateCategory({
                    data: dataUpdate,
                    id
                });
                yield instance.CreateHistory({
                    description: `actualización de categoria`,
                    userReference: { connect: { id: user.id } },
                    objectId: id,
                    objectName: `insumo/category`,
                    objectReference: true,
                    action: `update.category`,
                    descriptionAlt: currentDescription
                });
                // req.flash(`succ`, `Usuario actualizado`);
                return res.redirect(`/insumo/category`);
            }
            catch (error) {
                req.flash(`Error`, `Error temporal`);
                return res.redirect(`/insumo/category/`);
            }
        });
    }
    DeleteLogic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new CategoryModel_1.default();
                const user = req.user;
                const id = req.params.id;
                yield instance.deleteCategory({ id });
                if (user) {
                    yield instance.PushStatictics({ objectId: user.id, objectName: `user` });
                }
                const customDescription = `eliminador: ${user.name} ${user.lastname}`;
                yield instance.CreateHistory({
                    description: `eliminación de categoria`,
                    userReference: { connect: { id: user.id } },
                    objectId: id,
                    objectName: `insumo/category`,
                    objectReference: true,
                    action: `delete.category`,
                    descriptionAlt: customDescription
                });
                req.flash(`succ`, `Eliminado exitosamente.`);
                return res.redirect(`/insumo/category/`);
            }
            catch (error) {
                req.flash(`Error`, `Error temporal`);
                return res.redirect(`/insumo/category/`);
            }
        });
    }
    Recovery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new CategoryModel_1.default();
                const user = req.user;
                const id = req.params.id;
                let currentDescription = `recuperador: ${user.name} ${user.lastname}`;
                if (user) {
                    yield instance.PushStatictics({ objectId: user.id, objectName: `user` });
                }
                yield instance.updateCategory({
                    data: { isDelete: false },
                    id
                });
                yield instance.CreateHistory({
                    description: `recuperación de categoria`,
                    userReference: { connect: { id: user.id } },
                    objectId: id,
                    objectName: `insumo/category`,
                    objectReference: true,
                    action: `recovery.category`,
                    descriptionAlt: currentDescription
                });
                // req.flash(`succ`, `Usuario actualizado`);
                return res.redirect(`/insumo/category`);
            }
            catch (error) {
                req.flash(`Error`, `Error temporal`);
                return res.redirect(`/insumo/category/`);
            }
        });
    }
    loadRoutes() {
        this.router.get(`/insumo/category/create`, auth_1.OnSession, this.RenderCreate);
        this.router.get(`/insumo/category/`, auth_1.OnSession, this.RenderList);
        this.router.get(`/insumo/category/:id`, auth_1.OnSession, this.RenderUnique);
        this.router.get(`/insumo/category/:id/update`, auth_1.OnSession, this.RenderUpdate);
        this.router.get(`/insumo/category/:id/recovery`, auth_1.OnSession, auth_1.OnRoot, this.Recovery);
        this.router.post(`/insumo/category/create`, auth_1.OnSession, this.CreateLogic);
        this.router.post(`/insumo/category/:id/update`, auth_1.OnSession, this.EditLogic);
        this.router.get(`/insumo/category/:id/delete`, auth_1.OnSession, auth_1.OnAdminORRoot, this.DeleteLogic);
        return this.router;
    }
}
exports.default = CategoryController;
