import { Router } from "express";
import Kernel from "../Kernel";

class AbstractController extends Kernel {

    public router = Router();

    constructor() {
        super();
    }

    

}

export default AbstractController;
