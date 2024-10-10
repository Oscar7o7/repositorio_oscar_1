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
const AbstractModel_1 = __importDefault(require("../model/AbstractModel"));
class GraphicService extends AbstractModel_1.default {
    constructor() {
        super();
    }
    MonthGraphic(_a) {
        return __awaiter(this, arguments, void 0, function* ({ objectName, objectId, month }) {
            const prisma = new client_1.PrismaClient();
            const model = new AbstractModel_1.default();
            const months = model.getAllMonths();
        });
    }
    MonthGraphicQuote(_a) {
        return __awaiter(this, arguments, void 0, function* ({ month, id, ObjectName }) {
            const prisma = new client_1.PrismaClient();
            const model = new AbstractModel_1.default();
            const months = model.getAllMonths();
            const monthFind = month ? Number(month) : model.getMonth();
            if (id) {
                const result = yield prisma.staticticsMonth.findFirst({ where: { AND: [{ objectId: id }, { monthNumber: monthFind }] } });
                const label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
                const data = [
                    result === null || result === void 0 ? void 0 : result.totalDay1,
                    result === null || result === void 0 ? void 0 : result.totalDay2,
                    result === null || result === void 0 ? void 0 : result.totalDay3,
                    result === null || result === void 0 ? void 0 : result.totalDay4,
                    result === null || result === void 0 ? void 0 : result.totalDay5,
                    result === null || result === void 0 ? void 0 : result.totalDay6,
                    result === null || result === void 0 ? void 0 : result.totalDay7,
                    result === null || result === void 0 ? void 0 : result.totalDay8,
                    result === null || result === void 0 ? void 0 : result.totalDay9,
                    result === null || result === void 0 ? void 0 : result.totalDay10,
                    result === null || result === void 0 ? void 0 : result.totalDay11,
                    result === null || result === void 0 ? void 0 : result.totalDay12,
                    result === null || result === void 0 ? void 0 : result.totalDay13,
                    result === null || result === void 0 ? void 0 : result.totalDay14,
                    result === null || result === void 0 ? void 0 : result.totalDay15,
                    result === null || result === void 0 ? void 0 : result.totalDay16,
                    result === null || result === void 0 ? void 0 : result.totalDay17,
                    result === null || result === void 0 ? void 0 : result.totalDay18,
                    result === null || result === void 0 ? void 0 : result.totalDay19,
                    result === null || result === void 0 ? void 0 : result.totalDay20,
                    result === null || result === void 0 ? void 0 : result.totalDay21,
                    result === null || result === void 0 ? void 0 : result.totalDay22,
                    result === null || result === void 0 ? void 0 : result.totalDay23,
                    result === null || result === void 0 ? void 0 : result.totalDay24,
                    result === null || result === void 0 ? void 0 : result.totalDay25,
                    result === null || result === void 0 ? void 0 : result.totalDay26,
                    result === null || result === void 0 ? void 0 : result.totalDay27,
                    result === null || result === void 0 ? void 0 : result.totalDay28,
                    result === null || result === void 0 ? void 0 : result.totalDay29,
                    result === null || result === void 0 ? void 0 : result.totalDay30,
                    result === null || result === void 0 ? void 0 : result.totalDay31,
                ];
                return { label, data };
            }
            const filter = [{ monthNumber: monthFind }, { objectName: ObjectName ? ObjectName : `CITAS` }];
            // if(id) filter.push({ objectId:id });
            const result = yield prisma.staticticsMonth.findFirst({ where: { AND: filter } });
            const label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
            const data = [
                result === null || result === void 0 ? void 0 : result.totalDay1,
                result === null || result === void 0 ? void 0 : result.totalDay2,
                result === null || result === void 0 ? void 0 : result.totalDay3,
                result === null || result === void 0 ? void 0 : result.totalDay4,
                result === null || result === void 0 ? void 0 : result.totalDay5,
                result === null || result === void 0 ? void 0 : result.totalDay6,
                result === null || result === void 0 ? void 0 : result.totalDay7,
                result === null || result === void 0 ? void 0 : result.totalDay8,
                result === null || result === void 0 ? void 0 : result.totalDay9,
                result === null || result === void 0 ? void 0 : result.totalDay10,
                result === null || result === void 0 ? void 0 : result.totalDay11,
                result === null || result === void 0 ? void 0 : result.totalDay12,
                result === null || result === void 0 ? void 0 : result.totalDay13,
                result === null || result === void 0 ? void 0 : result.totalDay14,
                result === null || result === void 0 ? void 0 : result.totalDay15,
                result === null || result === void 0 ? void 0 : result.totalDay16,
                result === null || result === void 0 ? void 0 : result.totalDay17,
                result === null || result === void 0 ? void 0 : result.totalDay18,
                result === null || result === void 0 ? void 0 : result.totalDay19,
                result === null || result === void 0 ? void 0 : result.totalDay20,
                result === null || result === void 0 ? void 0 : result.totalDay21,
                result === null || result === void 0 ? void 0 : result.totalDay22,
                result === null || result === void 0 ? void 0 : result.totalDay23,
                result === null || result === void 0 ? void 0 : result.totalDay24,
                result === null || result === void 0 ? void 0 : result.totalDay25,
                result === null || result === void 0 ? void 0 : result.totalDay26,
                result === null || result === void 0 ? void 0 : result.totalDay27,
                result === null || result === void 0 ? void 0 : result.totalDay28,
                result === null || result === void 0 ? void 0 : result.totalDay29,
                result === null || result === void 0 ? void 0 : result.totalDay30,
                result === null || result === void 0 ? void 0 : result.totalDay31,
            ];
            return { label, data };
        });
    }
    YearGraphicQuote(_a) {
        return __awaiter(this, arguments, void 0, function* ({ year, id, ObjectName }) {
            const prisma = new client_1.PrismaClient();
            const model = new AbstractModel_1.default();
            const yearFind = year ? Number(year) : model.getYear();
            if (id) {
                const result = yield prisma.staticticsYear.findFirst({ where: { AND: [{ objectId: id }, { year: yearFind }] } });
                const label = [];
                model.getAllMonths().forEach((item) => {
                    label.push(item.label);
                });
                const data = [
                    result === null || result === void 0 ? void 0 : result.totalMonth1,
                    result === null || result === void 0 ? void 0 : result.totalMonth2,
                    result === null || result === void 0 ? void 0 : result.totalMonth3,
                    result === null || result === void 0 ? void 0 : result.totalMonth4,
                    result === null || result === void 0 ? void 0 : result.totalMonth5,
                    result === null || result === void 0 ? void 0 : result.totalMonth6,
                    result === null || result === void 0 ? void 0 : result.totalMonth7,
                    result === null || result === void 0 ? void 0 : result.totalMonth8,
                    result === null || result === void 0 ? void 0 : result.totalMonth9,
                    result === null || result === void 0 ? void 0 : result.totalMonth10,
                    result === null || result === void 0 ? void 0 : result.totalMonth11,
                    result === null || result === void 0 ? void 0 : result.totalMonth12,
                ];
                return { label, data };
            }
            const filter = [{ year: yearFind }, { objectName: ObjectName ? ObjectName : `CITAS` }];
            // if(id) filter.push({ objectId:id });
            const result = yield prisma.staticticsYear.findFirst({ where: { AND: filter } });
            const label = [];
            model.getAllMonths().forEach((item) => {
                label.push(item.label);
            });
            const data = [
                result === null || result === void 0 ? void 0 : result.totalMonth1,
                result === null || result === void 0 ? void 0 : result.totalMonth2,
                result === null || result === void 0 ? void 0 : result.totalMonth3,
                result === null || result === void 0 ? void 0 : result.totalMonth4,
                result === null || result === void 0 ? void 0 : result.totalMonth5,
                result === null || result === void 0 ? void 0 : result.totalMonth6,
                result === null || result === void 0 ? void 0 : result.totalMonth7,
                result === null || result === void 0 ? void 0 : result.totalMonth8,
                result === null || result === void 0 ? void 0 : result.totalMonth9,
                result === null || result === void 0 ? void 0 : result.totalMonth10,
                result === null || result === void 0 ? void 0 : result.totalMonth11,
                result === null || result === void 0 ? void 0 : result.totalMonth12,
            ];
            return { label, data };
        });
    }
    GenerateYear(_a) {
        return __awaiter(this, arguments, void 0, function* ({ year, id, ObjectName }) {
            const prisma = new client_1.PrismaClient();
            const model = new AbstractModel_1.default();
            const found = yield prisma.staticticsYear.findFirst({
                where: {
                    AND: [
                        { objectId: id },
                        { objectName: ObjectName },
                        { year: year ? Number(year) : model.getYear() }
                    ]
                }
            });
            if (found) {
                return [
                    found.totalMonth1,
                    found.totalMonth2,
                    found.totalMonth3,
                    found.totalMonth4,
                    found.totalMonth5,
                    found.totalMonth6,
                    found.totalMonth7,
                    found.totalMonth8,
                    found.totalMonth9,
                    found.totalMonth10,
                    found.totalMonth11,
                    found.totalMonth12,
                ];
            }
            return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        });
    }
    GenerateMonth(_a) {
        return __awaiter(this, arguments, void 0, function* ({ month, id, ObjectName, year }) {
            const prisma = new client_1.PrismaClient();
            const model = new AbstractModel_1.default();
            const found = yield prisma.staticticsMonth.findFirst({
                where: {
                    AND: [
                        { objectId: id },
                        { objectName: ObjectName },
                        { monthNumber: month ? month : model.getMonth() },
                        { year: Number(year) },
                    ]
                }
            });
            if (found) {
                return [
                    found.totalDay1,
                    found.totalDay2,
                    found.totalDay3,
                    found.totalDay4,
                    found.totalDay5,
                    found.totalDay6,
                    found.totalDay7,
                    found.totalDay8,
                    found.totalDay9,
                    found.totalDay10,
                    found.totalDay11,
                    found.totalDay12,
                    found.totalDay13,
                    found.totalDay14,
                    found.totalDay15,
                    found.totalDay16,
                    found.totalDay17,
                    found.totalDay18,
                    found.totalDay19,
                    found.totalDay20,
                    found.totalDay21,
                    found.totalDay22,
                    found.totalDay23,
                    found.totalDay24,
                    found.totalDay25,
                    found.totalDay26,
                    found.totalDay27,
                    found.totalDay28,
                    found.totalDay29,
                    found.totalDay30,
                    found.totalDay31,
                ];
            }
            return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        });
    }
}
exports.default = GraphicService;
