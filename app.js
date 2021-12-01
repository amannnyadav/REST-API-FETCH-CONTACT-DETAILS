const bodyparser= require("body-parser");
const express=require("express");
const Mongoose = require("mongoose");
const app=express();

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");

Mongoose.connect("mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.1dwcv.mongodb.net/contactdetails");


const contactdetailsSchema = {
    name:String,
    phoneNo:String,
    email:String,
    portfolio:String
};

const contactdetails = Mongoose.model('contactdetails',contactdetailsSchema);

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});    

app.post("/",function(req,res){
    let newcontactdetails = new contactdetails({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        portfolio: req.body.portfolio
    });
    newcontactdetails.save();
    res.redirect("/");
});


app.listen("7000",function(){
    console.log("server started on port 7000");
});

