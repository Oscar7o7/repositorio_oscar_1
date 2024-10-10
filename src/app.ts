import flash from "connect-flash";
import express, { Application, NextFunction, Request, Response, Router } from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import methodOverride from "method-override";
import morgan from "morgan";
import path from "path";
import passport from "passport";
import helpersHandlebars from "./config/helpers/helpers";
import Kernel from "./Kernel"
import "./config/passport";

// ROUTES
import Public from "./controller/P/PublicController";
import Auth from "./controller/S/AuthController";
import Dashboard from "./controller/S/DashboardController";
import Profile from "./controller/S/ProfileController";
import User from "./controller/S/UserController";
import Category from "./controller/S/Insumo/CateogryController";
import Insumo from "./controller/S/Insumo/InsumoController";
import ReportController from "./controller/S/Report/ReportController";
import ApiGraphicController from "./controller/A/ApiGraphicController";
import HistoryController from "./controller/S/HistoryController";
import ApiInsumoController from "./controller/A/ApiInsumoController";


class App extends Kernel {

    constructor () {
        super();
    }

    public async Run() {

        const app = express();
        const PORT = process.env.PORT || 8080;

        this.setting(app);
        this.middlewares(app);
        this.static(app);

        this.routes(app);

        app.listen(PORT, () => {
            console.debug(`Server runing in port ${PORT}`);
            console.debug(`Open => http://localhost:${PORT}`);
        });
    }

    private async setting(app: Application) {
        // Set Template engine to handlebars
        app.set("views", path.join(__dirname, "views"));
        app.engine("hbs", exphbs({
        defaultLayout: "main.hbs",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        helpers: helpersHandlebars,
        extname: ".hbs"
        }));
        app.set("view engine", "hbs");

        // Settings
        //  app.use(morgan("dev"));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(methodOverride("_method"));
        app.use(session({
            secret: "cite_medical",
            resave: true,
            saveUninitialized: true
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());
    }

    private async static(app: Application) {
        app.use((req: Request, res: Response, next: NextFunction) => {
            res.locals.user = req.user || null;
            res.locals.succ = req.flash("succ");
              res.locals.err = req.flash("err");
              res.locals.error = req.flash("error");
              res.locals.app = {
                name: `Ignamar Tirado`
              },
              res.locals.pages = [
                {
                    path:`/stock`,
                    icon:`stock.png`,
                    label:`Inventario`,
                    current:`stock`,
                    permisson: [`ROOT`,`ADMIN`]
                },
                {
                    path:`/history`,
                    icon:`history.png`,
                    label:`Historial`,
                    current:`history`,
                    permisson: [`ROOT`]
                },
                {
                    path:`/dashboard`,
                    icon:`bar.png`,
                    label:`Panel`,
                    current:`panel`,
                    permisson: [`ROOT`,`ADMIN`,`DOCTOR`]
                },
                {
                    path:`/user`,
                    icon:`users.png`,
                    label:`Usuarios`,
                    current:`user`,
                    permisson: [`ROOT`]
                },
                {
                    path:`/insumo`,
                    icon:`insumo.png`,
                    label:`Insumos`,
                    current:`insumo`,
                    permisson: [`ROOT`,`ADMIN`,`DOCTOR`]
                },
                {
                    path:`/insumo/category`,
                    icon:`tag.png`,
                    label:`Categorias`,
                    current:`category`,
                    permisson: [`ROOT`,`ADMIN`,`DOCTOR`]
                }
              ]
              next();
        });

        app.use(express.static(path.join(__dirname, "../public")));
        app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
    }

    private async middlewares(app: Application) {}

    private async routes(app: Application) {
        const publicInstance = new Public();
        const authInstance = new Auth();
        const dashboardInstance = new Dashboard();
        const userInstance = new User();
        const profileInstance = new Profile();
        const insumoInstance = new Insumo();
        const categoryInstance = new Category();
        const reportInstance = new ReportController();
        const historyInstance = new HistoryController();
        const api2 = new ApiInsumoController(); 
        const api = new ApiGraphicController();

        app.use(publicInstance.loadRoutes());           // rutas públicas
        app.use(dashboardInstance.loadRoutes());        // rutas panel de control
        app.use(authInstance.loadRoutes());             // rutas de login
        app.use(userInstance.loadRoutes());             // rutas de usuario
        app.use(reportInstance.LoadRouters());             // rutas paciente   -   Cita
        app.use(profileInstance.loadRoutes());
        app.use(insumoInstance.loadRoutes());
        app.use(historyInstance.loadRoutes());
        app.use(categoryInstance.loadRoutes());

        app.use(api.loadRoutes());
        app.use(api2.loadRoutes());

        app.get(`/logout`, async (req: Request, res: Response) => {
            req.logOut((err) => {
                return res.redirect(`/`);
            });
        })

        app.use(`/`, async(req: any, res: Response) => {
            if (req.user) return res.redirect(`/dashboard`);
            else return res.redirect(`/login`)
        })
    }

}

export default App;
