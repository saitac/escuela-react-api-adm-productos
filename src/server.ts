
import express, {Express} from "express";
import generalRouter from "./routers/general";

const server: Express = express();

 // Cargo las rutas de generalRouter
 server.use("/api", generalRouter);

export {server}