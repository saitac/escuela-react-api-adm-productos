
import express, {Express} from "express";
import colors from "colors"
import generalRouter from "./routers/general";
import db from "./config/db";
import Product from "./models/Product.model";

// Función que conecta a la BD
const connectDB = async () => {
    try {
        await db.authenticate();
        //await Product.sync();
        console.log(colors.bgGreen.bold("Conexión existosa a la BD"));
    } catch (error) {
        console.log(colors.bgRed.white("Hubo un error al conectar a la BD"));
    }
}

connectDB();

const server: Express = express();

 // Cargo las rutas de generalRouter
 server.use("/api", generalRouter);

export {server}