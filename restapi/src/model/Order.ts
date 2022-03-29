const mongoose = require('mongoose')
const { model, Schema } = mongoose

import { Product } from "../model/Product";


export const OrderShema = new mongoose.Schema({  
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
        required: true,
        min: 0
    },
    products: {
        type: [Product],
        required: true
    },
    },
    { collection: 'Order' })

export const Order = mongoose.model('Order', OrderShema, 'Order');
