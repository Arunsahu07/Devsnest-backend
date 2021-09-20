const sequelize = require("sequelize");
const Sequelize = new sequelize(
    "user",
    "Arun",
    "87654321",
    {
        host : 'localhost',
        dialect : "postgres",
    }
);
  Sequelize.sync();
  ( async () =>{
      try
      {
          await Sequelize.authenticate();
          console.log("connection established");
      }
      catch(err)
      {
          console.error("conntection failed");
      }
  } )
  ()
  module.exports = Sequelize;