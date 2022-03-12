import { Console } from "console";
import { RequestHandler } from "express";
import { Order } from "../model/Order";


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



// GET PARAA BUSCAR LOS DATOS DE LOS PEDIDOS


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
 export const getOrderByIdUser: RequestHandler = async (req, res) => {
    const user = req.params.idUser;
    try {
        const encontrado = await Order.findOne({id_user: user});
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
 * Método que te devuelve un producto específico del array de productos de un pedido a buscar
 * @param req Request
 * @param res Response
 * @returns La lista de productos buscando por código 
 */
 export const getOrderConcreteProductByCode: RequestHandler = async (req, res) => {
    const code = req.params.code;
    const code2 = req.params.code2;
    try {
        const encontrado = await Order.findOne({codigo: code});
        // Bucle for
        for (let i = 0; i<encontrado.productos.length; i++){
            if (encontrado.productos[i].codigo_producto === code2){
                return res.json(encontrado.productos[i]);
            }
        }
        return res.json("ERROR");
    }catch(error){
        return res.status(404).json({message: 'No se ha encontrado la lista de productos'});
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


///... etc llegado este punto añades más cuando te haga falta