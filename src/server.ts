
import express, {Express, Request, Response} from "express";

const server: Express = express();

 // ruta de prueba
server.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde GET");
});

server.post("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde POST");
});

server.put("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde PUT");
});

server.patch("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde PATCH");
});

server.delete("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde DELETE");
});

export {server}