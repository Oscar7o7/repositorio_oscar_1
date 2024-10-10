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
const auth_1 = require("../../middlewares/auth");
const UserModel_1 = __importDefault(require("../../model/user/UserModel"));
const InsumoModel_1 = __importDefault(require("../../model/insumo/InsumoModel"));
class DashboardController extends AbstractController_1.default {
    constructor(prefix = ``) {
        super();
        this.prefix = prefix;
    }
    RenderDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const userModel = new UserModel_1.default();
            const insumoModel = new InsumoModel_1.default();
            const countUser = userModel.countUser({ filter: {} });
            const countInsumo = insumoModel.countInsumo({ filter: {} });
            const countMinInsumo = insumoModel.countInsumo({ filter: { isMin: true } });
            const countMaxInsumo = insumoModel.countInsumo({ filter: { isMax: true } });
            const dataReturn = {
                yearList: yield userModel.GetAllYears(),
                cards: [
                    { path: `/user`, label: `Usuarios`, ico: `user.png`, count: yield countUser },
                    { path: `/insumo`, label: `Inusmos`, ico: `insumo.png`, count: yield countInsumo },
                    { path: `/insumo/?stock=min`, label: `Mínimo insumos`, ico: `insumo.png`, count: yield countMinInsumo },
                    { path: `/insumo/?stock=max`, label: `Máximo insumos`, ico: `insumo.png`, count: yield countMaxInsumo },
                ],
            };
            return res.render(`s/dashboard.hbs`, dataReturn);
        });
    }
    RenderStock(req, res) {
        const _super = Object.create(null, {
            getRoles: { get: () => super.getRoles }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const userModel = new UserModel_1.default();
            const insumoModel = new InsumoModel_1.default();
            const { param, stock } = req.query;
            let queryString = ``;
            const take = req.query.take ? Number(req.query.take) : 10;
            const skip = req.query.skip ? Number(req.query.skip) : 0;
            const filter = [];
            if (param) {
                queryString += `param=${param}`;
                filter.push({ name: { contains: param } });
            }
            if (stock === "min")
                filter.push({ isMin: true });
            if (stock === "max")
                filter.push({ isMax: true });
            if (stock === "all") { }
            const listPromise = insumoModel.findManyInsumo({
                filter: { AND: [{ isDelete: false }, { OR: filter }] },
                skip,
                take,
            });
            const countPromise = insumoModel.countInsumo({ filter: { AND: [{ isDelete: false }, { OR: filter }] } });
            const countInsumo = insumoModel.countInsumo({ filter: {} });
            const countMinInsumo = insumoModel.countInsumo({ filter: { isMin: true } });
            const countMaxInsumo = insumoModel.countInsumo({ filter: { isMax: true } });
            const returnData = {
                currentPage: {
                    title: `Insumos`,
                    notResult: `No hay insumos`,
                    labels: [`Nombre`, `<a href="/insumo/?stock=min">Mínimo</a>`, `<a href="/insumo/?stock=max">Máximo</a>`, `Cantidad`, ``],
                },
                cards: [
                    { path: `/insumo`, label: `Inusmos`, ico: `insumo.png`, count: yield countInsumo },
                    { path: `/insumo/?stock=min`, label: `Mínimo insumos`, ico: `insumo.png`, count: yield countMinInsumo },
                    { path: `/insumo/?stock=max`, label: `Máximo insumos`, ico: `insumo.png`, count: yield countMaxInsumo },
                ],
                list: [],
                countRender: ``,
                foundNext: false,
                urlNext: ``,
                foundPrevious: false,
                urlPrevious: ``,
                roleList: _super.getRoles.call(this),
                address: [],
                speciality: [],
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
            return res.render(`s/stock.hbs`, returnData);
        });
    }
    UpdateQuantoty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const insumoModel = new InsumoModel_1.default();
            const { idInsumo, insumoQuantity, insumoId } = req.body;
            const result = yield insumoModel.updateInsumo({ data: { quantity: Number(insumoQuantity) }, id: idInsumo });
            if (user) {
                yield insumoModel.PushStatictics({ objectId: user.id, objectName: `user` });
            }
            yield insumoModel.PushStatictics({ objectId: idInsumo, objectName: `insumo` });
            yield insumoModel.PushStatictics({ objectId: `all_insumo`, objectName: `insumo` });
            yield insumoModel.CreateHistory({
                description: `actualización de insumo ${result.name}`,
                userReference: { connect: { id: user.id } },
                objectId: user.id,
                objectName: `insumo`,
                objectReference: true
            });
            return res.redirect(`/stock`);
        });
    }
    loadRoutes() {
        this.router.get(`/dashboard`, auth_1.OnSession, this.RenderDashboard);
        this.router.get(`/stock`, auth_1.OnSession, this.RenderStock);
        this.router.post(`/stock`, auth_1.OnSession, this.UpdateQuantoty);
        return this.router;
    }
}
exports.default = DashboardController;
