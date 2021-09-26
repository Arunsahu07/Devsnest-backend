const User = require("../model/user")
const emailCheck = async(req, res, next)=>{
    const {email} = req.params;
    console.log(req.params);
    try{
        const alreadyExists = await User.findOne( {where: {email: email}})
        console.log("alredd",alreadyExists);
        if(alreadyExists)
        res.status(200).send("email already registered");
        else
         next();     
    }
    catch(err)
    {
        res.status(500).send(err);
    }
}
module.exports = emailCheck;