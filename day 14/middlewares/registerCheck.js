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
  const { email, name, password, confirmPassword } = req.body;
  if (
    typeof email === "string" &&
    typeof password === "string" &&
    typeof confirmPassword === "string" &&
    email.length > 0 &&
    name.length > 0 &&
    password.length > 7 &&
    password === confirmPassword &&
    emailValidation(email) &&
    passwordValidate(password)
  )
    next();
  else res.status(401).send("Initial check failed");
};

module.exports = registerInitialCheck;
