var express = require("express");
const register = require("../controllers/register");
var router = express.Router();
const registerInitialCheck = require("../middlewares/registerCheck");
/* GET home page. */
router.get("/", function (req, res, next) {
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
 *
 */
router.post("/register", registerInitialCheck, register);
module.exports = router;
