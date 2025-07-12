import express from "express";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { dbConfig } from "./config/db.js";
import createMySQLStore from "express-mysql-session";
let app = express();

app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json());
app.use("/", express.static("public"));
let MySQLStore = createMySQLStore(session);

app.set("view engine", "ejs");

let sessionStore = new MySQLStore(dbConfig);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        },
    })
);

app.get("/todo", (req, res) => {
    if (!req.session.userID) return res.redirect("/login");
    res.render("todo");
});

// Routes
import { rootRouter } from "./routes/root.js";
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
import logoutRouter from "./routes/logout.js";
import { todosRouter } from "./routes/api/todos.js";

app.use("/", rootRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/logout", logoutRouter);
app.use("/todos", todosRouter);

app.listen(3500, () => {
    console.log("Server running on PORT 3500");
});
