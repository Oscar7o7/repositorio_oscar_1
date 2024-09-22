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
const AddressFixturs_1 = __importDefault(require("./AddressFixturs"));
const SocialMediaFixtures_1 = __importDefault(require("./SocialMediaFixtures"));
const SpecialityFixture_1 = __importDefault(require("./SpecialityFixture"));
const UserFixtures_1 = __importDefault(require("./UserFixtures"));
const userInstance = new UserFixtures_1.default();
const socialInstance = new SocialMediaFixtures_1.default();
const addressInstance = new AddressFixturs_1.default();
const specialityInstance = new SpecialityFixture_1.default();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield addressInstance.push();
    yield specialityInstance.push();
    yield socialInstance.push();
    yield userInstance.push();
}))();
