const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const { email, password, name, username } = req.body;
  console.log("emai, pass, naem=",  email, password, name)
  try {
    const alreadyExists = await User.findOne({ where: { email } });
    console.log("checking of aldready exists", alreadyExists);
    if (alreadyExists) {
      res.status(400).json({status:"Oops! Email already exists"});
    } else {
      const token = jwt.sign(
        {
          email: email,
          password: password,
          role: "user"

        },
        "secretKey",{expiresIn: "8 hours"}
      )
      const salt = bcrypt.genSaltSync(10);
      console.log("salt=",salt)
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        name: name,
        email: email,
        password: hash,
        username: username,
        role: "user"

      });
      await newUser.save();
      res.header.token = token;
      res.status(201).json({status: "successfully registered", token: token});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({err:err,status: "unable to connect with database"});
  }
};

const adminRegister = async (req, res) => {
  const { email, password, name, username } = req.body;
  console.log("emai, pass, naem=",  email, password, name)
  try {
    const alreadyExists = await User.findOne({ where: { email } });
    console.log("checking of aldready exists", alreadyExists);
    if (alreadyExists) {
      res.status(400).json({status:"Oops! Email already exists"});
    } else {
       const  token = await jwt.sign(
        {
          email: email,
          password: password,
          role: "admin"

        },
        "secretKey",{expiresIn: "8 hours"}
      )
      const salt = bcrypt.genSaltSync(10);
      console.log("salt=",salt)
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        name: name,
        email: email,
        password: hash,
        username: username,
        role: "admin"

      });
      const savedUser = await newUser.save();
      res.header.token = token;
      res.status(201).json({status: "successfully registerd"});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({err:err,status: "unable to connect with database"});
  }
};



module.exports = {userRegister, adminRegister};
