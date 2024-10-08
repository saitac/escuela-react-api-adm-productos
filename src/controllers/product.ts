
import {Request, Response} from "express"
import Product from "../models/Product.model";
import { IntProduct } from "../interfaces/interfaces";

const productsGet = async (req: Request, res: Response) => {
    try {

        const products: IntProduct[] = await Product.findAll();

        /*
        
        const products = await Product.findAll({
            attributes: {exclude: ["createdAt","updatedAt","availability"]}
        })

        */

        return res.status(200).json({
            status: "ok",
            data: products
        })
    } catch (error) {
        if ( error instanceof Error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            })
        }
    }
}

const productGetById = async (req: Request, res: Response) => {
    try {

        const {id}  = req.params;
        const product: IntProduct | null = await Product.findByPk(id);

        if (!product){
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            status: "ok",
            data: product,
        })
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }
}

const productCreate = async (req: Request, res: Response) => {
    try {

        const newProduct: IntProduct = await Product.create(req.body);

        return res.status(201).json({
            status: "ok",
            message: "Producto creado correctamente",
            data: newProduct
        });
    } catch (error) {
        if ( error instanceof Error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }
}

const productUpdate = async (req: Request, res: Response) => {
    try {
        const {id}  = req.params;
        const product: IntProduct | null = await Product.findByPk(id);

        if (!product){
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }
        
        await product.update(req.body);
        await product.save();

        return res.status(200).json({
            status: "ok",
            data: product
        });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }
}

const productAvailabilityUpdate = async (req: Request, res: Response) => {
    try {

        const {id}  = req.params;
        const product: IntProduct | null = await Product.findByPk(id);

        if (!product){
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }

        product.availability = !product.dataValues.availability;
        await product.save();

        return res.status(200).json({
            status: "ok",
            data: product
        });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }
}

const productDelete = async (req: Request, res: Response) => {
    try {
        const {id}  = req.params;
        const product: IntProduct | null = await Product.findByPk(id);

        if (!product){
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }

        await product.destroy();

        return res.status(200).json({
            status: "ok",
            message: "Producto eliminado"
        });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }
}

export {
    productCreate,
    productsGet,
    productGetById,
    productUpdate,
    productAvailabilityUpdate,
    productDelete
}