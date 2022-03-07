import { Console } from "console";
import { RequestHandler } from "express";
import { Order } from "../model/Order";


// NO SÉ POR QUÉ NO ME LO DETECTA

/**
 * Método que retorna todos los pedidos
 * @param req Request
 * @param res Response
 * @returns lista de los pedidos
 */
 export const getOrders: RequestHandler = async (req, res) => {
    try {
        console.log("hola");
        const allP = await Order.find();
        return res.json(allP); 
    }catch(error){
        console.log(error);
    }
}


export const getMessage: RequestHandler = async (req, res) => {
    try {
        await console.log("hola");
        return res.json({
            text: 'ejemplo'
        })
    }catch(error){
        console.log(error);
    }
}


/**
 * ¿Para meter datos en un futuro?
 */
const insertShoppingCartData: RequestHandler = async (req, res) => {
    let shoppingCartOne = new Order(
        {
            "codigo" : "cesta1",
            "direccion" : "prueba1",
            "fecha" : "06/03/2022",
            "precioTotal": 66,
            "productos": [
                {
                    "codigo_producto": "AAA0",
                    "cantidad" : 2,
                    "precio" : 23
                }
            ]
        }
    );
    shoppingCartOne.save();
}

