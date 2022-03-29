const mongoose = require('mongoose')
const {Product} = require("../model/Product").schema;


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
        required: true,
        min: 0
    },
    products: {
        type: [Product],
        required: true
    },
    
    },
    {
        versionKey: false,
        timestamps: true,
    },
    { collection: 'Order' })

export const Order = mongoose.model('Order', OrderShema);
