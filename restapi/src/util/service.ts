import { ObjectId } from "mongodb";
require('dotenv').config();
const jwt = require ('jsonwebtoken')

export const generateToken = (id : ObjectId,role:string) => {
    return jwt.sign( { id,role }, process.env.JWT_TOKEN, {
        expiresIn: "15m"
    })
};

export const verifyToken = (token:string) =>{
    const verify = jwt.verify(token,process.env.JWT_TOKEN);
    return verify;
}

export const auth = (req:any,res:any,next:any) => {
    try{
        const token = req.header("x-auth-token");
        if(!token){
            return res.status(401).json({
                msg:"Authorization denied"
            });
        }
        const verify = jwt.verify(token,process.env.JWT_TOKEN);
        if(!verify){
            return res.status(401).json({
                msg:"Authorization denied"
            });
        }
        req.user = verify.id;
        next();
    }catch (err){
        res.status(500).json(err);
    }
}