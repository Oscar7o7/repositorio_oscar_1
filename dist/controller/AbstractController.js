"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Kernel_1 = __importDefault(require("../Kernel"));
class AbstractController extends Kernel_1.default {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
    }
}
exports.default = AbstractController;
