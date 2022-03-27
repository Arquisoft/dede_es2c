import { Console } from "console";
import { RequestHandler, response, request } from "express";
import { body, param } from "express-validator";
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


// ******** Métodos extra POST ********

export const createProductURL : RequestHandler= async (req = request, res = response) => {
    // EJEMPLO: localhost:5000/product/add/codeExample/categoryExample/nameExample/10/descriptionExample/3/urlExample
    try {
        if(checkParams(req.params)){
            const productoEncontrado = await Product.findOne({codigo: req.params.codigo});
            if(productoEncontrado == null){
                const product = new Product(req.params);
                await product.save();
                return res.send("New product OK")
            } else {
                return res.send("There was a problem adding a product")
            }
        }   
    }catch (err){
        return res.status(400).json({msg: err})
    }
}


export const createProductForm = async (req = request, res = response) => {
    try {
        if(checkParams(req.body)){
            const productoEncontrado = await Product.findOne({codigo: req.params.codigo});
            if(productoEncontrado == null){
                const product = new Product(req.body);
                await product.save();
                return res.send("New product OK")
            } else {
                return res.send("There was a problem adding a product")
            }
        }
        
    }catch (err){
        console.log(err);
        res.status(400).json({msg: err})
    }
}

function checkParams(body: any): boolean{
    const {codigo, categoria, nombre, precio, descripcion, stock, url} = body;
    return codigo != null && codigo != '' && categoria != null && categoria != '' && 
    nombre != null && nombre != '' && descripcion != null && descripcion != '' && 
    precio >= 0 && stock > 0 && url != null && url != ''
}


export const deleteProductURL: RequestHandler = async (req, res) => {
    // EJEMPLO: localhost:5000/product/delete/62404a4b4d0ed7d3c5c3e39c
    try{
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        return res.send("Product deleted");
    }catch (err){
        return res.status(404).json({message: "There was a problem deleting a prodcut"});
    }
}

export const deleteProductPOST: RequestHandler = async (req, res) => {
    try{
        const {id} = req.body;
        await Product.findByIdAndDelete(id);
        return res.send("Product deleted");
    }catch (err){
        return res.status(404).json({message: "There was a problem deleting a prodcut"});
    }
}

export const updateProductURL: RequestHandler = async (req, res) => {
    // EJEMPLO: localhost:5000/product/update/62404dd8d75496dc3793f573/55/nombreCambiado/descripcionCambiada/urlCambiada
    try {
        const id  = req.params.id;
        const {_id,stock, ...params} = req.params;
        await Product.findByIdAndUpdate(id, params); 
        return res.send("Product updated OK");
    }catch (err){
        console.log(err);
        return res.status(404).json({message: "There was a problem updating a product"})
    }
}
