var express = require("express");
// var router = express.Router();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Arun",
  port: 5432,
});



/* GET users listing. */


module.exports =  pool;
