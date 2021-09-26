const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(
    "postgres",
    "postgres",
    "Arun",
    {
        host: "localhost",
        dialect: "postgres"
    }
)
sequelize.sync();

(async ()=>{
    try{
        await sequelize.authenticate();
        console.log("connected to database");}

    catch(err)
{
    console.log("unable to connect with db");
}    }
)();
module.exports = sequelize;