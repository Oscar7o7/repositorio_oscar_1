import passport from "passport";
import AbstractController from "../AbstractController"
import { NextFunction, Request, Response } from "express";
import { OffSession, OnSession } from "../../middlewares/auth";

export default class AuthController extends AbstractController {

    constructor(
        private prefix = ``
    ) {
        super();
    }

    public async LoginController(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("local.login", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res, next);
    }

    public loadRoutes () {
        this.router.post(`${this.prefix}/login`, OffSession, this.LoginController);

        return this.router;
    }

}
