var express = require("express");
const {userRegister, adminRegister} = require("../controllers/register");
var router = express.Router();
const registerInitialCheck = require("../middlewares/registerCheck");
const {loginUser, loginAdmin} = require("../controllers/login");
const product = require('../controllers/product');
// const loginAdmin = require("./users");
/* GET home page. */ 
router.get("/", function (req, res) {
  const sess = req.session;
  sess.username = "DaddyIsHere";
  res.render("index", { title: "Express" });
});
  
router.get("/red", function (req, res, next) {
  console.log("redis value", req.session.username);
  res.send(req.session.username);
});
/**
 * @requires-> {email, name, password, confirmPassword}
 * @desciption
 * Security, Edge cases, and performance
 * validation -> email, password
 *s
 */
console.log("func check", loginUser,loginAdmin);
router.post("/register-user", registerInitialCheck, userRegister);
router.post("/register-admin", registerInitialCheck, adminRegister)
router.post("/login-user", loginUser)
router.post("/login-admin", loginAdmin)
router.get("/product/:page", product )
module.exports = router;
