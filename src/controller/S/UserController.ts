import AbstractController from "../AbstractController";
import UserModel from "../../model/user/UserModel";
import { Request, Response } from "express";
import { OnAdmin, OnRoot, OnSession } from "../../middlewares/auth";
import { Prisma } from "@prisma/client";


export default class UserController extends AbstractController {

    constructor() { super()}

    public async RenderCreate(req:Request,res:Response) {
        return res.render(`s/user/create.hbs`, {
            currentPage: {
                title: `Crear Usuario`,
                notResult: ``,
                labels: [`Nombre`,`Cédula`,`Correo`,`Rol`,``],
                actions: [
                    { label: `Panel`, path:`/` },
                    { label: `Lista`, path:`/user/` },
                ],
            }
        });
    }

    public async RenderUpdate(req:Request,res:Response) {
        const instance = new UserModel();
        const id = req.params.id;
        const result = instance.findUser({ filter:{id} });

        return res.render(`s/user/update.hbs`, { 
            data: await result, 
            id, 
            currentPage: {
                title: `Actualizar Usuarios`,
                notResult: `se encontró el usuario ${id}`,
                actions: [
                    { label: `Lista`, path:`/user` },
                    { label: `Crear`, path:`/user/create` },
                ],
                newLink: `/user/create`,
                labels: [`Nombre`,`Cédula`,`Correo`,`Rol`,``],
            },
        });
    }

