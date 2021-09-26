const User = require("../model/user");
const get = async  (req, res)=>{
    try{
        const result = await User.findOne( {where: {email: req.params.email}} );
        if(result !== {})
            res.status(200).send("result");
        else
        res.status(200).send("User Does not exists")
    }
    catch(err){
        res.status(500).send("something went wrong");
    }
    
}
module.exports = get;