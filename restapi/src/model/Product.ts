const mongoose = require('mongoose')
const { model, Schema } = mongoose

const IVA = 1.21; // Constante para almacenar el IVA de los productos

const ProductSchema = new mongoose.Schema({
    codigo: { 
        type: String, 
        required: true
    }, 
    categoria: { 
        type: String, 
        index: true, 
        required: true
    },
    nombre: { 
        type: String, 
        index: true,
        required: true
    }, 
    precio: { 
        type: Number, 
        index: true, 
        required: true
    },
    descripcion: { 
        type: String, 
        index: true
    }, 
    stock: { 
        type: Number, 
        index: true, 
        required: true
    }, 
    url: { 
        type: String, 
        index: true, 
        required: true
    },
    },
    {
        versionKey: false,
        timestamps: true,
    }, 
    { collection: 'Product' });

const Product = model("Product", ProductSchema);
module.exports = Product;