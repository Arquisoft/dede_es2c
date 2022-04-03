const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    surname: { 
        type: String, required: true 
    },
    email: { 
        type: String, required: true, unique: true
    },
    role: { 
        type: String, required: true
    },
    password: { 
        type: String, required: true 
    }
    },
    {collection:'User'});

export const User = mongoose.model('User',UserSchema,'User')

