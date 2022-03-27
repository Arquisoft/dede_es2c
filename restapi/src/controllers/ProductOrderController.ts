import { RequestHandler } from "express";
import { ProductOrder } from "../model/ProductOrder";


/************* GENERAR DATOS *************/

export const generateExample: RequestHandler = async(req, res, next) => {
    try {
        let productOrder = new ProductOrder();
        productOrder.id_product = "623e25ef4ec026c9f608e644";
        productOrder.cantidad = 1;
        productOrder.id_order = "6240908c872a7abf5ef0ff79";
        productOrder.save();
        return res.json(productOrder);
    } catch (error){
        console.log(error);
    }
}

/************* POST *************/

export const addProductOrderURL: RequestHandler = async(req, res, next) => {
    try {
        const id_product = req.params.id_product;
        const cantidad = req.params.cantidad;
        const id_order = req.params.id_order;
        const productOrder = new ProductOrder({id_product: id_product, cantidad : cantidad, id_order: id_order});
        productOrder.save();
        return res.send("Product in an order inserted");
    } catch (error){
        console.log(error);
    }
}

export const addProductOrderForm: RequestHandler = async(req, res, next) => {
    try {
        const id_product = req.body.id_product;
        const cantidad = req.body.cantidad;
        const id_order = req.body.id_order;
        const productOrder = new ProductOrder({id_product: id_product, cantidad : cantidad, id_order: id_order});
        productOrder.save();
        return res.send("Product in an order inserted");
    } catch (error){
        console.log(error);
    }
}

export const deleteProductOrderURL: RequestHandler = async (req, res) => {
    try{
        const {id} = req.params;
        await ProductOrder.findByIdAndDelete(id);
        return res.send("Product in an order deleted");
    }catch (err){
        return res.status(404).json({message: "There was a problem deleting a prodcut in an order"});
    }
}

export const deleteProductOrderForm: RequestHandler = async (req, res) => {
    try{
        const {id} = req.body;
        await ProductOrder.findByIdAndDelete(id);
        return res.send("Product in an order deleted");
    }catch (err){
        return res.status(404).json({message: "There was a problem deleting a prodcut in an order"});
    }
}

export const updateProductOrderURL: RequestHandler = async (req, res) => {
    try {
        const id  = req.params.id;
        const {_id, ...params} = req.params;
        await ProductOrder.findByIdAndUpdate(id, params); 
        return res.send("Product in an order updated OK");
    }catch (err){
        console.log(err);
        return res.status(404).json({message: "There was a problem updating a product in an order "})
    }
}

export const updateProductOrderForm: RequestHandler = async (req, res) => {
    try {
        const id  = req.body.id;
        const {_id, ...body} = req.body;
        await ProductOrder.findByIdAndUpdate(id, body); 
        return res.send("Product in an order updated OK");
    }catch (err){
        console.log(err);
        return res.status(404).json({message: "There was a problem updating a product in an order "})
    }
}


/************* GET *************/

 export const getProductOrderByID: RequestHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const encontrado = await ProductOrder.findOne({_id: id});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay producto en un pedido con ese ID'});
    }
}

 export const getProductOrders: RequestHandler = async (req, res) => {
    try {
        const allP = await ProductOrder.find();
        return res.json(allP); 
    }catch(error){
        console.log(error);
    }
}


