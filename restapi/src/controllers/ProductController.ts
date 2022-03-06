import { Console } from "console";
import { RequestHandler } from "express";
import { Product } from "../model/Product";


/**
 * Método que busca los productos por codigo de este
 * @param req Request
 * @param res Response
 * @returns lista de productos filtrados por codigo
 */
export const getProductoByCode: RequestHandler = async (req, res) => {
    const cod = req.params.codigo;
    try {
        const encontrado = await Product.findOne({codigo: cod});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json();
    }
}

/**
 * Método que busca los productos por id de este
 * @param req Request
 * @param res Response
 * @returns lista de productos filtrados por su id
 */
export const getProductoByID: RequestHandler = async (req, res) => {
    // Este método todavia no funciona
    const id = req.params.id;
    try {
        const encontrado = await Product.findOne({_id: id});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay producto con ese ID'});
    }
}

/**
 * Método que busca los productos por categoria de este
 * @param req Request
 * @param res Response
 * @returns lista de productos filtrados por categoria
 */
export const getProductsByCategoria: RequestHandler = async (req, res) => {

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
export const findProducts: RequestHandler = async (req, res) => {
    try {
        const allP = await Product.find();
        return res.json(allP); 
    }catch(error){
        res.json(error);
    }
}