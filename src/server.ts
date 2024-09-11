
import express, {Express} from "express";
import generalRouter from "./routers/general";
import db from "./config/db";

// Función que conecta a la BD
const connectDB = async () => {
    try {
        await db.authenticate();
        console.log("Conexión existosa a la BD");
    } catch (error) {
        console.log(error);
        console.log("Hubo un error al conectar a la BD");
    }
}

connectDB();

const server: Express = express();

 // Cargo las rutas de generalRouter
 server.use("/api", generalRouter);

export {server}