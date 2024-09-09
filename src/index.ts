
import { server } from "./server";

const puerto: number = 3900;

server.listen(puerto, () => {console.log("Puerto corriendo....")});
