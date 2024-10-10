import { Request, Response } from "express";
import AbstractController from "../AbstractController"
import { OnSession } from "../../middlewares/auth";
import UserModel from "../../model/user/UserModel";
import InsumoModel from "../../model/insumo/InsumoModel";
import { Prisma } from "@prisma/client";

export default class DashboardController extends AbstractController {

    constructor(
        private prefix = ``
    ) {
        super();
    }

    public async RenderDashboard(req:Request,res:Response) {
        const user = req.user as any;

        const userModel = new UserModel();
        const insumoModel = new InsumoModel();

        const countUser = userModel.countUser({ filter:{} });
        const countInsumo = insumoModel.countInsumo({ filter:{} });
        const countMinInsumo = insumoModel.countInsumo({ filter:{ isMin:true } });
        const countMaxInsumo = insumoModel.countInsumo({ filter:{ isMax:true } });

        const dataReturn = {
            yearList: await userModel.GetAllYears(),
            cards: [
                { path:`/user`,label:`Usuarios`,ico:`user.png`,count: await countUser },
                { path:`/insumo`,label:`Inusmos`,ico:`insumo.png`,count: await countInsumo },
                { path:`/insumo/?stock=min`,label:`Mínimo insumos`,ico:`insumo.png`,count: await countMinInsumo },
                { path:`/insumo/?stock=max`,label:`Máximo insumos`,ico:`insumo.png`,count: await countMaxInsumo },
            ],
        }

        return res.render(`s/dashboard.hbs`, dataReturn);
    }

    public async RenderStock(req:Request, res:Response) {
        const user = req.user as any;
        const userModel = new UserModel();
        const insumoModel = new InsumoModel();

        const {param,stock} = req.query as { param?:string, stock?:`min`|`max`|`all` };
        let queryString = ``;

        const take = req.query.take ? Number(req.query.take) : 10;
        const skip = req.query.skip ? Number(req.query.skip) : 0;

        const filter: Prisma.InsumoWhereInput[] = [];

        if(param) {
            queryString += `param=${param}`;
            filter.push({ name: { contains:param } });
        }

        if(stock === "min") filter.push({ isMin:true });
        if(stock === "max") filter.push({ isMax:true });
        if(stock === "all") {}

        const listPromise = insumoModel.findManyInsumo({
            filter: {AND:[{isDelete:false},{OR:filter}]},
            skip,
            take,
        });

        const countPromise = insumoModel.countInsumo({ filter:{AND:[{isDelete:false},{OR:filter}]} });

        const countInsumo = insumoModel.countInsumo({ filter:{} });
        const countMinInsumo = insumoModel.countInsumo({ filter:{ isMin:true } });
        const countMaxInsumo = insumoModel.countInsumo({ filter:{ isMax:true } });

        const returnData = {
            currentPage: {
                title: `Insumos`,
                notResult: `No hay insumos`,
                labels: [`Nombre`,`<a href="/insumo/?stock=min">Mínimo</a>`,`<a href="/insumo/?stock=max">Máximo</a>`,`Cantidad`,``],
            },
            cards: [
                { path:`/insumo`,label:`Inusmos`,ico:`insumo.png`,count: await countInsumo },
                { path:`/insumo/?stock=min`,label:`Mínimo insumos`,ico:`insumo.png`,count: await countMinInsumo },
                { path:`/insumo/?stock=max`,label:`Máximo insumos`,ico:`insumo.png`,count: await countMaxInsumo },
            ],
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
                take,
                param
            }
        }

        const list = await listPromise;
        const count = await countPromise;

        // next
        returnData.foundNext = count - skip > 10 ? true : false;
        returnData.urlNext = `/insumo/?skip=${skip+10}&take=${take}`;

        // previus
        returnData.foundPrevious = take <= skip ? true : false;
        returnData.urlPrevious = `/insumo/?skip=${skip-10}&take=${take}`;

        if(queryString) {
            returnData.urlNext += `&${queryString}`;
            returnData.urlPrevious += `&${queryString}`;
        }

        returnData.list = list;
        returnData.countRender = `${count - skip < 11 ? count : skip+take}/${count}`;

        return res.render(`s/stock.hbs`, returnData);
    }

    public async UpdateQuantoty(req:Request, res:Response) {
        const user = req.user as any;
        const insumoModel = new InsumoModel();
        const { idInsumo, insumoQuantity, insumoId } = req.body;

        const result = await insumoModel.updateInsumo({ data:{quantity:Number(insumoQuantity)}, id:idInsumo });

        if(user) {
            await insumoModel.PushStatictics({ objectId:user.id,objectName:`user` });
        }
        await insumoModel.PushStatictics({ objectId:idInsumo,objectName:`insumo` });
        await insumoModel.PushStatictics({ objectId:`all_insumo`,objectName:`insumo` });

        await insumoModel.CreateHistory({ 
            description:`actualización de insumo ${result.name}`,
            userReference: { connect:{id:user.id} },
            objectId:user.id,
            objectName:`insumo`,
            objectReference: true
        });

        return res.redirect(`/stock`);
    }

    public loadRoutes() {
        this.router.get(`/dashboard`, OnSession, this.RenderDashboard);
        this.router.get(`/stock`, OnSession, this.RenderStock);
        this.router.post(`/stock`, OnSession, this.UpdateQuantoty);

        return this.router;
    }
}
