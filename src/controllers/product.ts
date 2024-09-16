
import {Request, Response} from "express"
import Product from "../models/Product.model";
import { check, param, validationResult } from "express-validator"

const productCreate = async (req: Request, res: Response) => {
    try {

        // validacion
        await check("name")
            .notEmpty()
            .withMessage("El nombre del producto no puede ir vacío")
            .run(req);

        await check("price")
            .notEmpty()
            .withMessage("El precio del producto no puede ir vacío")
            .isNumeric().withMessage("El precio del producto debe ser numérico")
            .isFloat({min: 1}).withMessage("El precio del producto debe ser mayor que cero")
            .run(req);
        
        const errors = validationResult(req);
        
        if (!errors.isEmpty()){
            return res.status(400).json({
                status: "error",
                message: "Parámetros inválidos o faltantes",
                errors: errors.array()
            })
            
        }

        //const newProduct = await Product.create(params);

        return res.status(200).json({
            status: "ok",
            message: "Producto creado correctamente",
            newProduct:""
        });
    } catch (error) {
        if ( error instanceof Error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            })
        }
    }
}

export {
    productCreate
}