import AbstractController from "../../AbstractController";
import UserModel from "../../../model/insumo/InsumoModel";
import CategoryModel from "../../../model/insumo/category/CategoryModel";
import { Request, Response } from "express";
import { OnAdmin, OnSession } from "../../../middlewares/auth";
import { Prisma } from "@prisma/client";


export default class InsumoController extends AbstractController {

    constructor() {
        super();
    }

    public async RenderCreate(req:Request,res:Response) {
        const category = new CategoryModel();

        const result = category.findManyCategory({ filter:{ isDelete:false }, skip:0,take:100 });

        return res.render(`s/insumo/create.hbs`, {
            category: await result,
            currentPage: {
                title: `Crear Insumo`,
                notResult: ``,
                labels: [],
                actions: [
                    { label: `Panel`, path:`/`, permissions:[`ROOT`,`ADMIN`,`DOCTOR`] },
                    { label: `Lista`, path:`/insumo/`, permissions:[`ROOT`,`ADMIN`,`DOCTOR`] },
                ],
            }
        });
    }

    public async RenderUpdate(req:Request,res:Response) {
        const instance = new UserModel();
        const id = req.params.id;
        const result = instance.findInsumo({ filter:{id} });

        const category = new CategoryModel();

        const resultCategory = category.findManyCategory({ filter:{ isDelete:false }, skip:0,take:100 });

        return res.render(`s/insumo/update.hbs`, { 
            data: await result, 
            category: await resultCategory,
            id, 
            currentPage: {
                title: `Actualizar Insumo`,
                notResult: `se encontró el insumo ${id}`,
                actions: [
                    { label: `Lista`, path:`/insumo`, permissions:[`ROOT`,`ADMIN`,`DOCTOR`] },
                    { label: `Crear`, path:`/insumo/create`, permissions:[`ROOT`,`ADMIN`] },
                ],
                newLink: `/insumo/create`,
                labels: [`Nombre`,`Creador`,`Categoría`,,``],
            },
        });
    }

