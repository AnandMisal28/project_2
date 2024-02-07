

const mongoose = require('mongoose');

const connect = mongoose.connect("mongodb://localhost:27017/signupdb");

const  userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const collection = mongoose.model("usercollection",userSchema);

module.exports = collection;