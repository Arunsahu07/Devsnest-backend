const User = require("../modules/user");
const register = async (req, res) =>

{
  const {email, password, confirmPassword} = req.body ;
  try {
     if ( await User.findOne({where : {email}}))
     res.status(401).send("Email already exists");
  }
  catch(err)
  {
      console.error(err);
  }

}

module.exports = register;