import { db } from "../config/db.js";
import bcrypt from "bcrypt";

const registerController = async (req, res) => {
    const { username, password } = req.body;
    let [userCheck] = await db.execute(
        `Select * from users where username = ?`,
        [username]
    );

    if (userCheck.length > 0) {
        res.render("register", {
            success: null,
            error: `User ${username} already exists ❗`,
        });
    }

    let hashedpwd = await bcrypt.hash(password ,10);
    
    await db.execute(`insert into users (username , password ) values( ? , ? )`,[username , hashedpwd]);
    

    res.render("register", {
        success: `User ${req.body.username} registered`,
        error: null,
    });
};

export default registerController;
