import { Request, Response } from "express";
import { OnDoctor, OnSession } from "../../../middlewares/auth";
import AbstractController from "../../AbstractController";
import NotificationModel from "../../../model/user/notification/NotificationModel";
import UserModel from "../../../model/user/UserModel";
import QuotesSubModel from "../../../model/quotes/QuotesModel";
import ScheduleSubModel from "../../../model/schedule/ScheduleModel";
import { PrismaClient } from "@prisma/client";

export default class DoctorControlelr extends AbstractController {

    constructor() {
        super();
    }


    public async DoctorDashboard(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const noti = new NotificationModel();
        const user = req.user as any;
        const userModel = new UserModel();
        const quoteModel = new QuotesSubModel();
        const scheduleModel = new ScheduleSubModel();

        const quoteCountPromise = quoteModel.countQuotes({ filter:{AND:[{isDelete:false},{doctorId:user.id}]} }); // citas totales
        const scheduleCountPromise = userModel.findUser({ filter:{id:user.id} });

        const quoteProcesadoCountPromise = quoteModel.countQuotes({ filter:{AND:[{ isDelete:false },{ status:`PROCESADO` }, { doctorId:user.id }]} });
        const quoteAprovadoCountPromise = quoteModel.countQuotes({ filter:{AND:[{ isDelete:false },{ status:`APROVADO` }, { doctorId:user.id }]} });
        const quoteCanceladoCountPromise = quoteModel.countQuotes({ filter:{AND:[{ isDelete:false },{ status:`CANCELADO` }, { doctorId:user.id }]} });
        const quoteFinalizadoCountPromise = quoteModel.countQuotes({ filter:{AND:[{ isDelete:false },{ status:`FINALIZADO` }, { doctorId:user.id }]} });


        const dataReturn = {
            notifications: await noti.GetNowNotification({ id:user.id }),
            year: await userModel.getYears(),
            cards: [
                {
                    title: `Citas`,
                    link: `/quote/`,
                    color: `border-left-primary`,
                    ico: `bi-person-fill`,
                    count: await quoteCountPromise
                },
                {
                    title: `Horarios`,
                    link: `/quote/`,
                    color: `border-left-info`,
                    ico: `bi-calendar-check-fill`,
                    count: (await scheduleCountPromise)?._count.schedule
                },
            ],
            itemQoute: [
                {
                    title: `Procesado`,
                    link: `/quote/?status=PROCESADO`,
                    count: await quoteProcesadoCountPromise
                },
                {
                    title: `Aprovado`,
                    link: `/quote/?status=APROVADO`,
                    count: await quoteAprovadoCountPromise
                },
                {
                    title: `Cancelado`,
                    link: `/quote/?status=CANCELADO`,
                    count: await quoteCanceladoCountPromise
                },
                {
                    title: `Finalizado`,
                    link: `/quote/?status=FINALIZADO`,
                    count: await quoteFinalizadoCountPromise
                },
            ]
        }

        return res.render(`s/doctor/dashboard.hbs`, dataReturn);
    }


    public loadRoutes () {
        this.router.get(`/doctor`, OnSession, OnDoctor, this.DoctorDashboard);

        return this.router;
    }

} 
