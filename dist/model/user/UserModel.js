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
class UserModel extends AbstractModel_1.default {
    constructor() {
        super();
    }
    getYears() {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const years = yield prisma.staticticsYear.findMany({
                select: { year: true }
            });
            const newYears = [];
            years.forEach(({ year }) => {
                if (!newYears.includes(year)) {
                    newYears.push(year);
                }
            });
            return newYears;
        });
    }
    countUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filter }) {
            const prisma = new client_1.PrismaClient();
            return prisma.user.count({
                where: Object.assign(Object.assign({}, filter), { isDelete: false })
            });
        });
    }
    findUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filter }) {
            const prisma = new client_1.PrismaClient();
            return prisma.user.findFirst({
                where: Object.assign(Object.assign({}, filter), { isDelete: false }),
                include: {
                    category: {
                        skip: 0,
                        take: 10,
                        select: {
                            _count: true,
                            id: true,
                            name: true,
                        },
                        where: {
                            isDelete: false
                        },
                        orderBy: {
                            name: "asc"
                        }
                    },
                    insumo: {
                        skip: 0,
                        take: 10,
                        select: {
                            categoryReference: { select: { name: true } },
                            description: true,
                            id: true,
                            name: true,
                        },
                        where: {
                            isDelete: false
                        },
                        orderBy: {
                            name: "asc"
                        }
                    },
                    _count: true
                }
            });
        });
    }
    findManyUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filter, skip, take }) {
            const prisma = new client_1.PrismaClient();
            return prisma.user.findMany({
                where: Object.assign(Object.assign({}, filter), { isDelete: false }),
                orderBy: { createAt: "asc" },
                skip,
                take
            });
        });
    }
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data }) {
            const prisma = new client_1.PrismaClient();
            return prisma.user.create({
                data: Object.assign(Object.assign({}, data), { password: yield this.HashPassword({ password: data.password }) })
            });
        });
    }
    deleteUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const prisma = new client_1.PrismaClient();
            return prisma.user.update({
                where: { id },
                data: {
                    isDelete: true
                }
            });
        });
    }
    updateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, data }) {
            const prisma = new client_1.PrismaClient();
            return prisma.user.update({
                where: { id },
                data: data
            });
        });
    }
}
exports.default = UserModel;
