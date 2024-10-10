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
const UserModel_1 = __importDefault(require("../../model/user/UserModel"));
const InsumoModel_1 = __importDefault(require("../../model/insumo/InsumoModel"));
class ApiInsumoController extends AbstractController_1.default {
    constructor() {
        super();
    }
    FindInsumo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const userModel = new UserModel_1.default();
            const insumo = new InsumoModel_1.default();
            const { id } = req.query;
            const insumoFound = yield insumo.findInsumo({ filter: { id } });
            return res.status(200).json({ body: insumoFound });
        });
    }
    FindAllInsumos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const userModel = new UserModel_1.default();
            const insumo = new InsumoModel_1.default();
            const { param } = req.query;
            const insumoFounds = yield insumo.findManyInsumo({
                filter: {
                    AND: [
                        { name: { contains: param } },
                        { isDelete: false }
                    ]
                },
                skip: 0,
                take: 20
            });
            return res.status(200).json({ body: insumoFounds });
        });
    }
    loadRoutes() {
        this.router.get(`/api/insumo/`, this.FindInsumo);
        this.router.get(`/api/insumos/`, this.FindAllInsumos);
        return this.router;
    }
}
exports.default = ApiInsumoController;
