
import { server } from "./server";
import dotenv from "dotenv"
import colors from "colors"

dotenv.config();

server.listen(process.env.PUERTO, () => {console.log(colors.cyan.bold(`Rest API en el puerto ${process.env.PUERTO}`))});
