const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
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

const User = model('User',UserSchema,'User')

module.exports = User