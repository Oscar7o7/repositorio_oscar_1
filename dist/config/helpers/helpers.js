"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers = {
    isEqual(op1, op2) {
        return op1 === op2 ? true : false;
    },
    isAdmin(rol) {
        return rol === `ADMIN` ? true : false;
    },
    isRoot(rol) {
        return rol === `ROOT` ? true : false;
    },
    isDoctor(rol) {
        return rol === `DOCTOR` ? true : false;
    },
    itemNav(item, rol) {
        if (item.permisson.includes(rol)) {
            return `
                <li class="nav-item mt-3">
                    <a class="nav-link  active" href="${item.path}">
                        <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                            <img src="/img/logos/${item.icon}" class="" style="width:20px" />
                        </div>
                        <span class="nav-link-text ms-1">${item.label}</span>
                    </a>
                </li>
            `;
        }
        return null;
    },
    itemButton(item, rol) {
        if (item.permisson.includes(rol)) {
            return `
                <a href="${item.path}" class="btn bg-gradient-primary">${item.label}</a>
            `;
        }
        return null;
    }
};
exports.default = Helpers;
