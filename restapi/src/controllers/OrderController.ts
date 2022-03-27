import { Console } from "console";
import { RequestHandler } from "express";
import { Order } from "../model/Order";
import { Product } from "../model/Product";

const express = require("express");

/**
 * Método cuyo único propósito es ver si se aceptan peticiontes GET
 */
export const getMessage: RequestHandler = async (req, res) => {
    try {
        console.log("hola");
        return res.json({
            text: 'ejemplo'
        })
    }catch(error){
        console.log(error);
    }
}


// INSERTAR UN NUEVO PEDIDO EN LA BD


export const generarPedidoEjemplo: RequestHandler = async(req, res, next) => {

    // Haz aquí los cambios en vez de tener que meter manualmente los datos en mongoDB
    // Si quieres intorducir un nuevo pedido: cambia el código 
    
    try {

        let order = new Order();
        // Lo que ahora entiendo que se haría desde un formulario
        //order.codigo = req.body.codigo;
        order.codigo = "orderOneExample";
        order.correo = "admin@uniovi.es";
        order.direccion = "dirExample";
        order.fecha = new Date();
        order.precioTotal = 161,86;
        order.productos = [{
                "id" : "6225f87724b683231c0dc36f",
                "cantidad": 1
            }, {
                "id" : "6225f7fa24b683231c0dc36e",
                "cantidad": 1
            }
        ];
        order.save();

        return res.json(order);

    } catch (error){

        // Si hay algún error
        console.log(error);
    }

}

// PARA LOS POST EN UN FUTURO

export const i: RequestHandler = async(req, res, next) => {

    //Asumo que el id del producto a añadir viene en el cuerpo (body) de la solicitud

    try {

        // Toda la info de la URL
        const codigo = req.body.codigo;
        const correo = req.body.correo;
        const fecha = req.body.fecha;
        const direccion = req.body.direccion;
        const precioTotal = req.body.precioTotal;
        const productos = req.body.productos;
        const order = new Order({codigo: codigo, correo: correo, direccion: direccion, fecha: fecha,
                                    precioTotal: precioTotal, productos: productos});

        // Guardo el pedido
        order.save();
    } catch (error){

        // Si hay algún error
        console.log(error);
    }

}


// GET PARA BUSCAR LOS DATOS DE LOS PEDIDOS


/**
 * Método que busca los pedidos por el codigo de este
 * @param req Request
 * @param res Response
 * @returns Pedido con el codigo especificado
 */
 export const getOrderByCode: RequestHandler = async (req, res) => {
    const cod = req.params.codigo;
    try {
        const encontrado = await Order.findOne({codigo: cod});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json();
    }
}

/**
 * Método que busca los pedidos por el id de este
 * @param req Request
 * @param res Response
 * @returns Pedido con el id especificado
 */
 export const getOrderByID: RequestHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const encontrado = await Order.findOne({_id: id});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay pedido con ese ID'});
    }
}


/**
 * Método que busca los pedidos por el precio de este
 * @param req Request
 * @param res Response
 * @returns Pedido con el precio especificado
 */
 export const getOrderByPrice: RequestHandler = async (req, res) => {
    const price = req.params.price;
    try {
        const encontrado = await Order.findOne({precioTotal: price});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay pedido con ese precio'});
    }
}

/**
 * Método que busca los pedidos por la dirección de este
 * @param req Request
 * @param res Response
 * @returns Pedido con el precio especificado
 */
 export const getOrderByDirection: RequestHandler = async (req, res) => {
    const dir = req.params.dir;
    try {
        const encontrado = await Order.findOne({direccion: dir});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay pedido con esa direccion'});
    }
}


/**
 * Método que busca los pedidos asociados a un usuario
 * @param req Request
 * @param res Response
 * @returns Pedido con el precio especificado
 */
 export const getOrderByEmail: RequestHandler = async (req, res) => {
    const email = req.params.email;
    try {
        const encontrado = await Order.findOne({correo: email});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay un usuario asociado a ese pedido'});
    }
}

/**
 * Método que busca los pedidos por la fecha de este
 * @param req Request
 * @param res Response
 * @returns Pedido con la fecha especificada
 */
 export const getOrderByDate: RequestHandler = async (req, res) => {
    const date = req.params.date;
    try {
        const encontrado = await Order.findOne({fecha: date});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay pedido con esa fecha'});
    }
}

/**
 * Método que te devuelve el array de productos buscando por su codigo
 * @param req Request
 * @param res Response
 * @returns La lista de productos buscando por código 
 */
 export const getOrderProductsByCode: RequestHandler = async (req, res) => {
    const code = req.params.code;
    try {
        const encontrado = await Order.findOne({codigo: code});
        // Encuentro el pedido pero busco devolver los productos
        const productos = encontrado.productos
        return res.json(productos)
    }catch(error){
        return res.status(404).json({message: 'No se ha encontrado la lista de productos'});
    }
}


/**
 * Método que te devuelve el primer producto del array de pedidos
 * @param req Request
 * @param res Response
 * @returns La lista de productos buscando por código 
 */
 export const getFirstProductByCode: RequestHandler = async (req, res) => {
    const code = req.params.code;

    try {

        const encontrado = await Order.findOne({codigo: code});

        // Busco el primer producto
        const id_producto = encontrado.productos[0].id;

        const producto = await Product.findOne({_id: id_producto});

        return res.json(producto);


    }catch(error){
        return res.status(404).json({message: "Ha surgido un error"});
    }
}


/**
 * Método que retorna todos los pedidos
 * @param req Request
 * @param res Response
 * @returns lista de los pedidos
 */
 export const getOrders: RequestHandler = async (req, res) => {
    try {
        const allP = await Order.find();
        return res.json(allP); 
    }catch(error){
        console.log(error);
    }
}
