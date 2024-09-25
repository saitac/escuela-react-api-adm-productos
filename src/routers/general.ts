import express , {Router, Request, Response} from "express"
import { productCreate, productGetById, productsGet, productUpdate } from "../controllers/product";
import { handleProductGetByIdErrors, handleProductInputErrors } from "../middleware/products";


const generalRouter: Router = express.Router();

// ruta de prueba
generalRouter.get("/", productsGet);

generalRouter.get("/:id", handleProductGetByIdErrors, productGetById);

generalRouter.post("/", handleProductInputErrors, productCreate);

generalRouter.put("/:id", productUpdate);



generalRouter.patch("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde PATCH");
});

generalRouter.delete("/", (req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!, desde DELETE");
});

export default generalRouter;
