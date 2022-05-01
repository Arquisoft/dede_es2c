import { RequestHandler } from "express";
import { orderModel } from "../model/Order";
import { Product, productModel } from "../model/Product";


const ShipmentCosts = require('../util/apiEasyPost')

/************* CREAR UN PEDIDO *************/

export const addOrder: RequestHandler = async (req, res) => {

   console.log("Base de datos")

    // Hay que actualizar el stock

    const updateNewStock = async (products: any) => {
        console.log(products)
      for (var i = 0; i < products.length; i++) {
        let product = await productModel.findOne({ codigo: products[i].codigo });
        product.stock = product.stock - products[i].stock;
        product.save(); // Se actualiza el stock de los productos
      }
    };

    // Calculas el precio total

    var totalPrice = 0;
    const updateTotalPrice = async (products: any) => {
        for (var i = 0; i < products.length; i++) {
          totalPrice = totalPrice + products[i].precio;
        }
        totalPrice = totalPrice * 1.21; // El IVA
      };
    

    
    try {
        if (checkParams(req.body)){
            const order = new orderModel(req.body);

            updateTotalPrice(order.products)
            order.precioTotal = totalPrice

            updateNewStock(order.products);
            const orderToSave = await order.save();
            res.json(orderToSave);
        } else {
            return res.status(412).json({message: "Incomplete order"});
        }
    } catch (error) {
        return res.status(404).json();
    }
};

function checkParams(body: any): boolean{
    const {codigo, correo, direccion, fecha, precioTotal, products} = body;
    return codigo != null && codigo != '' && correo != null && correo != '' && 
    direccion != null && direccion != '' && fecha != null   && products != null
}



/************* BORRAR UN PEDIDO *************/

export const deleteOrder: RequestHandler = async (req, res) => {
    try{
        const {codigo} = req.params;
        const orderDeleted = await orderModel.deleteOne({codigo: codigo});
        if (orderDeleted.deletedCount == 1){
            return res.send("Order deleted");
        } else {
            return res.status(412).json({ message: "The operation didn't succed "});
        }
    }catch (err){
        return res.status(404).json({message: "There was a problem deleting an order"});
    }
}



export const generateExample: RequestHandler = async(req, res, next) => {
    try {
        let order = new orderModel();
        order.codigo = "orderXExample";
        order.correo = "admin@uniovi.es";
        order.direccion = "dirExample";
        order.fecha = new Date();
        order.precioTotal = 139.99;
        order.products = [
            {
                codigo: "TE01", 
                categoria: "teclado", 
                nombre: "Logitech K120 Teclado con Cable",
                precio: 9.57, 
                descripcion: "Para Windows, Tamaño Normal, Resistante a Líquido, Barra Espaciadora Curvada, PC/Portátil, Disposición QWERTY Español, color Negro ",
                stock: 1,
                url: "https://i.postimg.cc/25fVD0hz/TE01.jpg"
            }, 
            {
                codigo: "RA01", 
                categoria: "raton", 
                nombre: "Logitech Ratón Inalámbrico M190",
                precio: 15.99, 
                descripcion: "Diseño Curvo Ambidiestro, Batería 18 Meses con Modo Ahorro, Receptor USB, Cursor y Desplazamiento Preciso, Rueda de Desplazamiento Amplio, Negro",
                stock: 5,
                url: "https://i.postimg.cc/RVyWPS0J/RA01.jpg"
            }

        ]
        order.save();
        return res.json(order);
    } catch (error){
        return res.send("Ha surgido un error")
    }

};

/************* BÚSQUEDA DE PEDIDOS *************/

export const getOrderByCode: RequestHandler = async (req, res) => {
    const cod = req.params.codigo;
    try {
        const encontrado = await orderModel.findOne({codigo: cod});
        if (encontrado){
            return res.json(encontrado)
          } else {
            return res.status(204).json();
          }
    }catch(error){
        return res.status(404).json({message: 'No se ha encontrado un pedido con ese código'});
    }
};



export const getOrderByEmail: RequestHandler = async (req, res) => {
    const email = req.params.email;
    try {
        const encontrado = await orderModel.findOne({correo: email});
        if (encontrado){
            return res.json(encontrado)
          } else {
            return res.status(204).json();
          }
    }catch(error){
        return res.status(404).json({message: 'Ese usuario no tiene pedidos'});
    }
};

export const getTotalUserOrderByEmail: RequestHandler = async (req, res) => {
    const email = req.params.email;
    try {
        const encontrado = await orderModel.find({correo: email});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay un usuario asociado a ese pedido'});
    }
};


export const getOrders: RequestHandler = async (req, res) => {
    try {
        const allP = await orderModel.find();
        return res.json(allP); 
    }catch(error){
        console.log(error);
    }
};


/************* CÁLCULO DE ENVÍOS CON SHIPPO *************/

export const getShippmentCost: RequestHandler = async (req, res) => {
    const addressTo = req.body;
    try{
      var costs = await ShipmentCosts(addressTo);
      return res.status(200).send({shippmentCost: costs});
    } catch (error){
      return res.status(404).json({message: 'Hubo un fallo procesando los costes'});
    }
}