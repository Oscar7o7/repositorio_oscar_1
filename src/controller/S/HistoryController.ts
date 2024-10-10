import AbstractController from "../AbstractController";
import UserModel from "../../model/user/UserModel";
import { Request, Response } from "express";
import { OnAdmin, OnRoot, OnSession } from "../../middlewares/auth";
import { Prisma } from "@prisma/client";


export default class HistoryController extends AbstractController {

    constructor() {
        super();
    }

    public async RenderList(req:Request,res:Response) {
        const instance = new UserModel();
        const user = req.user as any;

        const take = req.query.take ? Number(req.query.take) : 10;
        const skip = req.query.skip ? Number(req.query.skip) : 0;

        const filter: Prisma.UserWhereInput[] = [];

        const listPromise = instance.findManyHistory({
            filter: {},
            skip,
            take,
        });
        const countPromise = instance.countHistory({ filter:{} });

        const returnData = {
            currentPage: {
                title: `Historial`,
                notResult: `No hay historial`,
                newLink: `/user/create`,
                labels: [`Fecha`,`Responsable`,`description`,,``],
                actions: [
                    { label: `Panel`, path:`/`,permisson:[`ROOT`,`ADMIN`,`DOCTOR`] },
                ],
            },
            list: [] as any,
            countRender: ``,
            foundNext: false,
            urlNext: ``,
            foundPrevious: false,
            urlPrevious: ``,
            roleList: super.getRoles(),
            address: [] as any,
            speciality: [] as any,

            filter: {
                skip,
                take
            }
        }

        const list = await listPromise;
        const count = await countPromise;        

        // next
        returnData.foundNext = count - skip > 10 ? true : false;
        returnData.urlNext = `/history/?skip=${skip+10}&take=${take}`;

        // previus
        returnData.foundPrevious = take <= skip ? true : false; 
        returnData.urlPrevious = `/history/?skip=${skip-10}&take=${take}`;

        returnData.list = list;
        returnData.countRender = `${count - skip < 11 ? count : skip+take}/${count}`;

        return res.render(`s/history/list.hbs`, returnData);
    }

    public async RenderUnique(req:Request,res:Response) {
        const id = req.params.id;
        const instance = new UserModel();
        const user = req.user as any;

        const data = instance.findUser({ filter:{id} });

        const dataReturn = {
            data: [] as any,
            form: {} as any,
            year: await instance.getYears(),
            currentPage: {
                title: `Ver usuario`,
                notResult: `se encontró el usuario ${id}`,
                actions: [
                    { label: `Lista`, path:`/history`, permisson:[`ADMIN`,`DOCTOR`] },
                    { label: `Crear`, path:`/history/create`, permisson:[`ROOT`] },
                ],
                newLink: `/history/create`,
                labels: [],
            },
            speciality: [] as any,
        }

        dataReturn.data = await data;
        return res.render(`s/history/unique.hbs`, dataReturn);
    }

    public loadRoutes () {
        this.router.get(`/history/`, OnSession, OnRoot, this.RenderList);
        this.router.get(`/history/:id`, OnSession, OnRoot, this.RenderUnique);

        return this.router;
    }
}
