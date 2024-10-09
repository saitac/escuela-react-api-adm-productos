// código para limpiar base de datos cuando se terminen las pruebas
import {exit} from "node:process"
import db from "../config/db";
import { connectDB } from "../server";


const clearDB = async () => {
    try {
        await connectDB();
        await db.sync({force: true});
        console.log("Datos eliminados correctamente!");
        exit(0);
    } catch (error) {
        console.log(error);
        exit(1)
    }
}


if (process.argv[2] === "--clear") {
    clearDB();
}

