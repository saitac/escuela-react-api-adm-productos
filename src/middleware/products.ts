
import {Request, Response, NextFunction} from "express"
import { check, param, validationResult } from "express-validator"

const handleProductInputErrors = async (req: Request , res: Response, next: NextFunction) => {

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

    next();
}

const handleProductGetByIdErrors = async (req: Request , res: Response, next: NextFunction) => {
    // Validación
    await param("id")
    .isInt()
    .withMessage("ID no válido")
    .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({
            status: "error",
            message: "Parámetros inválidos o faltantes",
            errors: errors.array()
        })
    }

    next();
}


export {
    handleProductInputErrors,
    handleProductGetByIdErrors
}