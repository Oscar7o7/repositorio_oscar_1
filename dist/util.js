"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDays = exports.getStatusEnable = exports.getStatus = exports.getRoles = void 0;
function getRoles() {
    return [`ADMIN`, "DOCTOR", "PACIENTE"];
}
exports.getRoles = getRoles;
function getStatus() {
    return [`CANCELADA`, `FINALIZADO`, `PROCESADO`];
}
exports.getStatus = getStatus;
function getStatusEnable() {
    return [`ACTIVADO`, `DESACTIVADO`];
}
exports.getStatusEnable = getStatusEnable;
function getDays() {
    return [`Lunes`, `Martes`, `Miercoles`, `Jueves`, `Viernes`, `Sábado`, `Domingo`];
}
exports.getDays = getDays;
