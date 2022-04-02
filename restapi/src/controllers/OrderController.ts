import { RequestHandler } from "express";
import { orderModel } from "../model/Order";
import { Product, productModel } from "../model/Product";




/************* CREAR UN PEDIDO *************/

export const addOrder: RequestHandler = async (req, res) => {

   
    // Hay que actualizar el stock

    const updateStock = async (products: any) => {
      for (var i = 0; i < products.length; i++) {
        let product = await productModel.findOne({ codigo: products[i].codigo });
        product.stock = product.stock - products[i].stock;
        product.save();
      }
    };
    
    try {
        const order = new orderModel(req.body);
        updateStock(order.products);
        const orderToSave = await order.save();
        res.json(orderToSave);
    } catch (error) {
        console.log(error);
        res.status(412).json();
    }
};

/************* GENERAR UN EJEMPLO *************/

export const generateExample: RequestHandler = async(req, res, next) => {
    try {
        let order = new orderModel();
        order.codigo = "orderTwoExample";
        order.correo = "admin@uniovi.es";
        order.direccion = "dirExample";
        order.fecha = new Date();
        order.precioTotal = 139.99;

        var productA = new productModel (
            {
                codigo: "TE01", 
                categoria: "teclado", 
                nombre: "Logitech K120 Teclado con Cable",
                precio: 9.57, 
                descripcion: "Para Windows, Tamaño Normal, Resistante a Líquido, Barra Espaciadora Curvada, PC/Portátil, Disposición QWERTY Español, color Negro ",
                stock: 100,
                url: "https://i.postimg.cc/25fVD0hz/TE01.jpg"
            }
        );

        var productB = new productModel (
            {
                codigo: "RA01", 
                categoria: "raton", 
                nombre: "Logitech Ratón Inalámbrico M190",
                precio: 15.99, 
                descripcion: "Diseño Curvo Ambidiestro, Batería 18 Meses con Modo Ahorro, Receptor USB, Cursor y Desplazamiento Preciso, Rueda de Desplazamiento Amplio, Negro",
                stock: 50,
                url: "https://i.postimg.cc/RVyWPS0J/RA01.jpg"
            }
        )

        var productos = [productA, productB];

        order.products = productos;
        order.save();
        return res.json(order);
    } catch (error){
        console.log(error)
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


// MÉTODOS QUE COMO DE MOMENTO NO USO Y ME PIDEN COBERTURA DE CÓDIGO DEJO COMENTADOS


/** 
export const addOrderURL: RequestHandler = async(req, res, next) => {
    try {
        if (checkParams(req.params)){
            const orderEncontrada = await Order.findOne({codigo: req.params.codigo});
            if (orderEncontrada == null){
                const codigo = req.params.codigo;
                const correo = req.params.correo;
                const fecha = req.params.fecha;
                const direccion = req.params.direccion;
                const precioTotal = req.params.precioTotal;
                const productos = req.params.productos;
                const order = new Order({codigo: codigo, correo: correo, direccion: direccion, fecha: fecha,
                                        precioTotal: precioTotal, productos: productos});
                await order.save();
                return res.send("New order OK")
            } else {
                return res.send("There was a problem adding an order")
            }
        }
    } catch (error){
        console.log(error);
    }
}

export const addOrderForm: RequestHandler = async(req, res, next) => {
    try {
        if (checkParams(req.body)){
            const orderEncontrada = await Order.findOne({codigo: req.body.codigo});
            if (orderEncontrada == null){
                const codigo = req.body.codigo;
                const correo = req.body.correo;
                const fecha = req.body.fecha;
                const direccion = req.body.direccion;
                const precioTotal = req.body.precioTotal;
                const productos = req.body.productos;
                const order = new Order({codigo: codigo, correo: correo, direccion: direccion, fecha: fecha,
                                        precioTotal: precioTotal, productos: productos});
                await order.save();
                return res.send("New order OK")
            } else {
                return res.send("There was a problem adding an order")
            }
        }
    } catch (error){
        console.log(error);
    }
}

export const deleteOrderURL: RequestHandler = async (req, res) => {
    try {
        const {codigo} = req.params;
        await Order.deleteOne({codigo: codigo});
        return res.send("Order deleted")
    } catch (error) {
        return res.status(404).json({message: 'There was a problem deleting a order'});
    }
};

export const deleteOrderForm: RequestHandler = async (req, res) => {
    try {
        const {codigo} = req.body;
        await Order.deleteOne({codigo: codigo});
        return res.send("Order deleted")
    } catch (error) {
      return res.status(404).json({message: 'There was a problem deleting a order'});
    }
};


export const updateOrderURL: RequestHandler = async (req, res) => {
    // Se pueden actualizar tanto el correo como la direccion
    try {
        const codigo  = req.params.codigo;
        const {...params} = req.params;
        await Order.findOneAndUpdate({codigo: codigo}, params); 
        return res.send("Order updated")
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: 'There was a problem updating a order'});
    }
  };

  export const updateOrderPOST: RequestHandler = async (req, res) => {
    // Se pueden actualizar tanto el correo como la direccion
    try {
        const codigo  = req.body.codigo;
        const {...body} = req.body;
        await Order.findOneAndUpdate({codigo: codigo}, body); 
        return res.send("Order updated")
    } catch (error) {
        console.log(error)
        return res.status(404).json({message: 'There was a problem updating a order'});
    }
  };



  
function checkParams(body: any): boolean{
    const {codigo, correo, direccion, fecha, precioTotal} = body;
    return codigo != null && codigo != '' && correo != null && correo != '' && 
    direccion != null && direccion != '' && fecha != null && precioTotal > 0
}

**/


/**

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


 export const getOrderByDate: RequestHandler = async (req, res) => {
    const date = req.params.date;
    try {
        const encontrado = await Order.findOne({fecha: date});
        return res.json(encontrado)
    }catch(error){
        return res.status(404).json({message: 'No hay pedido con esa fecha'});
    }
}


 **/