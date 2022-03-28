import { Console } from "console";
import { RequestHandler, response, request } from "express";
//import { body, param } from "express-validator";
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

export const getProductByPrice: RequestHandler = async (req, res) => {
    // Mirar esto, no funciona del todo
    const min = req.params.min;

    try{
        const todos = await Product.find({precio: min});
        return res.json(todos);

    }catch(error){
        console.log(error);
        res.json(error);
    }
}


// Métodos extra

export const createProduct = async (req = request, res = response) => {
    try {
        if(checkParams(req.body)){
            if(checkDoesNotExistProductCode(req.body.codigo)){
                const product = new Product(req.body);
                await product.save();
                res.status(201).json({product})
            }
        }
        
    }catch (err){
        console.log(err);
        res.status(400).json({msg: err})
    }
}

function checkParams(body: any): boolean{
    const {codigo, categoria, nombre, precio, stock, url} = body;
    return codigo != null && codigo != '' && categoria != null && categoria != '' && 
    nombre != null && nombre != '' && precio >= 0 && stock > 0 && url != null && url != ''
}

function checkDoesNotExistProductCode(codigo: string): boolean{
    const p =  Product.getProductoByCode({codigo: String});
    return p;
}

export const deleteProduct: RequestHandler = async (req, res) => {
    try{
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        return res.send("Product deleted");
    }catch (err){
        return res.status(404).json({message: "There was a problem deleting a prodcut"});
    }
}

export const update: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const {_id,codigo, ...params} = req.body;
        if(codigo){
            if(checkDoesNotExistProductCode(codigo)){
                params.codigo = codigo;
            }
        }
        await Product.findByIdAndUpdate(id, params);
        return res.send("Product updated");
    }catch (err){
        console.log(err);
        return res.status(404).json({message: "There was a problem updating a product"})
    }
}
