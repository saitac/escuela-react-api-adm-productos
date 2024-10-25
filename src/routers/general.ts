import express , {Router} from "express"
import { productAvailabilityUpdate, productCreate, productDelete, productGetById, productsGet, productUpdate } from "../controllers/product";
import { handleProductAvailabilityUpdateErrors, handleProductDeleteErrors, handleProductGetByIdErrors, handleProductInputErrors, handleProductUpdateErrors } from "../middleware/products";


const generalRouter: Router = express.Router();

/**
 *  @swagger
 *      components:
 *          schemas:
 *              Product:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                          description: Id del producto
 *                          example: 1
 *                      name:
 *                          type: string
 *                          description: Nombre del producto
 *                          example: Monitor Curvo de 49 Pulgadas
 *                      price:
 *                          type: number
 *                          description: Precio del producto
 *                          example: 300
 *                      availability:
 *                          type: boolean
 *                          description: Disponibilidad del producto
 *                          example: true
 *              Response:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                          example: "ok"
 */

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
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Response'
*                                   properties:
*                                       data:
*                                           type: array
*                                           items:
*                                               $ref: '#/components/schemas/Product'
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
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Response'
*                                   properties:
*                                       data:
*                                           $ref: '#/components/schemas/Product'                   
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
 *                                  price:
 *                                      type: number
 *                                      example: 450
 *              responses:
 *                  201:
 *                      description: Producto creado correctamente
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/Response'
 *                                  properties:
 *                                      message:
 *                                          type: string
 *                                          example: "Producto creado correctamente"
 *                                      data:
 *                                          $ref: '#/components/schemas/Product'  
 *                  400:
 *                      description: Solicitud errónea - Datos inválidos
 */

generalRouter.post("/", handleProductInputErrors, productCreate);


/**
 *  @swagger 
 *      /api/products/{id}:
 *          put:
 *              summary: Actualiza un producto.
 *              description: Actualiza un producto con los datos enviados en un objeto.
 *              tags:
 *                  - Products
 *              parameters:
 *                  - in: path
 *                    name: id
 *                    description: Id del producto
 *                    required: true
 *                    schema:
 *                      type: integer
 *                      example: 1
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
 *                                  price:
 *                                      type: number
 *                                      example: 450
 *                                  availability:
 *                                      type: boolean
 *                                      example: true
 *              responses:
 *                  200:
 *                      description: Producto actualizado correctamente
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/Response'
 *                                  properties:
 *                                      data:
 *                                          $ref: '#/components/schemas/Product'  
 *                  400:
 *                      description: Solicitud errónea - Datos inválidos
 *                  404:
 *                      description: Producto no encontrado
 */

generalRouter.put("/:id",handleProductUpdateErrors, productUpdate);


/**
 *  @swagger
 *      /api/products/{id}:
 *          patch:
 *              summary: Actualiza la disponibilidad del producto.
 *              description: Actualiza la disponibilidad del producto cambiando availability.
 *              tags:
 *                  - Products
 *              parameters:
 *                  - in: path
 *                    name: id
 *                    description: Id del producto
 *                    required: true
 *                    schema:
 *                      type: integer
 *                      example: 1
 *              responses:
 *                  200:
 *                      description: Disponibilidad cambiada correctamente
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/Response'
 *                                  properties:
 *                                      data:
 *                                          $ref: '#/components/schemas/Product'  
 *                  400:
 *                      description: Solicitud errónea - Id inválido
 *                  404:
 *                      description: Producto no encontrado
 */

generalRouter.patch("/:id",handleProductAvailabilityUpdateErrors, productAvailabilityUpdate);


/**
 *  @swagger
 *      /api/products/{id}:
 *          delete:
 *              summary: Elimina un producto.
 *              description: Elimina un producto cuyo Id se le pasa como parámetro.
 *              tags:
 *                  - Products
 *              parameters:
 *                  - in: path
 *                    name: id
 *                    description: Id del producto
 *                    required: true
 *                    schema:
 *                      type: integer
 *                      example: 1
 *              responses:
 *                  200:
 *                      description: Respuesta correcta
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/Response'
 *                                  properties:
 *                                      message:
 *                                          type: string
 *                                          example: Producto eliminado
 *                  400:
 *                      description: Solicitud errónea - Id inválido
 *                  404:
 *                      description: Producto no encontrado
 */

generalRouter.delete("/:id", handleProductDeleteErrors, productDelete);

export default generalRouter;
