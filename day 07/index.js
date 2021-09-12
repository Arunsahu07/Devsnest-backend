const express = require("express");
const app = express();
app.listen(8080);
app.get('/',(req, res)=>{
    res.status(200).send("arun is here");
})
app.get("/ab+cd",(req,res)=>{      //b is optional 
    res.send("In this route b is optional")
})
// ab+cd =>  . B can come any no of time exp (abcd abbbcd abbbbbcd) but this (abd) is an invalid route
// ab*cd => . Anythink can come in between ab and cd exp (ab___cd)

// if you want to take parameters from user in post request there two ways to do this.
//  app.get("/user/:userName/books/:BookId")
// in above route  userName and booiId are the parameter that will receive in opject called
// req.params
// this this case req.params = {userName : value provide by the time making request,
//                              bookId : value provide by the time making request } 

//another way of taking parameters if called req. query
// app.get("/route?nameOfParameter=value&anotherParameter=value")
// In this case:   req.query = {nameOfParameter : value,
//                               anotherParameter : value} 



