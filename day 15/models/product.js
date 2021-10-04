const sequelize = require("../database/index");
const {DataTypes} = require("sequelize");
const product = sequelize.define("product", {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    price:{
        allowNull: false,
        type: DataTypes.INTEGER,

    },
    url:{
        type: DataTypes.STRING,
        allowNull: false
    }
} );
module.exports = product;
