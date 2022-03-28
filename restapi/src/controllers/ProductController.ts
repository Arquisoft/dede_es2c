import { RequestHandler, response, request } from "express";
import { Product } from "../model/Product";


/************* GENERAR DATOS *************/

export const generateExample: RequestHandler = async(req, res, next) => {
    // Haz aquí los cambios en vez de tener que meter manualmente los datos en mongoDB
    // Si quieres intorducir un nuevo pedido: cambia el código 
    try {

        let product = new Product();
        product.codigo = "codeExample";
        product.categoria = "categoryExample";
        product.nombre = "nameExample";
        product.precio = 10;
        product.descripcion = "descriptionExample";
        product.stock = 3;
        product.url = "urlExample";
        product.save();
        return res.json(product);
    } catch (error){
        console.log(error);
    }
    

}


/************* POST *************/

export const addProductURL : RequestHandler= async (req = request, res = response) => {
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



export const addProductForm = async (req = request, res = response) => {
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


export const deleteProductURL: RequestHandler = async (req, res) => {
    // EJEMPLO: localhost:5000/product/delete/62404a4b4d0ed7d3c5c3e39c
    try{
        const {codigo} = req.params;
        await Product.deleteOne({codigo: codigo});
        return res.send("Product deleted");
    }catch (err){
        return res.status(404).json({message: "There was a problem deleting a prodcut"});
    }
}

export const deleteProductForm: RequestHandler = async (req, res) => {
    try{
        const {codigo} = req.body;
        await Product.deleteOne({codigo: codigo});
        return res.send("Product deleted");
    }catch (err){
        return res.status(404).json({message: "There was a problem deleting a prodcut"});
    }
}

export const updateProductURL: RequestHandler = async (req, res) => {
    // EJEMPLO: localhost:5000/product/update/62404dd8d75496dc3793f573/55/nombreCambiado/descripcionCambiada/urlCambiada
    try {
        const codigo  = req.params.codigo;
        const {...params} = req.params;
        await Product.findOneAndUpdate({codigo: codigo}, params); 
        return res.send("Product updated OK");
    }catch (err){
        console.log(err);
        return res.status(404).json({message: "There was a problem updating a product"})
    }
}

export const updateProductForm: RequestHandler = async (req, res) => {
    // EJEMPLO: localhost:5000/product/update/62404dd8d75496dc3793f573/55/nombreCambiado/descripcionCambiada/urlCambiada
    try {
        const codigo  = req.body.codigo;
        const {...body} = req.body;
        await Product.findOneAndUpdate({codigo: codigo}, body); 
        return res.send("Product updated OK");
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



/************* GET *************/

 export const getProductoByCode: RequestHandler = async (req, res) => {
    const cod = req.params.codigo;
    try {
        const encontrado = await Product.findOne({codigo: cod});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json();
    }
}


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

export const getProducts: RequestHandler = async (req, res) => {
    try {
        const allP = await Product.find();
        return res.json(allP); 
    }catch(error){
        res.json(error);
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