import AbstractController from "../../AbstractController";
import CategoryModel from "../../../model/insumo/category/CategoryModel";
import { Request, Response } from "express";
import { OnAdmin, OnSession } from "../../../middlewares/auth";
import { Prisma } from "@prisma/client";


export default class CategoryController extends AbstractController {

    constructor() {
        super();
    }

    public async RenderCreate(req:Request,res:Response) {
        return res.render(`s/insumo/category/create.hbs`, {
            currentPage: {
                title: `Crear categoria`,
                notResult: ``,
                labels: [],
                actions: [
                    { label: `Panel`, path:`/`, permissions:[`ROOT`,`ADMIN`,`DOCTOR`] },
                    { label: `Insumos`, path:`/insumo`, permissions:[`ROOT`,`ADMIN`,`DOCTOR`] },
                    { label: `Lista`, path:`/insumo/category/`, permissions:[`ROOT`,`ADMIN`,`DOCTOR`] },
                ],
            }
        });
    }

    public async RenderUpdate(req:Request,res:Response) {
        const instance = new CategoryModel();
        const id = req.params.id;
        const result = instance.findCategory({ filter:{id} });

        return res.render(`s/insumo/category/update.hbs`, { 
            data: await result, 
            id, 
            currentPage: {
                title: `Actualizar Categoria`,
                notResult: `se encontró la categoria ${id}`,
                actions: [
                    { label: `Insumos`, path:`/insumo/`, permissions:[`ROOT`,`ADMIN`,`DOCTOR`] },
                    { label: `Lista`, path:`/insumo/category`, permissions:[`ROOT`,`ADMIN`,`DOCTOR`] },
                    { label: `Crear`, path:`/insumo/category/create`, permissions:[`ROOT`,`ADMIN`] },
                ],
                labels: [],
            },
        });
    }

    public async RenderList(req:Request,res:Response) {
        const instance = new CategoryModel();
        const user = req.user as any;

        const {param} = req.query;
        let queryString = ``;

        const take = req.query.take ? Number(req.query.take) : 10;
        const skip = req.query.skip ? Number(req.query.skip) : 0;

        const filter: Prisma.CategoryWhereInput[] = [];
        // filter.push({ isDelete:false });

        if(param) {
            queryString += `param=${param}`;
            filter.push({ name: { contains:param } });
        }

        const listPromise = instance.findManyCategory({
            filter: {AND:[{isDelete:false},{OR:filter}]},
            skip,
            take,
        });
        const countPromise = instance.countCategory({ filter:{AND:[{isDelete:false},{OR:filter}]} });

        const returnData = {
            currentPage: {
                title: `Categorias`,
                notResult: `No hay categorias`,
                labels: [`Nombre`,`Creador`,`Insumos`,``],
                actions: [
                    { label: `Insumos`, path:`/insumo`, permissions:[`ROOT`,`ADMIN`,`DOCTOR`] },
                    { label: `Crear`, path:`/insumo/category/create`, permissions:[`ROOT`,`ADMIN`] },
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
                path: `/insumo/category/`,
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
        returnData.urlNext = `/insumo/category/?skip=${skip+10}&take=${take}`;

        // previus
        returnData.foundPrevious = take <= skip ? true : false; 
        returnData.urlPrevious = `/insumo/category/?skip=${skip-10}&take=${take}`;

        if(queryString) {
            returnData.urlNext += `&${queryString}`;
            returnData.urlPrevious += `&${queryString}`;
        }

        returnData.list = list;
        returnData.countRender = `${count - skip < 11 ? count : skip+take}/${count}`;

        return res.render(`s/insumo/category/list.hbs`, returnData);
    }

    public async RenderUnique(req:Request,res:Response) {
        const id = req.params.id;
        const instance = new CategoryModel();

        const data = instance.findCategory({ filter:{id} });

        const dataReturn = {
            data: [] as any,
            form: {} as any,
            speciality: [] as any,
            currentPage: {
                title: `Ver categoria`,
                notResult: `se encontró la categoria ${id}`,
                actions: [
                    { label: `Lista`, path:`/insumo/category` },
                    { label: `Crear`, path:`/insumo/category/create` },
                ],
                labels: [],
            },
        }

        dataReturn.data = await data;
        return res.render(`s/insumo/category/unique.hbs`, dataReturn);
    }

    public async CreateLogic(req:Request,res:Response) {
        try {
            const instance = new CategoryModel();

            const { name } = req.body;
            const user = req.user as any;

            if(!name) {
                req.flash(`error`,`Debe completar los datos correctamente`);
                return res.redirect(`/insumo/category/`);
            } 

            let data: Prisma.CategoryCreateInput = { 
                createReference: { connect:{id:user.id} },
                name,
            }

            await instance.createCategory({ data });

            if(user) {
                await instance.PushStatictics({ objectId:user.id,objectName:`user` });
            }

            await instance.CreateHistory({ 
                description:`creación de categoria`,
                userReference: { connect:{id:user.id} },
                objectId:user.id,
                objectName:`categoria`,
                objectReference: true
            });

            req.flash(`succ`, `Categoria creada.`);
            return res.redirect(`/insumo/category/`);
        } catch (error) {
            req.flash(`Error`, `Error temporal.`);
            return res.redirect(`/insumo/category/`);            
        }
    }

    public async EditLogic(req:Request,res:Response) {
        try {
            const instance = new CategoryModel();
            const { name } = req.body;
            const user = req.user as any;
            const id = req.params.id as string;

            let dataUpdate: Prisma.CategoryUpdateInput = {};

            if(name) dataUpdate = {...dataUpdate, name};

            if(user) {
                await instance.PushStatictics({ objectId:user.id,objectName:`user` });
            }

            await instance.updateCategory({
                data: dataUpdate,
                id
            });   
            
            await instance.CreateHistory({ 
                description:`actualización de categoria`,
                userReference: { connect:{id:user.id} },
                objectId:user.id,
                objectName:`categoria`,
                objectReference: true
            });

            // req.flash(`succ`, `Usuario actualizado`);
            return res.redirect(`/insumo/category`);
        } catch (error) {
            req.flash(`Error`, `Error temporal`);
            return res.redirect(`/insumo/category/`);            
        }
    }

    public async DeleteLogic(req:Request,res:Response) {
        try {
            const instance = new CategoryModel();
            const user = req.user as any;
            const id = req.params.id as string;

            await instance.deleteCategory({ id });        

            if(user) {
                await instance.PushStatictics({ objectId:user.id,objectName:`user` });
            }

            await instance.CreateHistory({ 
                description:`eliminación de categoria`,
                userReference: { connect:{id:user.id} },
                objectId:user.id,
                objectName:`categoria`,
                objectReference: true
            });

            req.flash(`succ`, `Eliminado exitosamente.`);
            return res.redirect(`/insumo/category/`);
        } catch (error) {
            req.flash(`Error`, `Error temporal`);
            return res.redirect(`/insumo/category/`);            
        }
    }

    public loadRoutes () {
        this.router.get(`/insumo/category/create`, OnSession, this.RenderCreate);
        this.router.get(`/insumo/category/`, OnSession, this.RenderList);
        this.router.get(`/insumo/category/:id`, OnSession, this.RenderUnique);
        this.router.get(`/insumo/category/:id/update`, OnSession, this.RenderUpdate);

        this.router.post(`/insumo/category/create`, OnSession, this.CreateLogic)
        this.router.post(`/insumo/category/:id/update`, OnSession, this.EditLogic)
        this.router.post(`/insumo/category/:id/delete`, OnSession, OnAdmin, this.DeleteLogic);

        return this.router;
    }
}
