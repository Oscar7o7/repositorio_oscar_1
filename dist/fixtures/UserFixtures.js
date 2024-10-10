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
const AbstractFixture_1 = __importDefault(require("./AbstractFixture"));
const UserModel_1 = __importDefault(require("../model/user/UserModel"));
class UserFixtures extends AbstractFixture_1.default {
    constructor() {
        super();
    }
    push() {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new UserModel_1.default();
            const names = this.Name({});
            const lastnames = this.Lastnames({});
            const phoneCode = this.CodePhone({});
            const phoneNumber = this.GenerateNumber(7);
            const host = this.HostEmail({});
            console.log(`CREANDO USUARIOS....`);
            const user = yield instance.createUser({
                data: {
                    ci: `00000000`,
                    name: `Oscar`,
                    email: `okita.admin@example.com`,
                    lastname: `Admin`,
                    password: `1234567890`,
                    role: `ROOT`,
                }
            });
            console.log(`USUARIOS CREADOS....`);
        });
    }
}
exports.default = UserFixtures;
