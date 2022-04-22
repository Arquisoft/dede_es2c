import { RequestHandler } from "express";
import{generateToken} from "../util/service";
import{verifyToken} from "../util/service";
const { response, request } = require('express')
import {check} from 'express-validator';
import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
} from "@inrupt/solid-client";
import { VCARD } from "@inrupt/vocab-common-rdf";
import { User } from "../model/User";

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

export const findUsersByEmail: RequestHandler = async (req, res) => {
  const email = req.params.email;
  const userFound = await User.findOne({email: email});
  if (userFound){
    return res.json(userFound)
  } else {
    return res.status(412).json();
  }
};

export const createUser = async (req = request, res = response) => {
  var bcrypt = require('bcrypt');
  try{
    if(checkBody(req.body)){
        const { password, ...body } = req.body
        const user = new User(body)
        const passwordHashed = await bcrypt.hash(password.toString(), 10);
        user.password = passwordHashed;
        await user.save();
        res.status(201).json({
           user
        })
      
  }
} catch(err) {
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
        const token = generateToken(userFound.id,userFound.role)
        return res.status(201).json({
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

export const deleteUserByEmail: RequestHandler = async (req, res) => {
  try {
    const { email } = req.params;
    await User.deleteOne({email: email});
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
    await User.updateOne({_id: id},params);
    return res.send("User updated")
  } catch (error) {
    console.log(error)
    return res.status(404).json({message: 'There was a problem updating a user'});
  }
};

export const giveAdminRole: RequestHandler = async (req, res) => {
  try {
    const {_id, token,...params} = req.body
    const tokenVerified = verifyToken(token)
    if(tokenVerified.role != "ROLE_ADMIN"){
      return res.status(404).json("El usuario loggeado no es admin")
    }
    const user = await User.findOne({ _id: _id });
    if(user){
      const update = {role: "ROLE_ADMIN"}
      await user.updateOne(update);
      return res.status(201).send("User updated")
    }else{
      return res.status(404).json("El usuario a cambiar el rol no existe")
    }
  } catch (error) {
    console.log(error)
    return res.status(404).json({message: 'Hubo un problema cambiando el rol al usuario'});
  }
};

export const getUserPOD: RequestHandler = async (req, res) => {
  try {
    const name = req.params.name;
    const url = "https://" + name  + ".inrupt.net/profile/card";
    const profile = await getSolidDataset(
      url, {
      fetch: fetch
    });
    const profileCard = getThing(profile, url + "#me")
    const address = profileCard!.predicates["http://www.w3.org/2006/vcard/ns#hasAddress"]["namedNodes"]
    const idAddress = address![0].split('#')[1]
    if (idAddress == null){
      return res.status(404).json({message: "No existe la dirección"});
    }
    const podAddress = getThing(profile, "https://" + name + ".inrupt.net/profile/card#" + idAddress);
    const streetAddress = getStringNoLocale(podAddress!, VCARD.street_address);
    const locality = getStringNoLocale(podAddress!, VCARD.locality);
    const postalCode = getStringNoLocale(podAddress!, VCARD.postal_code);
    const region = getStringNoLocale(podAddress!, VCARD.region);
    const country = getStringNoLocale(podAddress!, VCARD.country_name);
    const result = [streetAddress,locality,postalCode,region,country]
    if(!result.every(field => {return field != null})){
      return res.status(404).json({message: 'POD incompleto, faltan campos'});
    }
    return res.status(200).json(
      {street_address: result[0],
        locality: result[1],
        postalCode: result[2],
        region: result[3],
        country: result[4],
      }) 
  } catch (error) {
    return res.status(412).json({message: 'No se ha encontrado el POD con ese nombre'});
  }
};