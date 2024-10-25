import express , {Router} from "express"
import { productAvailabilityUpdate, productCreate, productDelete, productGetById, productsGet, productUpdate } from "../controllers/product";
import { handleProductAvailabilityUpdateErrors, handleProductDeleteErrors, handleProductGetByIdErrors, handleProductInputErrors, handleProductUpdateErrors } from "../middleware/products";


const generalRouter: Router = express.Router();

/**
*  @swagger
*      /api/products:
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
*                       schema:
*                           type: object
*                           properties:
*                               status:
*                                   type: string
*                                   example: Ok
*                               data:
*                                   type: array
*                                   items:
*                                       type: object
*                                       properties:
*                                           id:
*                                               type: integer
*                                               description: Id del producto
*                                               example: 1
*                                           name:
*                                               type: string
*                                               description: Nombre del producto
*                                               example: Monitor Curvo 34 Pulgadas
*                                           price:
*                                               type: number
*                                               description: Precio del producto
*                                               example: 300
*                                           availability:
*                                               type: boolean
*                                               description: Disponibilidad del producto
*                                               example: true
*/

generalRouter.get("/", productsGet);

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
*                   - in: path
*                     name: id
*                     description: Id del producto
*                     required: true
*                     schema:
*                       type: integer
*                       example: 1
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
*                   404:
*                       description: Recurso no existe
*                   400:
*                       description: Solicitud erronea - Id Inválido
*/

generalRouter.get("/:id", handleProductGetByIdErrors, productGetById);


/**
 *  @swagger
 *      /api/products:
 *          post:
 *              summary: Crea un producto.
 *              description: Crea un prodcuto en la BD según el JSON enviado y devuelve un JSON con los datos.
 *              tags:
 *                  - Products
 *              requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      example: "Monitor Curvo 49"
 * 
 * 
 * 
 */

generalRouter.post("/", handleProductInputErrors, productCreate);

generalRouter.put("/:id",handleProductUpdateErrors, productUpdate);

generalRouter.patch("/:id",handleProductAvailabilityUpdateErrors, productAvailabilityUpdate);

generalRouter.delete("/:id", handleProductDeleteErrors, productDelete);

export default generalRouter;
