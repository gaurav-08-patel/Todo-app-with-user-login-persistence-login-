import { Router } from "express";
const logoutRouter = Router();

logoutRouter.get('/', (req,res)=>{
    req.session.destroy(err => {
    if (err) {
      console.log("Logout error:", err);
      return res.status(500).send("Logout failed");
    }

    res.redirect("/login"); // ✅ back to login screen
  });

})

export default logoutRouter ;