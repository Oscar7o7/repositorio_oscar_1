import { Request, Response, Router } from "express";
import AbstractController from "../AbstractController";
import { OffSession } from "../../middlewares/auth";

export default class PublicController extends AbstractController {

    constructor (
        private prefix = ``
    ) {
        super();
    }

    public async RenderLogin(req: Request, res:Response) {
        return res.render(`p/login.hbs`);
    }

    public async RenderRegister(req: Request, res:Response) {
        return res.render(`p/register.hbs`);
    }

    public loadRoutes () {
        this.router.get(`${this.prefix}/login`, OffSession, this.RenderLogin);
        this.router.get(`${this.prefix}/register`, OffSession, this.RenderRegister);

        return this.router;
    }

}
