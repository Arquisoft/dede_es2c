const mongoose = require('mongoose')
const { model, Schema } = mongoose

const UserSchema = new mongoose.Schema({
    name: { type: String, index: true, required: true },
    surname: { type: String, index: true,required: true },
    email: { type: String, index: true, required: true }
});

const User = mongoose.model('User',UserSchema);
module.exports.User = mongoose.model('User',UserSchema);