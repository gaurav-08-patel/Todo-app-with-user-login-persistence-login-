import { db } from "../config/db.js";
import bcrypt from "bcrypt";

const loginController = async (req, res) => {
    const { username, password } = req.body;

    let [rows] = await db.execute(`select * from users where username = ?`, [
        username,
    ]);


    if (
        rows.length === 0 ||
        !(await bcrypt.compare(password, rows[0].password))
    ) {
       return res.render("login", {
            error: ` Invalid Credentials !`,
        });
    }

    req.session.userID = rows[0].id;
    res.redirect("/todo");
};

export default loginController;
