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
const AbstractController_1 = __importDefault(require("../AbstractController"));
const UserModel_1 = __importDefault(require("../../model/user/UserModel"));
const auth_1 = require("../../middlewares/auth");
class UserController extends AbstractController_1.default {
    constructor() { super(); }
    RenderCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.render(`s/user/create.hbs`, {
                currentPage: {
                    title: `Crear Usuario`,
                    notResult: ``,
                    labels: [`Nombre`, `Cédula`, `Correo`, `Rol`, ``],
                    actions: [
                        { label: `Panel`, path: `/` },
                        { label: `Lista`, path: `/user/` },
                    ],
                }
            });
        });
    }
    RenderUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new UserModel_1.default();
            const id = req.params.id;
            const result = instance.findUser({ filter: { id } });
            return res.render(`s/user/update.hbs`, {
                data: yield result,
                id,
                currentPage: {
                    title: `Actualizar Usuarios`,
                    notResult: `se encontró el usuario ${id}`,
                    actions: [
                        { label: `Lista`, path: `/user` },
                        { label: `Crear`, path: `/user/create` },
                    ],
                    newLink: `/user/create`,
                    labels: [`Nombre`, `Cédula`, `Correo`, `Rol`, ``],
                },
            });
        });
    }
    RenderList(req, res) {
        const _super = Object.create(null, {
            getRoles: { get: () => super.getRoles }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new UserModel_1.default();
            const user = req.user;
            const { param, role } = req.query;
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
                filter.push({ email: { contains: param } });
                filter.push({ lastname: { contains: param } });
                filter.push({ ci: { contains: param } });
                filter.push({ cmeg_n: { contains: param } });
                filter.push({ matricula: { contains: param } });
            }
            if (role) {
                queryString += queryString ? `&role=${role}` : `role=${role}`;
                // if(filter.length > 0) {
                //     return;
                // }
                filter.push({ role: role });
            }
            const listPromise = instance.findManyUser({
                filter: { AND: [{ isDelete: false }, { OR: filter }] },
                skip,
                take,
            });
            const countPromise = instance.countUser({ filter: { AND: [{ isDelete: false }, { OR: filter }] } });
            const returnData = {
                currentPage: {
                    title: `Usuarios`,
                    notResult: `No hay usuarios`,
                    newLink: `/user/create`,
                    labels: [`Nombre`, `Cédula`, `Correo`, `Rol`, ``],
                    actions: [
                        { label: `Panel`, path: `/`, permisson: [`ROOT`, `ADMIN`, `DOCTOR`] },
                        { label: `Crear`, path: `/user/create`, permisson: [`ROOT`] },
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
                    path: `/user/`,
                    value: param
                },
                filter: {
                    skip,
                    take,
                    param,
                    role
                }
            };
            const list = yield listPromise;
            const count = yield countPromise;
            // next
            returnData.foundNext = count - skip > 10 ? true : false;
            returnData.urlNext = `/user/?skip=${skip + 10}&take=${take}`;
            // previus
            returnData.foundPrevious = take <= skip ? true : false;
            returnData.urlPrevious = `/user/?skip=${skip - 10}&take=${take}`;
            if (queryString) {
                returnData.urlNext += `&${queryString}`;
                returnData.urlPrevious += `&${queryString}`;
            }
            returnData.list = list;
            returnData.countRender = `${count - skip < 11 ? count : skip + take}/${count}`;
            return res.render(`s/user/list.hbs`, returnData);
        });
    }
    RenderUnique(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const instance = new UserModel_1.default();
            const user = req.user;
            const data = instance.findUser({ filter: { id } });
            const dataReturn = {
                data: [],
                form: {},
                yearList: yield instance.GetAllYears(),
                year: yield instance.getYears(),
                currentPage: {
                    title: `Ver usuario`,
                    notResult: `se encontró el usuario ${id}`,
                    actions: [
                        { label: `Lista`, path: `/user`, permisson: [`ADMIN`, `DOCTOR`] },
                        { label: `Crear`, path: `/user/create`, permisson: [`ROOT`] },
                    ],
                    newLink: `/user/create`,
                    labels: [],
                },
            };
            dataReturn.data = yield data;
            return res.render(`s/user/unique.hbs`, dataReturn);
        });
    }
    CreateLogic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new UserModel_1.default();
                const { name, ci, email, lastname, role } = req.body;
                const user = req.user;
                if (user) {
                    yield instance.PushStatictics({ objectId: user.id, objectName: `user` });
                }
                if (!name) {
                    req.flash(`error`, `Debe completar los datos correctamente`);
                    return res.redirect(`/user/`);
                }
                let data = {
                    ci,
                    email,
                    password: ci,
                    name,
                    lastname,
                    role,
                };
                yield instance.createUser({ data });
                yield instance.CreateHistory({
                    description: `creación de usuario`,
                    userReference: { connect: { id: user.id } },
                    objectId: user.id,
                    objectName: `usuario`,
                    objectReference: true
                });
                req.flash(`succ`, `Usuario creado`);
                return res.redirect(`/user/`);
            }
            catch (error) {
                req.flash(`Error`, `Error temporal`);
                return res.redirect(`/user/`);
            }
        });
    }
    EditLogic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new UserModel_1.default();
                const user = req.user;
                const { ci, name, lastname, email } = req.body;
                const id = req.params.id;
                let dataUpdate = {};
                if (ci)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { ci });
                if (email)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { email });
                if (name)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { name });
                if (lastname)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { lastname });
                if (email)
                    dataUpdate = Object.assign(Object.assign({}, dataUpdate), { email });
                yield instance.updateUser({
                    data: dataUpdate,
                    id
                });
                if (user) {
                    yield instance.PushStatictics({ objectId: user.id, objectName: `user` });
                }
                yield instance.CreateHistory({
                    description: `actualización de usuario`,
                    userReference: { connect: { id } },
                    objectId: id,
                    objectName: `usuario`,
                    objectReference: true
                });
                req.flash(`succ`, `Usuario actualizado`);
                return res.redirect(req.query.next ? req.query.next : `/profile`);
            }
            catch (error) {
                req.flash(`Error`, `Error temporal`);
                return res.redirect(`/user/`);
            }
        });
    }
    DeleteLogic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new UserModel_1.default();
                const id = req.params.id;
                const user = req.user;
                yield instance.deleteUser({ id });
                if (user) {
                    yield instance.PushStatictics({ objectId: user.id, objectName: `user` });
                }
                yield instance.CreateHistory({
                    description: `actualización de usuario`,
                    userReference: { connect: { id } },
                    objectId: id,
                    objectName: `usuario`,
                    objectReference: true
                });
                req.flash(`succ`, `Eliminado exitosamente.`);
                return res.redirect(`/user/`);
            }
            catch (error) {
                req.flash(`Error`, `Error temporal`);
                return res.redirect(`/user/`);
            }
        });
    }
    UpdatePasswordLogic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = new UserModel_1.default();
                const { password, passwordNew, passwordRepeat, currentPassword } = req.body;
                const id = req.params.id;
                const user = req.user;
                if (user) {
                    yield instance.PushStatictics({ objectId: user.id, objectName: `user` });
                }
                if (passwordNew !== passwordRepeat) {
                    req.flash(`err`, `Las contraseñas no coinciden`);
                    return res.redirect(`/profile`);
                }
                const compare = yield instance.ComparePassword({ dbPassword: currentPassword, password });
                if (!compare) {
                    req.flash(`err`, `Las contraseñas no coinciden`);
                    return res.redirect(`/profile`);
                }
                yield instance.updateUser({
                    data: {
                        password: yield instance.HashPassword({ password: passwordNew }),
                    },
                    id
                });
                yield instance.CreateHistory({
                    description: `creación de usuario contraseña`,
                    userReference: { connect: { id } },
                    objectId: id,
                    objectName: `usuario`,
                    objectReference: true
                });
                req.flash(`succ`, `Usuario actualizado`);
                return res.render(`/profiel`);
            }
            catch (error) {
                req.flash(`Error`, `Error temporal`);
                return res.redirect(`/profile/`);
            }
        });
    }
    loadRoutes() {
        this.router.get(`/user/create`, auth_1.OnSession, auth_1.OnRoot, this.RenderCreate);
        this.router.get(`/user/`, auth_1.OnSession, auth_1.OnRoot, this.RenderList);
        this.router.get(`/user/:id`, auth_1.OnSession, auth_1.OnRoot, this.RenderUnique);
        this.router.get(`/user/:id/update`, auth_1.OnSession, auth_1.OnRoot, this.RenderUpdate);
        this.router.post(`/user/create`, auth_1.OnSession, auth_1.OnRoot, this.CreateLogic);
        this.router.post(`/user/:id/update`, auth_1.OnSession, auth_1.OnRoot, this.EditLogic);
        this.router.post(`/user/:id/password`, auth_1.OnSession, auth_1.OnRoot, this.UpdatePasswordLogic);
        this.router.post(`/user/:id/delete`, auth_1.OnSession, auth_1.OnRoot, auth_1.OnAdmin, this.DeleteLogic);
        return this.router;
    }
}
exports.default = UserController;
