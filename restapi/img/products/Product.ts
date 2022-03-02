const mongoose = require('mongoose')
const { model, Schema } = mongoose

const producto = new Schema ({
    codigo: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    }, 

    categoria: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },

    nombre: {
        type: String,
        required: true,
        trim: true
    }, 

    precio: {
        type: Number,
        required: true,
        trim: true
    }, 

    descripcion: {
        type: String,
        trim: true
    }, 

    stock: {
        type: Number,
        required: true,
        trim: true
    }
});

export  const products = model('Product', producto)