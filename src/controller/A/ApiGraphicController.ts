import { Request, Response } from "express";
import AbstractController from "../AbstractController";
import { PrismaClient } from "@prisma/client";
import GraphicService from "../../service/GraphicService";
import { GraphicPayload } from "../../types/response";
import UserModel from "../../model/user/UserModel";
import CategoryModel from "../../model/insumo/category/CategoryModel";

export default class ApiGraphicController extends AbstractController {

    constructor () {
        super();

    }

    public async GenereteGraphic(req:Request, res:Response) {
        const prisma = new PrismaClient();
        const userModel = new UserModel();

        const { id, ObjectName, year=2024 } = req.query as { id:string, ObjectName:string, year:number };
        const service = new GraphicService();

        const result = await service.GenerateYear({ id, ObjectName, year })

        return res.status(200).json(result);
    }

    public async GenereteGraphicMonth(req:Request, res:Response) {

        const { id, ObjectName, month,year } = req.query as { id:string, ObjectName:string, month:number,year:number };
        const service = new GraphicService();

        const result = await service.GenerateMonth({ id, ObjectName, month: month ? Number(month) : service.getMonth(), year: year ? Number(year) : service.getYear()})

        return res.status(200).json(result);
    }

    public async GenereteGraphicCategory(req:Request, res:Response) {
        const category = new CategoryModel();

        const listCategory = await category.findManyCategory({ filter:{isDelete:false},skip:0,take:10 });

        const labels: string[] = [];
        const values: number[] = [] 

        listCategory.forEach((item) => {
            labels.push(item.name);
            values.push(item._count.insumo);
        });

        return res.status(200).json({labels,values});
    }

    public loadRoutes() {
        this.router.get(`/api/graphic/year`, this.GenereteGraphic);
        this.router.get(`/api/graphic/month`, this.GenereteGraphicMonth);
        this.router.get(`/api/graphic/category`, this.GenereteGraphicCategory);

        return this.router;
    } 

}
