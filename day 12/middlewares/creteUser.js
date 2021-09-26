const User = require("../model/user");
async function createUser (req, res){
    const {fullName, email, password} = req.params;
    try{
      

    const newUser = new User({email: email, fullName: fullName, password:password})
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
     }
     catch(err)
     {
         res.status(500).send("something went wrong");
     }
    
  
  }
  module.exports = createUser;