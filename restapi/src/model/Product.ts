const mongoose = require('mongoose')
const { model, Schema } = mongoose

export const ProductSchema = new mongoose.Schema({
    codigo: { type: String, index: true, required: true}, 
    categoria: { type: String, index: true, required: true},
    nombre: { type: String, index: true, required: true}, 
    precio: { type: Number, index: true, required: true}, 
    descripcion: { type: String, index: true}, 
    stock: { type: Number, index: true, required: true}, 
    url: { type: String, index: true, required: true},
    }, 
    { collection: 'Product' });

export const Product = mongoose.model('Product', ProductSchema, 'Product');