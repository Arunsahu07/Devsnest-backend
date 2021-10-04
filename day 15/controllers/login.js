const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { pool } = require("../routes/users");
const loginUser = async (req, res) => {
  const { password, email } = req.body;
  var token = req.headers.authorization.split(" ")[1];
  if (token) {
    console.log("token = ", token);
    const decreptedData = jwt.verify(String(token), "secretKey");
    console.log("decreptedData", decreptedData);
    // console.log("token",myHeaders,"data",jwt.verify(String(myHeaders),"secretKey"  ) );
    if (decreptedData.email === email && decreptedData.password === password && decreptedData.role ==="user" ) {
      res.status(200).json({ status: "User Authorized",success: true, token:token });
    }
  }
  
  
  
   
    pool.query(
      'select * from "Users" where email = $1 ;',
      [email],
      async (err, result) => {
        if (err) {
          throw { err };
        }
      else if ( result.rows.length ===0){
        // { console.log("column = ",result.rows);
          res.status(400).json({status: "email does not exists", success: false});
        }
        var userExists = false;
        try {
          await bcrypt
            .compare(password, result.rows[0].password)
            .then((IsAuthorized) => {
              console.log("campare", IsAuthorized);
              userExists = IsAuthorized;
            });
        } catch (err) {
          console.log("compate err=", err);
          res.status(500).json({ status: "something went wrong", err: err, status: false });
        }

        if (userExists) {
          if (result.rows[0].role !== "user")
            res.status(200).json({ status: "please login from right portal", success: false });
          else {
            console.log(result.rows);
            await res.status(200).json({
              token: jwt.sign(
                {
                  email: email,
                  password: password,
                },
                "secretKey",
                { expiresIn: "8 hours" }
              ),
              status: "User Authenicated", success: true,
            });
          }
        } else {
          res.status(400).json({ status: "Invalid credentials", success: false });
        }
      }
    );
  
  // {
  // res.status(400).json({status: "Invalid credentials"});
  // }
  // console.log( `SELECT * FROM  "Users" WHERE  ${username =  username} ;`);
};

const loginAdmin = async (req, res) => {
  const { password, email } = req.body;
  var token = req.headers.authorization.split(" ")[1];
  if (token) {
    console.log("token = ", token);
    const decreptedData = jwt.verify(String(token), "secretKey");
    console.log("decreptedData", decreptedData);
    // console.log("token",myHeaders,"data",jwt.verify(String(myHeaders),"secretKey"  ) );
    if (decreptedData.email === email && decreptedData.password === password && decreptedData.role === "admin") {
      res.status(200).json({ status: "User Authorized", success: true, token: token });
    }
  }
  
  
  
   
    pool.query(
      'select * from "Users" where email = $1 ;',
      [email],
      async (err, result) => {
        if (err) {
          throw { err };
        }
      else if ( result.rows.length ===0){
        // { console.log("column = ",result.rows);
          res.status(400).json({status: "email does not exists", success: false});
        }
        var userExists = false;
        try {
          await bcrypt
            .compare(password, result.rows[0].password)
            .then((IsAuthorized) => {
              console.log("campare", IsAuthorized);
              userExists = IsAuthorized;
            });
        } catch (err) {
          console.log("compate err=", err);
          res.status(500).json({ status: "something went wrong", err: err,success:false });
        }

        if (userExists) {
          if (result.rows[0].role !== "admin")
            res.status(200).json({ status: "please login from right portal", success: false });
          else {
            console.log(result.rows);
            await res.status(200).json({
              token: jwt.sign(
                {
                  email: email,
                  password: password,
                },
                "secretKey",
                { expiresIn: "8 hours" }
              ),
              status: "User Authenicated",
             success: true});
          }
        } else {
          res.status(400).json({ status: "Invalid credentials" });
        }
      }
    );
  
  // {
  // res.status(400).json({status: "Invalid credentials"});
  // }
  // console.log( `SELECT * FROM  "Users" WHERE  ${username =  username} ;`);
};

module.exports = { loginAdmin, loginUser };
