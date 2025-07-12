import express from "express";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import path from "path";
import { fileURLToPath } from "url";
import { dbConfig } from "./config/db.js";
import createMySQLStore from "express-mysql-session";

let app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

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
            secure: true, // only over HTTPS
            sameSite: "strict",
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

//regex fallback for unmatched routes
app.get(/^\/.*/, (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(3000, () => {
    console.log("Server running on PORT 3000");
});
