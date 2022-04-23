import { RequestHandler } from "express";
import { ObjectId } from "mongodb";
const { response, request } = require('express')
import { Cart } from "../model/Cart";
import { User } from "../model/User";

export const createCart = async (req = request, res = response) => {
    try{
        const { client_id, ...body } = req.body
        if(await checkClient(client_id)){
            const cart = new Cart(client_id,new Object())
            await cart.save();
            res.status(201).json({
                cart
             })
        }else{
            return res.status(404).json({message: 'User not found'});
        }
    }catch(error){
        res.status(400).json({msg: error})
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
