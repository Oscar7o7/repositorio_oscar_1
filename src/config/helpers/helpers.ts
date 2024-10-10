import { STATUS } from "../../types/app";

const Helpers = {

    isEqual (op1: string, op2: string) {
        return op1 === op2 ? true : false;
    },

    isAdmin (rol: string) {
        return rol === `ADMIN` ? true : false;
    },

    isRoot (rol: string) {
        return rol === `ROOT` ? true : false;
    },

    isDoctor (rol: string) {
        return rol === `DOCTOR` ? true : false;
    },

    itemNav(item: PermissonSlide, rol:`ROOT`|`ADMIN`|`DOCTOR`) {

        if(item.permisson.includes(rol)) {
            return  `
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

    itemButton(item: PermissonButton, rol:`ROOT`|`ADMIN`|`DOCTOR`) {

        if(item.permisson.includes(rol)) {
            return  `
                <a href="${item.path}" class="btn bg-gradient-primary">${item.label}</a>
            `;
        }
        return null;
    }

}

interface PermissonSlide {
    path:string,
    icon:string,
    label:string,
    current:string,
    permisson: string[]
}

interface PermissonButton {
    label:string, path:string, permisson:string[]
}

export default Helpers;
