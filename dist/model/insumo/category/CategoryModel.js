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
const AbstractModel_1 = __importDefault(require("../../AbstractModel"));
class CategoryModel extends AbstractModel_1.default {
    constructor() {
        super();
    }
    countCategory(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filter }) {
            const prisma = new client_1.PrismaClient();
            return prisma.category.count({
                where: Object.assign(Object.assign({}, filter), { isDelete: false })
            });
        });
    }
    findCategory(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filter }) {
            const prisma = new client_1.PrismaClient();
            return prisma.category.findFirst({
                where: Object.assign({}, filter),
                include: {
                    createReference: true,
                    _count: true,
                    insumo: {
                        skip: 0,
                        take: 50
                    }
                }
            });
        });
    }
    findManyCategory(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filter, skip, take }) {
            const prisma = new client_1.PrismaClient();
            return prisma.category.findMany({
                where: Object.assign(Object.assign({}, filter), { isDelete: false }),
                include: {
                    createReference: true,
                    _count: true
                },
                orderBy: { createAt: "asc" },
                skip,
                take
            });
        });
    }
    createCategory(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data }) {
            const prisma = new client_1.PrismaClient();
            return prisma.category.create({
                data: Object.assign({}, data)
            });
        });
    }
    deleteCategory(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const prisma = new client_1.PrismaClient();
            return prisma.category.update({
                where: { id },
                data: {
                    isDelete: true
                }
            });
        });
    }
    updateCategory(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, data }) {
            const prisma = new client_1.PrismaClient();
            return prisma.category.update({
                where: { id },
                data: data
            });
        });
    }
}
exports.default = CategoryModel;
