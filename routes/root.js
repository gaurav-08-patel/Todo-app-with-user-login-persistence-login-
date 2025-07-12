import { Router } from "express";
const rootRouter = Router();

rootRouter.get("/", (req, res) => {
    if (req.session.userID) {
        return res.redirect("/todo"); // ✅ Logged-in users go to their dashboard
    }
    res.redirect("/login"); // ❌ Guests go to login
})


export { rootRouter };
