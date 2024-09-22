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
class PublicController extends AbstractController_1.default {
    constructor(prefix = ``) {
        super();
        this.prefix = prefix;
    }
    RenderPublic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.render(`p/main.hbs`);
        });
    }
    RenderLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.render(`p/login.hbs`);
        });
    }
    RenderRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.render(`p/register.hbs`);
        });
    }
    loadRoutes() {
        this.router.get(`${this.prefix}/`, this.RenderPublic);
        this.router.get(`${this.prefix}/login`, auth_1.OffSession, this.RenderLogin);
        this.router.get(`${this.prefix}/register`, auth_1.OffSession, this.RenderRegister);
        return this.router;
    }
}
exports.default = PublicController;
