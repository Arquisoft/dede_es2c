import { RequestHandler, response, request } from "express";
import { Product, productModel } from "../model/Product";

const ProductPost = require('../model/Product')

/************* POST CON LOS PRODUCTOS *************/

export const addProductPost : RequestHandler= async (req = request, res = response) => {
    try {
        // Hay que buscar que no exista
        const productoPrevio = await productModel.findOne({codigo: req.body.codigo})
        if (productoPrevio == null){
            if (checkParams(req.body)){
                const prod = new productModel(req.body);
                await prod.save();
                res.status(201).json({prod})
            } else {
                return res.status(412).json({message: "Incomplete product"});
            }
        } else {
            return res.status(409).json({message: "A product with that code already exists"});
        }
            
    }catch (err){
        return res.status(400).json({msg: err})
    }
}


export const deleteProduct: RequestHandler = async (req, res) => {
    // EJEMPLO: localhost:5000/product/delete/62404a4b4d0ed7d3c5c3e39c
    try{
        const {codigo} = req.params;
        const productDeleted = await productModel.deleteOne({codigo: codigo});
        if (productDeleted.deletedCount == 1){
            return res.send("Product deleted");
        } else {
            return res.status(412).json({ message: "The operation didn't succed "});
        }
    }catch (err){
        return res.status(404).json({message: "There was a problem deleting a prodcut"});
    }
}


export const updateProduct: RequestHandler = async (req, res) => {
    // EJEMPLO: localhost:5000/product/update/62404dd8d75496dc3793f573/55/nombreCambiado/descripcionCambiada/urlCambiada
    try {
        const codigo  = req.params.codigo;
        const productUpdated = await productModel.findOneAndUpdate({codigo: codigo}, req.query, { new: true }); 
        if (productUpdated){
            return res.send("Product updated");
        }
    }catch (err){
        console.log(err);
        return res.status(404).json({message: "There was a problem updating a product"})
    }
}



function checkParams(body: any): boolean{
    const {codigo, categoria, nombre, precio, descripcion, stock, url} = body;
    return codigo != null && codigo != '' && categoria != null && categoria != '' && 
    nombre != null && nombre != '' && descripcion != null && descripcion != '' && 
    precio >= 0 && stock > 0 && url != null && url != ''
}


/************* GENERAR UN EJEMPLO *************/

export const generateExample: RequestHandler = async(req, res, next) => {
    // Haz aquí los cambios en vez de tener que meter manualmente los datos en mongoDB
    // Si quieres intorducir un nuevo pedido: cambia el código 
    try {
        let product = new productModel();
        product.codigo = "codeExample";
        product.categoria = "categoryExample";
        product.nombre = "nameExample";
        product.precio = 10;
        product.descripcion = "descriptionExample";
        product.stock = 3;
        product.url = "urlExample";
        product.save();
        res.status(201).json({product})
    } catch (error){
        return res.status(404).json({message: "There was a problem adding a product"})
    }
    

}


/************* BÚSQUEDA DE PRODUCTOS *************/

 export const getProductoByCode: RequestHandler = async (req, res) => {
    const cod = req.params.codigo;
    try {
        const encontrado = await productModel.findOne({codigo: cod});
        if (encontrado){
            return res.json(encontrado)
          } else {
            return res.status(412).json();
          }
    }catch(error){
        return res.status(404).json();
    }
}

export const getProducts: RequestHandler = async (req, res) => {
    try {
        const allP = await productModel.find();
        return res.json(allP); 
    }catch(error){
        res.json(error);
    }
}

export const getProductsByCategoria: RequestHandler = async (req, res) => {

    try {
        const encontrado = await productModel.find({categoria: req.params.categoria});
        if (encontrado){
            return res.json(encontrado)
          } else {
            return res.status(204).json();
          }
    }catch(error){
        res.status(404).json({message: 'No hay productos de esa categoría'})
    }
}

export const getProductByPrice: RequestHandler = async (req, res) => {
    const precio = req.params.precio;
    try{
        const productos = await productModel.find({precio: {$eq: precio}} );
        if (productos.length != 0){
            return res.json(productos)
          } else {
            return res.status(412).json();
          }
    }catch(error){
        res.status(404).json({message: 'No hay productos con ese precio'})

    }
}



// MÉTODOS QUE COMO DE MOMENTO NO USO Y ME PIDEN COBERTURA DE CÓDIGO DEJO COMENTADOS

/**
 

export const getProductoByID: RequestHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const encontrado = await Product.findOne({_id: id});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay producto con ese ID'});
    }
}

export const getProductsByCategoria: RequestHandler = async (req, res) => {

    try {
        const encontrado = await Product.find({categoria: req.params.categoria});
        return res.json(encontrado);
    }catch(error){
        res.status(404).json({message: 'No hay productos de esa categoría'})
    }
}

export const getProductByPrice: RequestHandler = async (req, res) => {
    const price = req.params.price;
    try{
        const todos = await Product.find({precio: price});
        return res.json(todos);
    }catch(error){
        console.log(error);
        res.json(error);
    }
}

 **/