    public async RenderList(req:Request,res:Response) {
        const instance = new UserModel();

        const {param,stock} = req.query as { param?:string, stock?:`min`|`max`|`all` };
        let queryString = ``;
        // rol
        // param (email,name,lastname,ci,cmeg,matricula,address)

        const take = req.query.take ? Number(req.query.take) : 10;
        const skip = req.query.skip ? Number(req.query.skip) : 0;

        const filter: Prisma.InsumoWhereInput[] = [];
        // filter.push({ isDelete:false });

        if(param) {
            queryString += `param=${param}`;
            filter.push({ name: { contains:param } });
        }

        if(stock === "min") filter.push({ isMin:true });
        if(stock === "max") filter.push({ isMax:true });
        if(stock === "all") {}

        const listPromise = instance.findManyInsumo({
            filter: {AND:[{isDelete:false},{OR:filter}]},
            skip,
            take,
        });

        const countPromise = instance.countInsumo({ filter:{AND:[{isDelete:false},{OR:filter}]} });

        const returnData = {
            currentPage: {
                title: `Insumos`,
                notResult: `No hay insumos`,
                newLink: `/user/create`,
                labels: [`Nombre`,`Creador`,`Categoria`,`<a href="/insumo/?stock=min">Mínimo</a>`,`<a href="/insumo/?stock=max">Máximo</a>`,`Cantidad`,``],
                actions: [
                    { label: `Actualizar`, path:`/insumo` },
                    { label: `Panel`, path:`/` },
                    { label: `Crear`, path:`/insumo/create`, permissions:[`ROOT`,`ADMIN`] },
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

            search: {
                status: true,
                path: `/insumo/`,
                value: param
            },

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

        return res.render(`s/insumo/list.hbs`, returnData);
    }

    public async RenderUnique(req:Request,res:Response) {
        const id = req.params.id;
        const instance = new UserModel();
        const user = req.user as any;

        const data = instance.findInsumo({ filter:{id} });

        const dataReturn = {
            data: [] as any,
            yearList: await instance.GetAllYears(),
            currentPage: {
                title: `Insumo`,
                notResult: `No se encontró el insumo ${id}`,
                labels: [],
                actions: [
                    { label: `Lista`, path:`/insumo` },
                    { label: `Crear`, path:`/insumo/create`, permissions:[`ROOT`,`ADMIN`] },
                ],
            },
        }

        dataReturn.data = await data;
        return res.render(`s/insumo/unique.hbs`, dataReturn);
    }

    public async CreateLogic(req:Request,res:Response) {
        try {
            const instance = new UserModel();

            const { name,categoryId,description,maxStock,minStock,priceUnitary,quantity } = req.body;
            const user = req.user as any;

            let data: Prisma.InsumoCreateInput = { 
                categoryReference: { connect:{ id:categoryId } },
                createReference: { connect:{ id:user.id } },
                name,
                description,
                maxStock: maxStock ? Number(maxStock) : 100,
                minStock: minStock ? Number(minStock) : 0,
                priceUnitary: priceUnitary ? Number(priceUnitary) : 0,
                quantity: quantity ? Number(quantity) : 0,
            }

            await instance.createInsumo({ data });

            await instance.CreateHistory({ 
                description:`creación de insumo (${data.name})`,
                userReference: { connect:{id:user.id} },
                objectId:user.id,
                objectName:`insumo`,
                objectReference: true
            });

            if(user) {
                await instance.PushStatictics({ objectId:user.id,objectName:`user` });
            }

            req.flash(`succ`, `Insumo creado`);
            return res.redirect(`/insumo/`);
        } catch (error) {
            req.flash(`Error`, `Error temporal`);
            return res.redirect(`/insumo/`);            
        }
    }

    public async EditLogic(req:Request,res:Response) {
        try {
            const instance = new UserModel();
            const user = req.user as any;
            const { name,categoryId,description,maxStock,minStock,priceUnitary,quantity } = req.body;
            const id = req.params.id as string;

            let dataUpdate: Prisma.InsumoUpdateInput = {};

            if(user) {
                await instance.PushStatictics({ objectId:user.id,objectName:`user` });
            }

            if(name) dataUpdate = {...dataUpdate, name};
            if(description) dataUpdate = {...dataUpdate, description};
            if(maxStock) dataUpdate = {...dataUpdate, maxStock: Number(maxStock)};
            if(minStock) dataUpdate = {...dataUpdate, minStock: Number(minStock)};
            if(priceUnitary) dataUpdate = {...dataUpdate, priceUnitary: Number(priceUnitary)};
            if(quantity) dataUpdate = {...dataUpdate, quantity: Number(quantity)};
            if(categoryId) dataUpdate = {...dataUpdate, categoryReference:{connect:{id:categoryId}}}

            await instance.updateInsumo({
                data: dataUpdate,
                id
            });
            
            await instance.PushStatictics({ objectId:id,objectName:`insumo` });
            await instance.PushStatictics({ objectId:`all_insumo`,objectName:`insumo` });

            await instance.CreateHistory({ 
                description:`actualización de insumo ${dataUpdate.name}`,
                userReference: { connect:{id:user.id} },
                objectId:user.id,
                objectName:`insumo`,
                objectReference: true
            });

            // req.flash(`succ`, `Usuario actualizado`);
            return res.redirect(`/insumo`);
        } catch (error) {
            req.flash(`Error`, `Error temporal`);
            return res.redirect(`/insumo`);            
        }
    }

    public async DeleteLogic(req:Request,res:Response) {
        try {
            const instance = new UserModel();
            const id = req.params.id as string;
            const user = req.user as any;
            await instance.deleteInsumo({ id });        

            if(user) {
                await instance.PushStatictics({ objectId:user.id,objectName:`user` });
            }

            await instance.CreateHistory({ 
                description:`eliminación de insumo`,
                userReference: { connect:{id:user.id} },
                objectId:user.id,
                objectName:`insumo`,
                objectReference: true
            });

            req.flash(`succ`, `Eliminado exitosamente.`);
            return res.redirect(`/insumo/`);
        } catch (error) {
            req.flash(`Error`, `Error temporal`);
            return res.redirect(`/insumo/`);            
        }
    }

    public loadRoutes () {
        this.router.get(`/insumo/create`, OnSession, this.RenderCreate);
        this.router.get(`/insumo/`, OnSession, this.RenderList);
        this.router.get(`/insumo/:id/unique`, OnSession, this.RenderUnique);
        this.router.get(`/insumo/:id/update`, OnSession, this.RenderUpdate);

        this.router.post(`/insumo/create`, OnSession, this.CreateLogic);
        this.router.post(`/insumo/:id/update`, OnSession, this.EditLogic);
        this.router.post(`/insumo/:id/delete`, OnSession, OnAdmin, this.DeleteLogic);

        return this.router;
    }
}
