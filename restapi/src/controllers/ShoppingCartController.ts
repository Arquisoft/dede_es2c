import { RequestHandler } from "express";
import { ShoppingCart } from "../model/ShoppingCart";




/**
 * Método que busca el carro por su id
 * @param req Request
 * @param res Response
 * @returns lista de productos filtrados por su id
 */
 export const getShoppingCartByID: RequestHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const encontrado = await ShoppingCart.findOne({_id: id});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay producto con ese ID'});
    }
}

/**
 * Método que busca el carro con el precio establecido
 * @param req Request
 * @param res Response
 * @returns Precio del carros
 */
 export const getShoppingCartByPrice: RequestHandler = async (req, res) => {
    const cod = req.params.precio;
    try {
        const encontrado = await ShoppingCart.findOne({precio: cod});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json();
    }
}


/**
 * Método que retorna todos los carros
 * @param req Request
 * @param res Response
 * @returns lista con todos los carros
 */
 export const findShoppingCarts: RequestHandler = async (req, res) => {
    try {
        const allP = await ShoppingCart.find();
        return res.json(allP); 
    }catch(error){
        res.json(error);
    }
}

