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
const InsumoModel_1 = __importDefault(require("../../../model/insumo/InsumoModel"));
const CategoryModel_1 = __importDefault(require("../../../model/insumo/category/CategoryModel"));
const auth_1 = require("../../../middlewares/auth");
class InsumoController extends AbstractController_1.default {
    constructor() {
        super();
    }
    RenderCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = new CategoryModel_1.default();
            const result = category.findManyCategory({ filter: { isDelete: false }, skip: 0, take: 100 });
            return res.render(`s/insumo/create.hbs`, {
                category: yield result,
                currentPage: {
                    title: `Crear Insumo`,
                    notResult: ``,
                    labels: [],
                    actions: [
                        { label: `Panel`, path: `/`, permissions: [`ROOT`, `ADMIN`, `DOCTOR`] },
                        { label: `Lista`, path: `/insumo/`, permissions: [`ROOT`, `ADMIN`, `DOCTOR`] },
                    ],
                }
            });
        });
    }
    RenderUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new InsumoModel_1.default();
            const id = req.params.id;
            const result = instance.findInsumo({ filter: { id } });
            const category = new CategoryModel_1.default();
            const resultCategory = category.findManyCategory({ filter: { isDelete: false }, skip: 0, take: 100 });
            return res.render(`s/insumo/update.hbs`, {
                data: yield result,
                category: yield resultCategory,
                id,
                currentPage: {
                    title: `Actualizar Insumo`,
                    notResult: `se encontró el insumo ${id}`,
                    actions: [
                        { label: `Lista`, path: `/insumo`, permissions: [`ROOT`, `ADMIN`, `DOCTOR`] },
                        { label: `Crear`, path: `/insumo/create`, permissions: [`ROOT`, `ADMIN`] },
                    ],
                    newLink: `/insumo/create`,
                    labels: [`Nombre`, `Creador`, `Categoría`, , ``],
                },
            });
        });
    }
    RenderList(req, res) {
        const _super = Object.create(null, {
            getRoles: { get: () => super.getRoles }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new InsumoModel_1.default();
            const { param, stock } = req.query;
            let queryString = ``;
            // rol
            // param (email,name,lastname,ci,cmeg,matricula,address)
            const take = req.query.take ? Number(req.query.take) : 10;
            const skip = req.query.skip ? Number(req.query.skip) : 0;
            const filter = [];
            // filter.push({ isDelete:false });
            if (param) {
                queryString += `param=${param}`;
                filter.push({ name: { contains: param } });
            }
            if (stock === "min")
                filter.push({ isMin: true });
            if (stock === "max")
                filter.push({ isMax: true });
            if (stock === "all") { }
            const listPromise = instance.findManyInsumo({
                filter: { AND: [{ isDelete: false }, { OR: filter }] },
                skip,
                take,
            });
            const countPromise = instance.countInsumo({ filter: { AND: [{ isDelete: false }, { OR: filter }] } });
            const returnData = {
                currentPage: {
                    title: `Insumos`,
                    notResult: `No hay insumos`,
                    newLink: `/user/create`,
                    labels: [`Nombre`, `Creador`, `Categoria`, `<a href="/insumo/?stock=min">Mínimo</a>`, `<a href="/insumo/?stock=max">Máximo</a>`, `Cantidad`, ``],
                    actions: [
                        { label: `Actualizar`, path: `/insumo` },
                        { label: `Panel`, path: `/` },
                        { label: `Crear`, path: `/insumo/create`, permissions: [`ROOT`, `ADMIN`] },
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
                    path: `/insumo/`,
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
            returnData.urlNext = `/insumo/?skip=${skip + 10}&take=${take}`;
            // previus
            returnData.foundPrevious = take <= skip ? true : false;
            returnData.urlPrevious = `/insumo/?skip=${skip - 10}&take=${take}`;
            if (queryString) {
                returnData.urlNext += `&${queryString}`;
                returnData.urlPrevious += `&${queryString}`;
            }
            returnData.list = list;
            returnData.countRender = `${count - skip < 11 ? count : skip + take}/${count}`;
            return res.render(`s/insumo/list.hbs`, returnData);
        });
    }
    RenderUnique(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const instance = new InsumoModel_1.default();
            const user = req.user;
            const data = instance.findInsumo({ filter: { id } });
            const dataReturn = {
                data: [],
                yearList: yield instance.GetAllYears(),
                currentPage: {
                    title: `Insumo`,
                    notResult: `No se encontró el insumo ${id}`,
                    labels: [],
                    actions: [
                        { label: `Lista`, path: `/insumo` },
                        { label: `Crear`, path: `/insumo/create`, permissions: [`ROOT`, `ADMIN`] },
                    ],
                },
            };
            dataReturn.data = yield data;
            return res.render(`s/insumo/unique.hbs`, dataReturn);
        });
    }
    CreateLogic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new InsumoModel_1.default();
                const { name, categoryId, description, maxStock, minStock, priceUnitary, quantity } = req.body;
                const user = req.user;
                let data = {
                    categoryReference: { connect: { id: categoryId } },
                    createReference: { connect: { id: user.id } },
                    name,
                    description,
                    maxStock: maxStock ? Number(maxStock) : 100,
                    minStock: minStock ? Number(minStock) : 0,
                    priceUnitary: priceUnitary ? Number(priceUnitary) : 0,
                    quantity: quantity ? Number(quantity) : 0,
                };
                yield instance.createInsumo({ data });
                yield instance.CreateHistory({
                    description: `creación de insumo (${data.name})`,
                    userReference: { connect: { id: user.id } },
                    objectId: user.id,
                    objectName: `insumo`,
                    objectReference: true
                });
                if (user) {
                    yield instance.PushStatictics({ objectId: user.id, objectName: `user` });
                }
                req.flash(`succ`, `Insumo creado`);
                return res.redirect(`/insumo/`);
            }
            catch (error) {
                req.flash(`Error`, `Error temporal`);
                return res.redirect(`/insumo/`);
            }
        });
    }
    EditLogic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new InsumoModel_1.default();
                const user = req.user;
                const { name, categoryId, description, maxStock, minStock, priceUnitary, quantity } = req.body;
                const id = req.params.id;
                let dataUpdate = {};
                if (user) {
                    yield instance.PushStatictics({ objectId: user.id, objectName: `user` });
                }
                if (name)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { name });
                if (description)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { description });
                if (maxStock)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { maxStock: Number(maxStock) });
                if (minStock)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { minStock: Number(minStock) });
                if (priceUnitary)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { priceUnitary: Number(priceUnitary) });
                if (quantity)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { quantity: Number(quantity) });
                if (categoryId)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { categoryReference: { connect: { id: categoryId } } });
                yield instance.updateInsumo({
                    data: dataUpdate,
                    id
                });
                yield instance.PushStatictics({ objectId: id, objectName: `insumo` });
                yield instance.PushStatictics({ objectId: `all_insumo`, objectName: `insumo` });
                yield instance.CreateHistory({
                    description: `actualización de insumo ${dataUpdate.name}`,
                    userReference: { connect: { id: user.id } },
                    objectId: user.id,
                    objectName: `insumo`,
                    objectReference: true
                });
                // req.flash(`succ`, `Usuario actualizado`);
                return res.redirect(`/insumo`);
            }
            catch (error) {
                req.flash(`Error`, `Error temporal`);
                return res.redirect(`/insumo`);
            }
        });
    }
    DeleteLogic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new InsumoModel_1.default();
                const id = req.params.id;
                const user = req.user;
                yield instance.deleteInsumo({ id });
                if (user) {
                    yield instance.PushStatictics({ objectId: user.id, objectName: `user` });
                }
                yield instance.CreateHistory({
                    description: `eliminación de insumo`,
                    userReference: { connect: { id: user.id } },
                    objectId: user.id,
                    objectName: `insumo`,
                    objectReference: true
                });
                req.flash(`succ`, `Eliminado exitosamente.`);
                return res.redirect(`/insumo/`);
            }
            catch (error) {
                req.flash(`Error`, `Error temporal`);
                return res.redirect(`/insumo/`);
            }
        });
    }
    loadRoutes() {
        this.router.get(`/insumo/create`, auth_1.OnSession, this.RenderCreate);
        this.router.get(`/insumo/`, auth_1.OnSession, this.RenderList);
        this.router.get(`/insumo/:id/unique`, auth_1.OnSession, this.RenderUnique);
        this.router.get(`/insumo/:id/update`, auth_1.OnSession, this.RenderUpdate);
        this.router.post(`/insumo/create`, auth_1.OnSession, this.CreateLogic);
        this.router.post(`/insumo/:id/update`, auth_1.OnSession, this.EditLogic);
        this.router.post(`/insumo/:id/delete`, auth_1.OnSession, auth_1.OnAdmin, this.DeleteLogic);
        return this.router;
    }
}
exports.default = InsumoController;