    public async RenderList(req:Request,res:Response) {
        const instance = new UserModel();
        const user = req.user as any;

        const {param,role} = req.query;
        let queryString = ``;
        // rol
        // param (email,name,lastname,ci,cmeg,matricula,address)

        const take = req.query.take ? Number(req.query.take) : 10;
        const skip = req.query.skip ? Number(req.query.skip) : 0;

        const filter: Prisma.UserWhereInput[] = [];
        // filter.push({ isDelete:false });

        if(param) {
            queryString += `param=${param}`;
            filter.push({ name: { contains:param } });
            filter.push({ email: { contains:param } });
            filter.push({ lastname: { contains:param } });
            filter.push({ ci: { contains:param } });
            filter.push({ cmeg_n: { contains:param } });
            filter.push({ matricula: { contains:param } });
        }

        if(role) {
            queryString += queryString ? `&role=${role}` : `role=${role}`;
            // if(filter.length > 0) {
            //     return;
            // }
            filter.push({ role: role });
        }

        const listPromise = instance.findManyUser({
            filter: {AND:[{isDelete:false},{OR:filter}]},
            skip,
            take,
        });
        const countPromise = instance.countUser({ filter:{AND:[{isDelete:false},{OR:filter}]} });

        const returnData = {
            currentPage: {
                title: `Usuarios`,
                notResult: `No hay usuarios`,
                newLink: `/user/create`,
                labels: [`Nombre`,`Cédula`,`Correo`,`Rol`,``],
                actions: [
                    { label: `Panel`, path:`/`,permisson:[`ROOT`,`ADMIN`,`DOCTOR`] },
                    { label: `Crear`, path:`/user/create`,permisson:[`ROOT`] },
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
                path: `/user/`,
                value: param
            },

            filter: {
                skip,
                take,
                param,
                role
            }
        }

        const list = await listPromise;
        const count = await countPromise;        

        // next
        returnData.foundNext = count - skip > 10 ? true : false;
        returnData.urlNext = `/user/?skip=${skip+10}&take=${take}`;

        // previus
        returnData.foundPrevious = take <= skip ? true : false; 
        returnData.urlPrevious = `/user/?skip=${skip-10}&take=${take}`;

        if(queryString) {
            returnData.urlNext += `&${queryString}`;
            returnData.urlPrevious += `&${queryString}`;
        }

        returnData.list = list;
        returnData.countRender = `${count - skip < 11 ? count : skip+take}/${count}`;

        return res.render(`s/user/list.hbs`, returnData);
    }

    public async RenderUnique(req:Request,res:Response) {
        const id = req.params.id;
        const instance = new UserModel();
        const user = req.user as any;

        const data = instance.findUser({ filter:{id} });

        const dataReturn = {
            data: [] as any,
            form: {} as any,
            yearList: await instance.GetAllYears(),
            year: await instance.getYears(),
            currentPage: {
                title: `Ver usuario`,
                notResult: `se encontró el usuario ${id}`,
                actions: [
                    { label: `Lista`, path:`/user`, permisson:[`ADMIN`,`DOCTOR`] },
                    { label: `Crear`, path:`/user/create`, permisson:[`ROOT`] },
                ],
                newLink: `/user/create`,
                labels: [],
            },
            
        }

        dataReturn.data = await data;
        return res.render(`s/user/unique.hbs`, dataReturn);
    }

    public async CreateLogic(req:Request,res:Response) {
        try {
            const instance = new UserModel();

            const { name, ci, email, lastname, role } = req.body;
            const user = req.user as any;

            if(user) {
                await instance.PushStatictics({ objectId:user.id,objectName:`user` });
            }

            if(!name) {
                req.flash(`error`,`Debe completar los datos correctamente`);
                return res.redirect(`/user/`);
            } 

            let data: Prisma.UserCreateInput = { 
                ci,
                email,
                password:ci,
                name,
                lastname,
                role,
            }

            await instance.createUser({ data });

            await instance.CreateHistory({ 
                description:`creación de usuario`,
                userReference: { connect:{id:user.id} },
                objectId:user.id,
                objectName:`usuario`,
                objectReference: true
            });

            req.flash(`succ`, `Usuario creado`);
            return res.redirect(`/user/`);
        } catch (error) {
            req.flash(`Error`, `Error temporal`);
            return res.redirect(`/user/`);            
        }
    }

    public async EditLogic(req:Request,res:Response) {
        try {
            const instance = new UserModel();
            const user = req.user as any;

            const { ci,name,lastname,email } = req.body;
            const id = req.params.id as string;

            let dataUpdate: Prisma.UserUpdateInput = {};

            if(ci) dataUpdate = {...dataUpdate, ci};
            if(email) dataUpdate = {...dataUpdate, email};
            if(name) dataUpdate = {...dataUpdate, name};
            if(lastname) dataUpdate = {...dataUpdate, lastname};
            if(email) dataUpdate = {...dataUpdate, email};

            await instance.updateUser({
                data: dataUpdate,
                id
            });   
            
            if(user) {
                await instance.PushStatictics({ objectId:user.id,objectName:`user` });
            }

            await instance.CreateHistory({ 
                description:`actualización de usuario`,
                userReference: { connect:{id} },
                objectId:id,
                objectName:`usuario`,
                objectReference: true
            });

            req.flash(`succ`, `Usuario actualizado`);
            return res.redirect(req.query.next ? req.query.next : `/profile`);
        } catch (error) {
            req.flash(`Error`, `Error temporal`);
            return res.redirect(`/user/`);            
        }
    }

    public async DeleteLogic(req:Request,res:Response) {
        try {
            const instance = new UserModel();
            const id = req.params.id as string;
            const user = req.user as any;

            await instance.deleteUser({ id });        

            if(user) {
                await instance.PushStatictics({ objectId:user.id,objectName:`user` });
            }

            await instance.CreateHistory({ 
                description:`actualización de usuario`,
                userReference: { connect:{id} },
                objectId:id,
                objectName:`usuario`,
                objectReference: true
            });

            req.flash(`succ`, `Eliminado exitosamente.`);
            return res.redirect(`/user/`);
        } catch (error) {
            req.flash(`Error`, `Error temporal`);
            return res.redirect(`/user/`);            
        }
    }

    public async UpdatePasswordLogic(req:Request,res:Response) {
        try {
            const instance = new UserModel();

            const { password, passwordNew, passwordRepeat,currentPassword } = req.body;
            const id = req.params.id as string;
            const user = req.user as any;

            if(user) {
                await instance.PushStatictics({ objectId:user.id,objectName:`user` });
            }

            if(passwordNew !== passwordRepeat) {
                req.flash(`err`, `Las contraseñas no coinciden`);
                return res.redirect(`/profile`);
            }

            const compare = await instance.ComparePassword({ dbPassword:currentPassword, password });
            if(!compare) {
                req.flash(`err`, `Las contraseñas no coinciden`);
                return res.redirect(`/profile`);
            }

            await instance.updateUser({
                data: {
                    password: await instance.HashPassword({password:passwordNew}),
                },
                id
            }); 

            await instance.CreateHistory({ 
                description:`creación de usuario contraseña`,
                userReference: { connect:{id} },
                objectId:id,
                objectName:`usuario`,
                objectReference: true
            });

            req.flash(`succ`, `Usuario actualizado`);
            return res.render(`/profiel`);
        } catch (error) {
            req.flash(`Error`, `Error temporal`);
            return res.redirect(`/profile/`);            
        }
    }

    public loadRoutes () {
        this.router.get(`/user/create`, OnSession, OnRoot,this.RenderCreate);
        this.router.get(`/user/`, OnSession, OnRoot, this.RenderList);
        this.router.get(`/user/:id`, OnSession, OnRoot, this.RenderUnique);
        this.router.get(`/user/:id/update`, OnSession, OnRoot, this.RenderUpdate);

        this.router.post(`/user/create`, OnSession, OnRoot, this.CreateLogic)
        this.router.post(`/user/:id/update`, OnSession, OnRoot, this.EditLogic)
        this.router.post(`/user/:id/password`, OnSession, OnRoot, this.UpdatePasswordLogic);
        this.router.post(`/user/:id/delete`, OnSession, OnRoot, OnAdmin, this.DeleteLogic);

        return this.router;
    }
}
