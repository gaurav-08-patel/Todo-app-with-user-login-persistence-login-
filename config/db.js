import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

 const dbConfig = {
    "host" : "localhost",
    "user" : process.env.DB_USER,
    "password" : process.env.DB_PASSWORD,
    "database" : process.env.DB_NAME
}

 const db = mysql.createPool(dbConfig);

 export {dbConfig , db};