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
const client_1 = require("@prisma/client");
const GraphicService_1 = __importDefault(require("../../service/GraphicService"));
const UserModel_1 = __importDefault(require("../../model/user/UserModel"));
const CategoryModel_1 = __importDefault(require("../../model/insumo/category/CategoryModel"));
class ApiGraphicController extends AbstractController_1.default {
    constructor() {
        super();
    }
    GenereteGraphic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const userModel = new UserModel_1.default();
            const { id, ObjectName, year = 2024 } = req.query;
            const service = new GraphicService_1.default();
            const result = yield service.GenerateYear({ id, ObjectName, year });
            return res.status(200).json(result);
        });
    }
    GenereteGraphicMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, ObjectName, month, year } = req.query;
            const service = new GraphicService_1.default();
            const result = yield service.GenerateMonth({ id, ObjectName, month: month ? Number(month) : service.getMonth(), year: year ? Number(year) : service.getYear() });
            return res.status(200).json(result);
        });
    }
    GenereteGraphicCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = new CategoryModel_1.default();
            const listCategory = yield category.findManyCategory({ filter: { isDelete: false }, skip: 0, take: 10 });
            const labels = [];
            const values = [];
            listCategory.forEach((item) => {
                labels.push(item.name);
                values.push(item._count.insumo);
            });
            return res.status(200).json({ labels, values });
        });
    }
    loadRoutes() {
        this.router.get(`/api/graphic/year`, this.GenereteGraphic);
        this.router.get(`/api/graphic/month`, this.GenereteGraphicMonth);
        this.router.get(`/api/graphic/category`, this.GenereteGraphicCategory);
        return this.router;
    }
}
exports.default = ApiGraphicController;
