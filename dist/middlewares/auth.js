"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnAdminORRoot = exports.OnRoot = exports.OnAdmin = exports.OnDoctor = exports.OffSession = exports.OnSession = void 0;
const OnSession = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        req.flash("err", "Debes iniciar sessión.");
        res.redirect("/login");
    }
};
exports.OnSession = OnSession;
const OffSession = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        req.flash("err", "No puedes visitar esa pagina.");
        res.redirect("/dashboard");
    }
};
exports.OffSession = OffSession;
const OnDoctor = function (req, res, next) {
    if (req.user.role === `DOCTOR`) {
        next();
    }
    else {
        req.flash("err", "No eres un doctor.");
        res.redirect("/dashboard");
    }
};
exports.OnDoctor = OnDoctor;
const OnAdmin = function (req, res, next) {
    if (req.user.role === `ADMIN`) {
        next();
    }
    else {
        req.flash("err", "No eres un doctor.");
        res.redirect("/dashboard");
    }
};
exports.OnAdmin = OnAdmin;
const OnRoot = function (req, res, next) {
    if (req.user.role === `ROOT`) {
        next();
    }
    else {
        req.flash("err", "No eres un super usuario.");
        res.redirect("/dashboard");
    }
};
exports.OnRoot = OnRoot;
const OnAdminORRoot = function (req, res, next) {
    if (req.user.role === `ADMIN` || req.user.role === `ROOT`) {
        next();
    }
    else {
        req.flash("err", "No eres un doctor.");
        res.redirect("/dashboard");
    }
};
exports.OnAdminORRoot = OnAdminORRoot;
