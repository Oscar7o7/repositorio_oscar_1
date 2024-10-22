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
class HistoryController extends AbstractController_1.default {
    constructor() {
        super();
    }
    RenderList(req, res) {
        const _super = Object.create(null, {
            getRoles: { get: () => super.getRoles }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new UserModel_1.default();
            const user = req.user;
            const take = req.query.take ? Number(req.query.take) : 10;
            const skip = req.query.skip ? Number(req.query.skip) : 0;
            const filter = [];
            const listPromise = instance.findManyHistory({
                filter: {},
                skip,
                take,
            });
            const countPromise = instance.countHistory({ filter: {} });
            const returnData = {
                currentPage: {
                    title: `Historial`,
                    notResult: `No hay historial`,
                    newLink: `/user/create`,
                    labels: [`Fecha`, `Responsable`, `Descripción`, `Acción`, ``],
                    actions: [
                        { label: `Panel`, path: `/`, permisson: [`ROOT`, `ADMIN`, `DOCTOR`] },
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
                filter: {
                    skip,
                    take
                }
            };
            const list = yield listPromise;
            const count = yield countPromise;
            // next
            returnData.foundNext = count - skip > 10 ? true : false;
            returnData.urlNext = `/history/?skip=${skip + 10}&take=${take}`;
            // previus
            returnData.foundPrevious = take <= skip ? true : false;
            returnData.urlPrevious = `/history/?skip=${skip - 10}&take=${take}`;
            returnData.list = list;
            returnData.countRender = `${count - skip < 11 ? count : skip + take}/${count}`;
            return res.render(`s/history/list.hbs`, returnData);
        });
    }
    RenderUnique(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const instance = new UserModel_1.default();
            const user = req.user;
            const data = instance.findHistory({ filter: { id } });
            const dataReturn = {
                data: [],
                form: {},
                year: yield instance.getYears(),
                currentPage: {
                    title: `Ver historial`,
                    notResult: `se encontró el historial ${id}`,
                    actions: [
                        { label: `Lista`, path: `/history`, permisson: [`ADMIN`, `DOCTOR`] },
                        { label: `Crear`, path: `/history/create`, permisson: [`ROOT`] },
                    ],
                    newLink: `/history/create`,
                    labels: [],
                },
                speciality: [],
            };
            const customData = yield data;
            if (customData === null || customData === void 0 ? void 0 : customData.action.includes(`delete`)) {
                dataReturn.currentPage.actions.push({ label: `Recuperar`, path: `/${customData.objectName}/${customData.objectId}/recovery`, permisson: [`ROOT`] });
            }
            dataReturn.data = yield data;
            return res.render(`s/history/unique.hbs`, dataReturn);
        });
    }
    loadRoutes() {
        this.router.get(`/history/`, auth_1.OnSession, auth_1.OnRoot, this.RenderList);
        this.router.get(`/history/:id`, auth_1.OnSession, auth_1.OnRoot, this.RenderUnique);
        return this.router;
    }
}
exports.default = HistoryController;
