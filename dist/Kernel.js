"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Kernel {
    constructor() { }
    getRoles() {
        return [`ADMIN`, "DOCTOR", "PACIENTE"];
    }
    getStatus() {
        return [`CANCELADA`, `FINALIZADO`, `PROCESADO`, `APROVADA`];
    }
    getStatusEnable() {
        return [`ACTIVADO`, `DESACTIVADO`];
    }
    getMonths(num) {
        const month = [
            { name: `ENERO`, label: `ENE` },
            { name: `FEBRERO`, label: `FEB` },
            { name: `MARZO`, label: `MAR` },
            { name: `ABRIL`, label: `ABR` },
            { name: `MAYO`, label: `MAY` },
            { name: `JUNIO`, label: `JUN` },
            { name: `JULIO`, label: `JUL` },
            { name: `AGOSTO`, label: `AGO` },
            { name: `SEPTIEMBRE`, label: `SEP` },
            { name: `OCTUBRE`, label: `OCT` },
            { name: `NOVIEMBRE`, label: `NOV` },
            { name: `DICIEMBRE`, label: `DIC` }
        ];
        if (num)
            return month[num];
        return month;
    }
    getAllMonths() {
        const month = [
            { name: `ENERO`, label: `ENE` },
            { name: `FEBRERO`, label: `FEB` },
            { name: `MARZO`, label: `MAR` },
            { name: `ABRIL`, label: `ABR` },
            { name: `MAYO`, label: `MAY` },
            { name: `JUNIO`, label: `JUN` },
            { name: `JULIO`, label: `JUL` },
            { name: `AGOSTO`, label: `AGO` },
            { name: `SEPTIEMBRE`, label: `SEP` },
            { name: `OCTUBRE`, label: `OCT` },
            { name: `NOVIEMBRE`, label: `NOV` },
            { name: `DICIEMBRE`, label: `DIC` }
        ];
        return month;
    }
    nativeMediaSocial() {
        return [
            {
                name: `Facebook`,
                linkSource: `/image/social/fb.svg`
            },
            {
                name: `Instragram`,
                linkSource: `/image/social/ins.svg`
            },
            {
                name: `Linkein`,
                linkSource: `/image/social/link.svg`
            },
            {
                name: `Pinterest`,
                linkSource: `/image/social/pin.svg`
            },
            {
                name: `Tiktok`,
                linkSource: `/image/social/tiktok.svg`
            },
            {
                name: `Threads`,
                linkSource: `/image/social/thre.svg`
            },
            {
                name: `Telegram`,
                linkSource: `/image/social/tlg.svg`
            },
            {
                name: `Whatsapp`,
                linkSource: `/image/social/ws.svg`
            },
        ];
    }
    getDays() {
        return [`Lunes`, `Martes`, `Miercoles`, `Jueves`, `Viernes`, `Sábado`, `Domingo`];
    }
}
exports.default = Kernel;
