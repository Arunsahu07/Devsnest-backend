const express = require("express");
const path = require("path")
const user = require("./files/routes/index")
const app = express()
app.get('/' , (req,res)=>{
    res.send(path.join(__dirname, 'files/greeting.html'))
    res.status(200)
})
app.get("/user/:id", user);
app.listen(5000);