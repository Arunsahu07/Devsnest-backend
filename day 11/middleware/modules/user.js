const {DataType}  = require("sequelize");
const Sequelize  = require('../database/');
const user = Sequelize.define("User", 
{
    fullname :{
        type : "Database",
        type : string,
        allowNull : false},
        email :{
            allowNull : false },

        password : {      
        type : string,
        allowNull : false}
}
)
module.exports = user;