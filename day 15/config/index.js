require("dotenv").config();

module.exports = {
  app_port: process.env.PORT,
  secret: process.env.SECRET,
};
