"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const express_session_1 = __importDefault(require("express-session"));
const method_override_1 = __importDefault(require("method-override"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const helpers_1 = __importDefault(require("./config/helpers/helpers"));
const Kernel_1 = __importDefault(require("./Kernel"));
require("./config/passport");
// ROUTES
const PublicController_1 = __importDefault(require("./controller/P/PublicController"));
const AuthController_1 = __importDefault(require("./controller/S/AuthController"));
const DashboardController_1 = __importDefault(require("./controller/S/DashboardController"));
const UserController_1 = __importDefault(require("./controller/S/UserController"));
const AddressController_1 = __importDefault(require("./controller/S/Address/AddressController"));
const SocialByUserController_1 = __importDefault(require("./controller/S/Social/SocialByUserController"));
const SocialMediaController_1 = __importDefault(require("./controller/S/Social/SocialMediaController"));
const SpecialityController_1 = __importDefault(require("./controller/S/Speciality/SpecialityController"));
const ProfileController_1 = __importDefault(require("./controller/S/ProfileController"));
const DoctorController_1 = __importDefault(require("./controller/S/Doctor/DoctorController"));
const DoctorScheduleController_1 = __importDefault(require("./controller/S/Doctor/DoctorScheduleController"));
const DoctorQuoteController_1 = __importDefault(require("./controller/S/Doctor/DoctorQuoteController"));
const DoctorPatientController_1 = __importDefault(require("./controller/S/Doctor/DoctorPatientController"));
const ScheduleController_1 = __importDefault(require("./controller/S/Schedule/ScheduleController"));
const NotificationController_1 = __importDefault(require("./controller/S/Notification/NotificationController"));
const PatientController_1 = __importDefault(require("./controller/S/Patient/PatientController"));
const PatientQuoteController_1 = __importDefault(require("./controller/S/Patient/PatientQuoteController"));
const PorfolioController_1 = __importDefault(require("./controller/S/PorfolioController"));
const ApiGraphicController_1 = __importDefault(require("./controller/A/ApiGraphicController"));
class App extends Kernel_1.default {
    constructor() {
        super();
    }
    Run() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = (0, express_1.default)();
            const PORT = process.env.PORT || 8080;
            this.setting(app);
            this.middlewares(app);
            this.static(app);
            this.routes(app);
            app.listen(PORT, () => {
                console.debug(`Server runing in port ${PORT}`);
                console.debug(`Open => http://localhost:${PORT}`);
            });
        });
    }
    setting(app) {
        return __awaiter(this, void 0, void 0, function* () {
            // Set Template engine to handlebars
            app.set("views", path_1.default.join(__dirname, "views"));
            app.engine("hbs", (0, express_handlebars_1.default)({
                defaultLayout: "main.hbs",
                layoutsDir: path_1.default.join(app.get("views"), "layouts"),
                partialsDir: path_1.default.join(app.get("views"), "partials"),
                helpers: helpers_1.default,
                extname: ".hbs"
            }));
            app.set("view engine", "hbs");
            // Settings
            app.use((0, morgan_1.default)("dev"));
            app.use(express_1.default.json());
            app.use(express_1.default.urlencoded({ extended: true }));
            app.use((0, method_override_1.default)("_method"));
            app.use((0, express_session_1.default)({
                secret: "cite_medical",
                resave: true,
                saveUninitialized: true
            }));
            app.use(passport_1.default.initialize());
            app.use(passport_1.default.session());
            app.use((0, connect_flash_1.default)());
        });
    }
    static(app) {
        return __awaiter(this, void 0, void 0, function* () {
            app.use((req, res, next) => {
                res.locals.user = req.user || null;
                res.locals.succ = req.flash("succ");
                res.locals.err = req.flash("err");
                res.locals.error = req.flash("error");
                next();
            });
            app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
            app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
        });
    }
    middlewares(app) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    routes(app) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicInstance = new PublicController_1.default();
            const authInstance = new AuthController_1.default();
            const dashboardInstance = new DashboardController_1.default();
            const userInstance = new UserController_1.default();
            const addressInstance = new AddressController_1.default();
            const socialByUserInstance = new SocialByUserController_1.default();
            const socialMediaInstance = new SocialMediaController_1.default();
            const specialityInstance = new SpecialityController_1.default();
            const profileInstance = new ProfileController_1.default();
            const doctorInstance = new DoctorController_1.default();
            const doctorScheduleInstance = new DoctorScheduleController_1.default();
            const doctorQuoteInstance = new DoctorQuoteController_1.default();
            const doctorPatientInstance = new DoctorPatientController_1.default();
            const scheduleInstance = new ScheduleController_1.default();
            const notificationInstance = new NotificationController_1.default();
            const patientInstance = new PatientController_1.default();
            const patientQuoteInstance = new PatientQuoteController_1.default();
            const porfolioInstance = new PorfolioController_1.default();
            const api = new ApiGraphicController_1.default();
            app.use(publicInstance.loadRoutes()); // rutas públicas
            app.use(dashboardInstance.loadRoutes()); // rutas panel de control
            app.use(profileInstance.loadRoutes()); // rutas de profile
            app.use(authInstance.loadRoutes()); // rutas de login
            app.use(userInstance.loadRoutes()); // rutas de usuario
            app.use(addressInstance.loadRoutes()); // rutas de direcciones
            app.use(socialByUserInstance.loadRoutes()); // rutas de social by user
            app.use(socialMediaInstance.loadRoutes()); // rutas de social media
            app.use(specialityInstance.loadRoutes()); // rutas de espacialidad
            app.use(doctorInstance.loadRoutes()); // rutas de doctor
            app.use(doctorScheduleInstance.loadRoutes()); // rutas de doctor  -   Horario
            app.use(doctorQuoteInstance.loadRoutes()); // rutas de doctor  -   Citas
            app.use(doctorPatientInstance.loadRoutes()); // rutas de doctor  -   Paciente
            app.use(scheduleInstance.loadRoutes()); // rutas de horarios
            app.use(notificationInstance.loadRoutes()); // rutas notificación
            app.use(patientInstance.loadRoutes()); // rutas paciente
            app.use(patientQuoteInstance.loadRoutes()); // rutas paciente   -   Cita
            app.use(porfolioInstance.loadRoutes()); // rutas portafolio
            app.use(api.loadRoutes());
            app.get(`/logout`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                req.logOut((err) => {
                    return res.redirect(`/`);
                });
            }));
        });
    }
}
exports.default = App;
