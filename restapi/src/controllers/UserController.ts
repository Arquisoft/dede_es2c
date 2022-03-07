import {User} from "../model/User";
import { RequestHandler } from "express";
import { randomUUID } from "crypto";

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

export const createUser: RequestHandler = async (req, res) => {
  var bcrypt = require('bcrypt');
  var salt = 12;
  const newUser = new User();
  newUser._id = randomUUID();
  newUser.name = req.body.name;
  newUser.surname = req.body.surname;
  newUser.email = req.body.email;
  var password = req.body.password;
  try {
    const hashedpassword = await bcrypt.hash(password,salt);
    newUser.password = hashedpassword;
    await User.save(newUser);
    return res.send("User saved")
  } catch (error) {
    return res.status(404).json({message: 'There was a problem creating a user'});
  }
  
};

export const loginUser: RequestHandler = async (req, res) => {
  var bcrypt = require('bcrypt');
  var salt = 12;
  var emailReq = req.body.email;
  var password = req.body.password;
  try {
    const userFound = await User.findOne({email: emailReq});
    if(await bcrypt.compare(password,userFound.password)){
      return res.send("User logged");
    }else{
      res.send("Password Incorrect");
    }
  } catch (error) {
    return res.status(404).json({message: 'There was a problem logging a user'});
  }
  
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.id);
    return res.send("User deleted")
  } catch (error) {
    return res.status(404).json({message: 'There was a problem deleting a user'});
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.id,{name:req.body.name,surname:req.body.surname,email:req.body.email});
    return res.send("User updated")
  } catch (error) {
    return res.status(404).json({message: 'There was a problem updating a user'});
  }
};