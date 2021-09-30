const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
const { secret } = require("../config");

/**
 * @description to register (admin, user)
 */
const userRegister = async (userData, role, res) => {
  try {
    let usernameNotTaken = await validateUsername(userData.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: "Username is already taken.",
        success: false,
      });
    }
    let emailNotRegistered = await validateEmail(userData.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: "Email is already registered.",
        success: false,
      });
    }
    // get the hasded password
    const password = await bcrypt.hash(userData.password, 12);
    // create new user
    const newUser = new User({
      ...userData,
      password,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      message: "You are successfully registered",
      success: true,
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create your account",
      success: false,
      error: err,
    });
  }
};

/**
 * @description
 * to login the user, role=> [ user , admin]
 */

const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;

  //check if user is in the database
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({
      message: " Username not found. Invalid user credentials.",
      success: false,
    });
  }
  // check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging from right portal.",
      success: false,
    });
  }

  //checking the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      secret,
      {
        expiresIn: "15 days",
      }
    );
    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };
    return res.status(200).json({
      ...result,
      message: "You are now logged in.",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password",
      success: false,
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ where: { username } });
  return !user;
};
const validateEmail = async (email) => {
  let user = await User.findOne({ where: { email } });
  return !user;
};

/**
 * @description Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @description Check role middleware
 */
const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user.id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

module.exports = {
  userAuth,
  checkRole,
  userLogin,
  userRegister,
  serializeUser,
};
