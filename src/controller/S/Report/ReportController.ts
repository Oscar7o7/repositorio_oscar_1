import { Request, Response } from "express";
import { OnSession, OnAdmin } from "../../../middlewares/auth";
import { Prisma } from "@prisma/client";
import AbstractController from "../../AbstractController";
import UserModel from "../../../model/user/UserModel";
import { pushPdf } from "../../../model/pdf/GeneratePDFkit";
class ReportController extends AbstractController {

    public LoadRouters() {   
        return this.router;
    }
}

export default ReportController;
