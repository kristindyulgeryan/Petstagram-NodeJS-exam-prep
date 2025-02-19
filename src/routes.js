import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import photoController from "./controllers/photoController.js";

const routes = Router();

routes.use(homeController);
routes.use("/auth", authController);
routes.use("/photos", photoController);
routes.get('*', (req, res)=>{
    res.redirect('/404')
})

export default routes;
