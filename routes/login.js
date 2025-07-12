import { Router } from "express";
import loginController from '../controllers/loginController.js'
const loginRouter = Router();

loginRouter
    .route("/")
    .get((req, res) => {
        res.render("login", { error: null });
    })
    .post(loginController);

export default loginRouter ;
