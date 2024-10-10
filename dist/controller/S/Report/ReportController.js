"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = __importDefault(require("../../AbstractController"));
class ReportController extends AbstractController_1.default {
    LoadRouters() {
        return this.router;
    }
}
exports.default = ReportController;
