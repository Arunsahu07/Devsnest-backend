var { passwordValidate, emailValidation } = require("../utils/validation");
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description
 * email,password validate
 * password and confirm password validate
 */
const registerInitialCheck = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  console.log("body=", req.body);
  if (
    typeof email === "string" &&
    typeof password === "string" &&
    typeof confirmPassword === "string" &&
    email.length > 0 &&
    password.length > 7 &&
    password === confirmPassword &&
    emailValidation(email) &&
    passwordValidate(password)
  )
    next();
  else {
    console.log(typeof email === "string" ,
    typeof password === "string" ,
    typeof confirmPassword === "string" ,
    email.length > 0 ,
    password.length > 7 ,
    password === confirmPassword ,
    emailValidation(email) ,
    passwordValidate(password))
    console.log("initial check fails");
    res.status(400).json( {status : "Initial check fails"});


}


};

module.exports = registerInitialCheck;
