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
const client_1 = require("@prisma/client");
const AbstractModel_1 = __importDefault(require("../AbstractModel"));
class InsumoModel extends AbstractModel_1.default {
    constructor() {
        super();
    }
    countInsumo(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filter }) {
            const prisma = new client_1.PrismaClient();
            return prisma.insumo.count({
                where: Object.assign(Object.assign({}, filter), { isDelete: false })
            });
        });
    }
    findInsumo(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filter }) {
            const prisma = new client_1.PrismaClient();
            return prisma.insumo.findFirst({
                where: Object.assign({}, filter),
                include: {
                    createReference: true,
                    _count: true,
                    categoryReference: true
                }
            });
        });
    }
    findManyInsumo(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filter, skip, take }) {
            const prisma = new client_1.PrismaClient();
            return prisma.insumo.findMany({
                where: Object.assign(Object.assign({}, filter), { isDelete: false }),
                include: {
                    createReference: true,
                    categoryReference: true,
                    _count: true
                },
                orderBy: { createAt: "asc" },
                skip,
                take
            });
        });
    }
    findManyInsumoMinStock(_a) {
        return __awaiter(this, arguments, void 0, function* ({ skip, take }) {
            const prisma = new client_1.PrismaClient();
            const result = yield prisma.insumo.findMany({
                where: { isDelete: false },
                select: { id: true, quantity: true, minStock: true, maxStock: true }
            });
        });
    }
    createInsumo(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data }) {
            const prisma = new client_1.PrismaClient();
            return prisma.insumo.create({
                data: Object.assign({}, data)
            });
        });
    }
    deleteInsumo(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const prisma = new client_1.PrismaClient();
            return prisma.insumo.update({
                where: { id },
                data: {
                    isDelete: true
                }
            });
        });
    }
    updateInsumo(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, data }) {
            const prisma = new client_1.PrismaClient();
            const found = yield prisma.insumo.findFirst({ where: { id } });
            if (found) {
                if (data.minStock && typeof data.minStock === `number` && Number(data.minStock) > found.quantity)
                    data.isMin = true;
                if (data.maxStock && typeof data.maxStock === `number` && Number(data.maxStock) < found.quantity)
                    data.isMax = true;
            }
            return prisma.insumo.update({
                where: { id },
                data: data
            });
        });
    }
}
exports.default = InsumoModel;
