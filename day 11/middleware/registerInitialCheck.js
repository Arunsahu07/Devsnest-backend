const { passwordValidate, emailValidate} = require("../Utills/validate");
const registerInitialCheck = (req, res)=>{
    const {email, password, confirmPassword}  = req.body;
    if(typeof(email) === string && typeof(password)=== string && typeof(confirmPassword) === string
    
    && password === confirmPassword && emailValidate(email) && passwordValidate(password) )
      {
          next();
      }
    else{
        res.status(401).send("Invalid input")
    }

}

module.exports = registerInitialCheck;