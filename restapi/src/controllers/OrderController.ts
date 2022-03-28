import { RequestHandler } from "express";
import { Order } from "../model/Order";


/************* GENERAR DATOS *************/

export const generateExample: RequestHandler = async(req, res, next) => {
    // Haz aquí los cambios en vez de tener que meter manualmente los datos en mongoDB
    // Si quieres intorducir un nuevo pedido: cambia el código 
    try {

        let order = new Order();
        order.codigo = "orderOneExample";
        order.correo = "admin@uniovi.es";
        order.direccion = "dirExample";
        order.fecha = new Date();
        order.precioTotal = 139.99;
        order.productos = [{
            "codigo_producto" : "codigo1",
            "cantidad": 1
        }, {
            "codigo_producto" : "codigo2",
            "cantidad": 1
        }
    ];
        order.save();
        return res.json(order);
    } catch (error){
        console.log(error);
    }

}

/************* POST *************/

export const addOrderURL: RequestHandler = async(req, res, next) => {
    try {
        const codigo = req.params.codigo;
        const correo = req.params.correo;
        const fecha = req.params.fecha;
        const direccion = req.params.direccion;
        const precioTotal = req.params.precioTotal;
        const productos = req.params.productos;
        const order = new Order({codigo: codigo, correo: correo, direccion: direccion, fecha: fecha,
                                    precioTotal: precioTotal, productos: productos});
        order.save();
    } catch (error){
        console.log(error);
    }
}

export const addOrderForm: RequestHandler = async(req, res, next) => {
    try {
        const codigo = req.body.codigo;
        const correo = req.body.correo;
        const fecha = req.body.fecha;
        const direccion = req.body.direccion;
        const precioTotal = req.body.precioTotal;
        const productos = req.body.productos;
        const order = new Order({codigo: codigo, correo: correo, direccion: direccion, fecha: fecha,
                                    precioTotal: precioTotal, productos: productos});
        order.save();
    } catch (error){
        console.log(error);
    }
}

export const deleteOrderURL: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      await Order.findByIdAndDelete(id);
      return res.send("Order deleted")
    } catch (error) {
      return res.status(404).json({message: 'There was a problem deleting a order'});
    }
};

export const deleteOrderForm: RequestHandler = async (req, res) => {
    try {
      const { id } = req.body;
      await Order.findByIdAndDelete(id);
      return res.send("Order deleted")
    } catch (error) {
      return res.status(404).json({message: 'There was a problem deleting a order'});
    }
};


export const updateOrderURL: RequestHandler = async (req, res) => {
    // Se pueden actualizar tanto el correo como la direccion
    try {
      const { id } = req.params;
      const {_id, ...params} = req.params
      await Order.findByIdAndUpdate(id, params);
      return res.send("Order updated")
    } catch (error) {
      console.log(error)
      return res.status(404).json({message: 'There was a problem updating a order'});
    }
  };

  export const updateOrderPOST: RequestHandler = async (req, res) => {
    // Se pueden actualizar tanto el correo como la direccion
    try {
      const { id } = req.body;
      const {_id, ...body} = req.body
      await Order.findByIdAndUpdate(id, body);
      return res.send("Order updated")
    } catch (error) {
      console.log(error)
      return res.status(404).json({message: 'There was a problem updating a order'});
    }
  };



/************* GET *************/


 export const getOrderByCode: RequestHandler = async (req, res) => {
    const cod = req.params.codigo;
    try {
        const encontrado = await Order.findOne({codigo: cod});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json();
    }
}


 export const getOrderByID: RequestHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const encontrado = await Order.findOne({_id: id});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay pedido con ese ID'});
    }
}

 export const getOrderByPrice: RequestHandler = async (req, res) => {
    const price = req.params.price;
    try {
        const encontrado = await Order.findOne({precioTotal: price});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay pedido con ese precio'});
    }
}

 export const getOrderByDirection: RequestHandler = async (req, res) => {
    const dir = req.params.dir;
    try {
        const encontrado = await Order.findOne({direccion: dir});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay pedido con esa direccion'});
    }
}

 export const getOrderByEmail: RequestHandler = async (req, res) => {
    const email = req.params.email;
    try {
        const encontrado = await Order.findOne({correo: email});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay un usuario asociado a ese pedido'});
    }
}

 export const getOrderByDate: RequestHandler = async (req, res) => {
    const date = req.params.date;
    try {
        const encontrado = await Order.findOne({fecha: date});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay pedido con esa fecha'});
    }
}

 export const getOrders: RequestHandler = async (req, res) => {
    try {
        const allP = await Order.find();
        return res.json(allP); 
    }catch(error){
        console.log(error);
    }
}
