import { Router } from "express";
const todosRouter = Router();
import { db } from "../../config/db.js";

todosRouter
    .route("/")
    .get(async (req, res) => {
        if (!req.session.userID) return res.sendStatus(401);

        let [rows] = await db.execute(`select * from todos where user_id = ?`, [
            req.session.userID,
        ]);
        res.status(200).json({ rows });
    })
    .post(async (req, res) => {
        const { text } = req.body;
        if (!text) return res.sendStatus(400);
        await db.execute(`insert into todos (user_id , text ) values (? , ?)`, [
            req.session.userID,
            text,
        ]);
        res.sendStatus(200);
    });

todosRouter.delete("/delete/:id", async (req, res) => {
    if (!req.params.id) return res.sendStatus(400); //bad request
    await db.execute(`delete from todos where id = ? and user_id = ?`, [
        req.params.id,
        req.session.userID,
    ]);
    res.sendStatus(200);
});

todosRouter.put("/edit", async (req, res) => {
    const { id, text } = req.body;
    if (!text || !id) return res.sendStatus(400);
    await db.execute(`update todos set text = ? where id = ?`, [text, id]);
    res.sendStatus(200);
});

todosRouter.delete('/clear', async(req,res)=>{
    await db.execute(`delete from todos where user_id = ?`,[req.session.userID]);
    res.sendStatus(400);
})

export { todosRouter };
