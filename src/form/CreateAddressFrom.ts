import { STRUC_FORM, STRUC_INPUT_FORM } from "../types/app";

export const CreateAddressFrom: STRUC_FORM = {
    action: `/address/create`,
    title: `Agregar Dirección`,
    method: `POST`,
    submit: {
        text: `agregar`,
        ico: `bi bi-send-fill`
    },
    class: ``,
}

export const UpdateDirecciónFrom = (id:string) => {
    return {
        action: `/address/${id}/update`,
        title: `Actualizar Dirección`,
        method: `POST`,
        submit: {
            text: `actualizar`,
            ico: `bi bi-send-fill`
        },
        class: ``,
    }
}
