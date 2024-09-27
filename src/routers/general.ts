import express , {Router, Request, Response} from "express"
import { productAvailabilityUpdate, productCreate, productDelete, productGetById, productsGet, productUpdate } from "../controllers/product";
import { handleProductAvailabilityUpdateErrors, handleProductDeleteErrors, handleProductGetByIdErrors, handleProductInputErrors, handleProductUpdateErrors } from "../middleware/products";


const generalRouter: Router = express.Router();

// ruta de prueba
generalRouter.get("/", productsGet);

generalRouter.get("/:id", handleProductGetByIdErrors, productGetById);

generalRouter.post("/", handleProductInputErrors, productCreate);

generalRouter.put("/:id",handleProductUpdateErrors, productUpdate);

generalRouter.patch("/:id",handleProductAvailabilityUpdateErrors, productAvailabilityUpdate);

generalRouter.delete("/:id", handleProductDeleteErrors, productDelete);

export default generalRouter;
