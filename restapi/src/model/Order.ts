const mongoose = require('mongoose')
const { model, Schema } = mongoose

export const OrderShema = new mongoose.Schema({

    // Habría que pasar de string a date en la fecha
    // Deberías cambiar el usuario a un object
    
    codigo: {
        type: String,
        required: true,
        immutable: true,
        unique: true
    },
    id_usuario: {
        type: String,
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
        type: Date,
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

export const Order = mongoose.model('Order', OrderShema, 'Order');
