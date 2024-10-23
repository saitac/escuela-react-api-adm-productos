import express , {Router} from "express"
import { productAvailabilityUpdate, productCreate, productDelete, productGetById, productsGet, productUpdate } from "../controllers/product";
import { handleProductAvailabilityUpdateErrors, handleProductDeleteErrors, handleProductGetByIdErrors, handleProductInputErrors, handleProductUpdateErrors } from "../middleware/products";


const generalRouter: Router = express.Router();

/**
*   @swagger
*       /api/products:
*           get:
*               summary: Devuelve todos los productos.
*               description: Devuelve todos los productos en un onjeto JSON dentro de un arreglo.
*               tags:
*                   - Products
*               produces:
*                   - application/json
*               responses:
*                   200:
*                       description: Solicitud exitosa
*                       content:
*                           schema:
*                               type: object
*                               properties:
*                                   status:
*                                       type: string
*                                       example: Ok
*                                   data:
*                                       type: array
*                                           items:
*                                               type: object
*                                               properties:
*                                                   id:
*                                                       type: integer
*                                                       example: 1
*                                                   name:
*                                                       type: string
*                                                       description: Nombre del producto
*                                                       example: Monitor Curvo 34 Pulgadas
*                                                   price:
*                                                       type: number
*                                                       description: Precio del producto
*                                                       example: 300
*                                                   availability:
*                                                       type: boolean
*                                                       description: Disponibilidad del producto
*                                                       example: true
*/


/**
*   @swagger
*       /api/products/{id}:
*           get:
*               summary: Devuelve un producto.
*               description: Devuelve un producto en base al id que se le pasa como parámetro.
*               tags:
*                   - Products
*               produces:
*                   - application/json
*               parameters:
*                   - name: id
*                     description: Id del producto
*                     required: true
*                     type: integer
*                     example: 1
*               responses:
*                   200:
*                       description: Solicitud exitosa
*                       schema:
*                           type: object
*                           properties:
*                               status:
*                                   type: string
*                                   example: Ok
*                               data:
*                                   type: object
*                                   properties:
*                                       id:
*                                           type: integer
*                                           description: Id del producto
*                                           example: 1
*                                       name:
*                                           type: string
*                                           description: Nombre del producto
*                                           example: Monitor Curvo 34 Pulgadas
*                                       price:
*                                           type: number
*                                           description: Precio del producto
*                                           example: 300
*                                       availability:
*                                           type: boolean
*                                           description: Disponibilidad del producto
*                                           example: true
*/


// ruta de prueba
generalRouter.get("/", productsGet);

generalRouter.get("/:id", handleProductGetByIdErrors, productGetById);

generalRouter.post("/", handleProductInputErrors, productCreate);

generalRouter.put("/:id",handleProductUpdateErrors, productUpdate);

generalRouter.patch("/:id",handleProductAvailabilityUpdateErrors, productAvailabilityUpdate);

generalRouter.delete("/:id", handleProductDeleteErrors, productDelete);

export default generalRouter;
