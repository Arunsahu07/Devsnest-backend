const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "Arun", {
  host: "localhost",
  dialect: "postgres",
});
sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("connection established with db");
  } catch (error) {
    console.error("unable to connect to db");
  }
})();

module.exports = sequelize;
