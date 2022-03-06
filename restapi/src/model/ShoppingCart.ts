const mongoose = require('mongoose')
const { model, Schema } = mongoose

export const ShoppingCartSchema = new mongoose.Schema({
    precio: { type: Number, index: true, required: true}, 
    productos: [    
                    { type: String, require: true},
                    { type: Number, require: true}
                ],
    }, 
    { collection: 'ShoppingCart' });

export const ShoppingCart = mongoose.model('ShoppingCart', ShoppingCartSchema, 'ShoppingCart');