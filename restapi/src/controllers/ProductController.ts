import { RequestHandler } from "express";
import { Product } from "../model/Product";

/**
 * Método que busca los productos por codigo de este
 * @param req Request
 * @param res Response
 * @returns lista de productos filtrados por codigo
 */
export const getProductoByCode: RequestHandler = async (req, res) => {
    const encontrado = await Product.find({codigo: req.params.codigo});

    if(encontrado){
        return res.json(encontrado);
    } else {
        return res.status(404).json();
    }
}

/**
 * Método que busca los productos por categoria de este
 * @param req Request
 * @param res Response
 * @returns lista de productos filtrados por categoria
 */
export const getProductsByCategoria: RequestHandler = async (req, res) => {
    const encontrado = await Product.find({codigo: req.params.codigo});

    try {
        const encontrado = await Product.find({categoria: req.params.categoria});
        return res.json(encontrado);
    }catch(error){
        res.status(404).json({message: 'No hay productos de esa categoría'})
    }
}

/**
 * Método que retorna todos los productos
 * @param req Request
 * @param res Response
 * @returns lista de los productos
 */
export const getAllProducts: RequestHandler = async (req, res) => {
    try {
        const allP = await Product.find();
        return res.json(allP); 
    }catch(error){
        res.json(error);
    }
}