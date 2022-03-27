const mongoose = require('mongoose')
const { model, Schema } = mongoose

export const ProductOrderSchema = new mongoose.Schema({
    id_product: {
        $ref: "Product",
        type: mongoose.Schema.ObjectId, 
        required: true
    },
    cantidad: {type: Number, index: true, required: true}, 
    id_order: {
        $ref: "Order",
        type: mongoose.Schema.ObjectId, 
        required: true
    },
    },{ collection: 'ProductOrder' });

export const ProductOrder = mongoose.model('ProductOrder', ProductOrderSchema, 'ProductOrder');