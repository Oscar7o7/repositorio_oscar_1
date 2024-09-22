import { Request, Response } from "express";
import { OnDoctor, OnSession } from "../../../middlewares/auth";
import AbstractController from "../../AbstractController";
import NotificationModel from "../../../model/user/notification/NotificationModel";
import UserModel from "../../../model/user/UserModel";
import SpecialitySubModel from "../../../model/config/SpecialityModel";
import QuotesSubModel from "../../../model/quotes/QuotesModel";
import { Prisma } from "@prisma/client";

export default class AdminQuoteController extends AbstractController {

    constructor() {
        super();
    }

} 
