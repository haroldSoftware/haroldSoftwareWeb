//==============================================================================

let express = require("express");
let database = require("./database.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let authRequired = require('./middleWare/authRequired');

//==============================================================================

let app = express();
app.use(express.json());
const PORT = 3300;

//==============================================================================

//==============================================================================
//::::::::::::::::::::::::::::::::::C=O=R=S:::::::::::::::::::::::::::::::::::::
//==============================================================================

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

//==============================================================================

//==============================================================================
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::ROUTES:::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//==============================================================================

//==============================================================================
//=================================HOME=========================================
//==============================================================================

app.get("/", (req, res) => {
  res.send(`Welcome to the home page`);
});

//==============================================================================

//==============================================================================
//==============================LOG_REG_PRO=====================================
//==============================================================================

app.post(`/login`, (req, res) => {
  const getUsername = `SELECT *, oid FROM register
    WHERE register.username = ?`;
  database.all(getUsername, [req.body.username], (error, foundUser) => {
    if (error) {
      console.error("Failed to get USERNAME: ", error);
      return res.sendStatus(500);
    }
    else {
      if (!foundUser || foundUser.length == 0) {
        return res.status(400).json({status: 400, message: "foundUser FAILED"});
      }
      bcrypt.compare(
        req.body.password,
        foundUser[0].password,
        (error, isMatch) => {
          if (error) {
            console.error("Mismatch @ bcrypt.compare", error);
            return res.sendStatus(500);
          }
          if (isMatch) {
            let user = {rowid: foundUser[0].rowid};
            console.log(foundUser);
            jwt.sign(
              user,
              "TomCruise",
              {expiresIn: "1h"},
              (errJwt, signedJwt) => {
                return res.status(200).json({
                  status: 200,
                  message: "Jwt Success",
                  rowid: foundUser[0].rowid,
                  signedJwt
                });
              }
            )
          } // end if (isMatch) @ line 62
          else {
            return res.status(400).json({
              status: 400,
              message: "Username or password is INCORRECT"
            });
          }
        }); // end bcrypt.compare @ line 54
    }
  });
});

//==============================================================================

app.post("/register", (req, res) => {
  const inputUsername = req.body.username;
  const inputPassword = req.body.password;
  const inputEmail = req.body.email;
  const checkIfExists = `SELECT username FROM register
    WHERE register.username = ?`;
  const addNewUser = `INSERT INTO register VALUES (?, ?, ?)`;

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        message: "Salt FAILED"
      });
    }
    bcrypt.hash(inputPassword, salt, (error, hashedPassword) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          message: "Hash FAILED"
        });
      }
      database.run(
        addNewUser,
        [inputUsername, hashedPassword, inputEmail],
        (error) => {
          if (error) {
            console.error("Add new user FAILED", error);
            return res.sendStatus(500).json({
              status: 500,
              message: error
            });
          }
          return res.status(201).json({
            status: 201,
            message: "success"
          });
      });
    });
  });
});

//==============================================================================

app.get("/profile", authRequired, (req, res) => {
  let userInfo = `SELECT username, email FROM register
    WHERE register.oid = ?`;
  database.all(userInfo, [req.userId], (error, results) => {
    if (error) {
      console.error("Username and Password FAILED", error);
      res.sendStatus(500);
    }
    else {
      console.log("Username and Password SUCCESS");
      res.status(200).json(results);
    }
  });
});

//==============================================================================

//==============================================================================
//==============================OBJECTS=========================================
//==============================================================================

// post and get objs here

//==============================================================================

//==============================================================================
//============================LISTEN_@_PORT=====================================
//==============================================================================

app.listen(PORT, () => {
  console.log(`App listening on port # ${PORT}`);
})

//==============================================================================
