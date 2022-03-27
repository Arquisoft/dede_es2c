import { RequestHandler } from "express";
import{generateToken} from "../util/service";
import{verifyToken} from "../util/service";
const { response, request } = require('express')

const User = require('../model/user')

export const findUsers: RequestHandler = async (req, res) => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      res.json(error);
    }
};

export const findUsersById: RequestHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const userFound = await User.findOne({_id: id});
    return res.json(userFound)
  } catch (error) {
    return res.status(404).json({message: 'User not found'});
  }
};

export const isAdmin: RequestHandler = async (req, res) => {
  const token = req.params.token;
  if(token){
    try{
    const verify = verifyToken(token);
    console.log(verify)
    if(verify){
      const userFound = await User.findOne({_id: verify.id});
      console.log(userFound.role)
      return res.json(userFound.role)
    }
    }catch(err){
      return res.json("Se ha producido un error verificando el token")
    }
  }
};

export const findUsersByEmail: RequestHandler = async (req, res) => {
  const email = req.params.email;
  try {
    const userFound = await User.findOne({email: email});
    return res.json(userFound)
  } catch (error) {
    return res.status(404).json({message: 'User not found'});
  }
};

export const createUser = async (req = request, res = response) => {
  var bcrypt = require('bcrypt');
  try{
    if(checkBody(req.body)){
      const { password, ...body } = req.body
      const user = new User(body)
      const passwordHashed = await bcrypt.hash(password, 10);
      user.password = passwordHashed;
      await user.save();
      res.status(201).json({
          user
      })
  }
} catch(err) {
  console.log(err)
    res.status(400).json({msg: err})
}
};

function checkBody(body:any):boolean{
  const { name,surname,email,password,repPassword, } =body;
  return name != '' && surname != '' && email != '' && password != '' && password == repPassword;
}

export const loginUser: RequestHandler = async (req, res) => {
  var bcrypt = require('bcrypt');
  var emailReq = req.body.email;
  var password = req.body.password;
  try {
    const userFound = await User.findOne({email: emailReq});
    if(userFound){
      if(await bcrypt.compare(password,userFound.password)){
        const token = generateToken(userFound.id)
        res.status(201).json({
          token,
          userFound
        });
      }else{
        res.send("Password Incorrect");
      }
    }else{
      res.send("User not exist");
    }
    
  } catch (error) {
    console.log(error)
    return res.status(404).json({message: 'There was a problem logging a user'});
  }
  
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.send("User deleted")
  } catch (error) {
    return res.status(404).json({message: 'There was a problem deleting a user'});
  }
};

export const update: RequestHandler = async (req, res) => {
  var bcrypt = require('bcrypt');
  try {
    const { id } = req.params;
    const {_id, password,...params} = req.body
    if(password){
      params.password = await bcrypt.hash(password, 10);
    }
    await User.findByIdAndUpdate(id,params);
    return res.send("User updated")
  } catch (error) {
    console.log(error)
    return res.status(404).json({message: 'There was a problem updating a user'});
  }
};