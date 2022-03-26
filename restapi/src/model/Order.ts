const mongoose = require('mongoose')
const { model, Schema } = mongoose

export const OrderShema = new mongoose.Schema({

    // Habría que pasar de string a date en la fecha
    // Deberías cambiar el usuario a un object
    
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
    productos: [{
        id: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        cantidad: {
            type: Number,
            default: 1
        }
    }]},
    { collection: 'Order' })

export const Order = mongoose.model('Order', OrderShema, 'Order');
