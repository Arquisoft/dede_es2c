const mongoose = require('mongoose')
const { model, Schema } = mongoose

export const OrderShema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true,
        immutable: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true,
        lowercase: true
    },
    fecha: {
        type: String,
        immutable: true,
        lowercase: true
    },
    precioTotal: {
        type: Number,
        required: true,
        min: 0
    },
    productos: [{
        codigo_producto:{
            type: String,
            required: true,
            lowercase: true
        } ,
        cantidad: {
            type: Number,
            required: true,
            min: 0
        },
        precio:  {
            type: Number,
            required: true,
            min: 0
        },
    }]
    },
    { collection: 'Order' }) 

// Pare crear el modelo
export const Order = mongoose.model('Order', OrderShema, 'Order');
module.exports = Order;
