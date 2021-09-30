const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const alreadyExists = await User.findOne({ where: { email } });
    console.log("checking of aldready exists", alreadyExists);
    if (alreadyExists) {
      res.status(401).send("Oops! Email already exists");
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        name: name,
        email: email,
        password: hash,
      });
      const savedUser = await newUser.save();
      res.status(201).send(savedUser);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("something went wrong");
  }
};

module.exports = register;
