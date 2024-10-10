import { Request, Response } from "express";
import AbstractController from "../AbstractController";
import { PrismaClient } from "@prisma/client";
import GraphicService from "../../service/GraphicService";
import { GraphicPayload } from "../../types/response";
import UserModel from "../../model/user/UserModel";
import CategoryModel from "../../model/insumo/category/CategoryModel";
import InsumoModel from "../../model/insumo/InsumoModel";

export default class ApiInsumoController extends AbstractController {

    constructor () {
        super();
    }

    public async FindInsumo(req:Request, res:Response) {
        const prisma = new PrismaClient();
        const userModel = new UserModel();
        const insumo = new InsumoModel();

        const { id } = req.query as { id:string };

        const insumoFound = await insumo.findInsumo({ filter:{ id } });

        return res.status(200).json({body:insumoFound});
    }

    public async FindAllInsumos(req:Request, res:Response) {
        const prisma = new PrismaClient();
        const userModel = new UserModel();
        const insumo = new InsumoModel();

        const { param } = req.query as { param:string };

        const insumoFounds = await insumo.findManyInsumo({ 
            filter:{
                AND: [
                    {name:{contains:param}},
                    {isDelete:false}
                ]
            },
            skip: 0,
            take: 20
        });

        return res.status(200).json({body:insumoFounds});
    }

    public loadRoutes() {
        this.router.get(`/api/insumo/`, this.FindInsumo);
        this.router.get(`/api/insumos/`, this.FindAllInsumos);

        return this.router;
    } 

}
