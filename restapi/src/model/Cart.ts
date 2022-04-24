const mongoose = require('mongoose')

import { ObjectId } from "mongodb";
import { Product } from "../model/Product";

const CartSchema = new mongoose.Schema({
    client_id: {
        type: ObjectId,
        required: true,
    },
    products: {
        type: [Product],
        required: true
    }, 
    },
    { collection: 'Cart' })
    
export const Cart = mongoose.model('Cart', CartSchema);