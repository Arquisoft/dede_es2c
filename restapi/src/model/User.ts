const mongo = require('mongoose')

const UserSchema = new mongo.Schema({
    name: { 
        type: String, required: true 
    },
    surname: { 
        type: String, required: true 
    },
    email: { 
        type: String, required: true, unique: true
    },
    password: { 
        type: String, required: true 
    }
    },
    {collection:'User'});

const User = mongo.model('User',UserSchema,'User')

module.exports = User
