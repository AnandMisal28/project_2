const express = require('express');
const path = require('path');
const app = express();
const collection = require('./mongodb');

app.set("view engine","ejs");
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/",function(req,res){
    res.render("login.ejs");
})


app.get("/signup",function(req,res){
    res.render("signup.ejs");
})


app.post("/signup",async function(req,res){

    const data = {
        email:req.body.email,
        password:req.body.password
    }

    const existingUser = await  collection.findOne({email:data.email});

    if(existingUser){
        res.send("user already exist try another email");
    }
    else{
        const userData = await collection.insertMany(data);
        console.log(userData);
    }
});


app.post("/login",async function(req,res){
    try{
        const check = await collection.findOne({ email: req.body.email });
        if(!check){
            res.send("username does not found");
        }

        if(req.body.password === check.password){
            res.render("home.ejs");
        }
        else{
            res.send("wrong password");
        }
    }
    catch(err){
        res.send(err);
        console.log("error found");
    }
})

// app.post("/login",async function(req,res){

// })

app.listen(3000);

