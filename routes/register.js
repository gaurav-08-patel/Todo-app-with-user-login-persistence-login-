import { Router } from "express";
const registerRouter = Router();
import registerController from "../controllers/registerController.js";

registerRouter
    .route("/")
    .get((req, res) => {
        res.render("register", { success: null, error: null });
    })
    .post(registerController);

export default registerRouter;
