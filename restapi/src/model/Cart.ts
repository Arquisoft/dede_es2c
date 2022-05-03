const mongoose = require('mongoose')

import { ObjectId } from "mongodb";
import { Product } from "../model/Product";

const CartSchema = new mongoose.Schema({
    client_id: {
        type: ObjectId,
        required: true,
    },
    products: [
        {
          product: {
            type: Product
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
    { collection: 'Cart' })
    


export const Cart = mongoose.model('Cart', CartSchema);