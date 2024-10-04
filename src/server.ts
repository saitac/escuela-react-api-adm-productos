
import express, {Express, Request, Response} from "express";
import colors from "colors"
import generalRouter from "./routers/general";
import db from "./config/db";
import Product from "./models/Product.model";

// Función que conecta a la BD
const connectDB = async () => {
    try {
        let ok: boolean = true;
        await db.authenticate().then(
            async () => {
                
                await Product.sync().catch(
                    () => {
                        ok = false;
                        console.log(colors.bgRed.white("Hubo un error al crear la tabla Products"));
                    }
                );  
                  
            }
        );
        
        //if (ok) {console.log(colors.bgGreen.bold("Conexión existosa a la BD"))};
        
    } catch (error) {
        console.log(colors.bgRed.white("Hubo un error al conectar a la BD"));
    }
}

connectDB();

// Crea instancia de servidor express
const server: Express = express();

// Convierte body a objeto JS 
server.use(express.json());

// Cargo las rutas de generalRouter
server.use("/api/products", generalRouter);

server.get("/api", (req: Request, res: Response) => {
    res.status(200).json({msg:"Desde"})
})

export {server}