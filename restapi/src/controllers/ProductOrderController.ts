import { Console } from "console";
import { RequestHandler } from "express";
import { ProductOrder } from "../model/ProductOrder";

const express = require("express");


// INSERTAR UN NUEVO PRODUCTO PARA PEDIDO


export const generateExample: RequestHandler = async(req, res, next) => {

    // Haz aquí los cambios en vez de tener que meter manualmente los datos en mongoDB
    
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

// PARA LOS POST EN UN FUTURO

export const newProductOrder: RequestHandler = async(req, res, next) => {

    try {
        const id = req.body.id;
        const cantidad = req.body.cantidad;
        const productOrder = new ProductOrder({id: id, cantidad : cantidad});
        productOrder.save();
    } catch (error){
        console.log(error);
    }

}

// GET PARA BUSCAR LOS DATOS DE LOS PEDIDOS

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
