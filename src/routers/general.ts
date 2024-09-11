import express , {Router, Request, Response} from "express"


const generalRouter: Router = express.Router();

// ruta de prueba
generalRouter.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde GET");
});

generalRouter.post("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde POST");
});

generalRouter.put("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde PUT");
});

generalRouter.patch("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde PATCH");
});

generalRouter.delete("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde DELETE");
});

export default generalRouter;