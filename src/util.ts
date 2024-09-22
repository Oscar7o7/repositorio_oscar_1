import { ROLES, STATUS } from "./types/app";

export function getRoles(): ROLES[] {
    return [`ADMIN`,"DOCTOR","PACIENTE"];
}

export function getStatus(): STATUS[] {
    return [`CANCELADA`,`FINALIZADO`,`PROCESADO`];
}

export function getStatusEnable() {
    return [`ACTIVADO`,`DESACTIVADO`]
}

export function getDays() {
    return [`Lunes`,`Martes`,`Miercoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`];
}