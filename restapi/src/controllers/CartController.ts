import { RequestHandler } from "express";
import { ObjectId } from "mongodb";
const { response, request } = require('express')
import { Cart } from "../model/Cart";
import { User } from "../model/User";
import { Product } from "../model/Product";

export const createCart = async (req = request, res = response) => {
    try{
        const { client_id} = req.body
        if(await checkClient(client_id)){
            if(await checkCart(client_id)){
                const cart = new Cart();
                cart.client_id = client_id;
                cart.products = [];
                await cart.save();
                return res.status(201).json({
                    cart
                })
            }else{
                return res.status(400).json({message: 'The cart already exists'});
            }
        }else{
            return res.status(404).json({message: 'User not found'});
        }
    }catch(error){
        return res.status(400).json({msg: error})
    }
};

export const addProduct = async (req = request, res = response) => {
    try{
        const { client_id,product} = req.body
        var cart = await Cart.findOne({client_id:client_id.toString()})
        if(cart.products.length > 0){
            for (let index = 0; index < cart.products.length; index++) {
                if(cart.products[index].product.codigo === product.codigo){
                    cart.products[index].quantity += 1;
                    await Cart.updateOne({client_id: client_id.toString()},cart)
                    return res.status(200).json({cart})
                }
            }
            let newProduct = {
                product: product,
                quantity:1
            }
            cart.products.push(newProduct);
            await Cart.updateOne({client_id: client_id.toString()},cart)
            return res.status(200).json({cart})
        }else{
            let products = [
                {
                  product: product,
                  quantity:1
                },
              ]
              await Cart.updateOne({client_id: client_id.toString()},{$push: {products: products}});
              return res.status(200).json({products})
        }
    }catch(error){
        return res.status(400).json({msg: error})
    }
};

export const deleteProduct = async (req = request, res = response) => {
    try{
        const { client_id,product} = req.body
        var cart = await Cart.findOne({client_id:client_id.toString()})
        if(cart.products.length > 0){
            for (let index = 0; index < cart.products.length; index++) {
                if(cart.products[index].product.codigo === product.codigo){
                    cart.products[index].quantity -= 1;
                    if(cart.products[index].quantity > 0){
                        await Cart.updateOne({client_id: client_id.toString()},cart)
                        return res.status(200).json({cart})
                    }else{
                        cart.products.splice(index,1)
                        await Cart.updateOne({client_id: client_id.toString()},cart)
                        return res.status(200).json({cart})
                    }
                }
            }
        }
        return res.status(200).json({msg: "The cart was empty"})
    }catch(error){
        return res.status(400).json({msg: error})
    }
};

export const findByClientId = async (req = request, res = response) => {
    try{
        const client_id = req.params.client_id
        var cart = await Cart.findOne({client_id:client_id.toString()})
        if(cart){
            return res.status(200).json(cart)
        }
        return res.status(404).json({msg: "Cart not found"})
    }catch(error){
        return res.status(404).json({msg: "Cart not found"})
    }
};

async function checkClient(client_id: ObjectId):Promise<boolean>{
    if(client_id){
        const userFound =  await User.findOne({_id: client_id});
        if(userFound){
            return true;
        }
        return false;
    }
    return false;
}
async function checkCart(client_id: ObjectId):Promise<boolean> {
    if(client_id){
        const cartFound =  await Cart.findOne({client_id: client_id.toString()});
        if(cartFound){
            return false;
        }else{
            return true;
        }
    }
    return false;
}

