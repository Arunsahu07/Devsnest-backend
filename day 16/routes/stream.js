const router = require("express").Router();
const fs = require("fs");
const path = require("path");
router.get('/',  (req,res)=>{
    res.status(200).send("welcome")
});
// module.exports = stream;
// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
