const mongoose = require('mongoose')


import { Product } from "../model/Product";

const OrderShema = new mongoose.Schema({  
    codigo: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    precioTotal: {
        type: Number,
        min: 0
    },
    products: {
        type: [Product],
        required: true
    }, 
    },
    { collection: 'Order' })

export const orderModel = mongoose.model('Order', OrderShema);
