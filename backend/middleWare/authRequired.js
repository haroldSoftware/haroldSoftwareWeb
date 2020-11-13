const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("Token validation in authRequired");
  let bearerHeader = req.headers["authorization"];
  console.log("Triggered a token check", bearerHeader);

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken

    let verified = jwt.verify(req.token, "TomCruise");
    console.log("Here's the verified token: ", verified);

    req.userId = verified.rowid;
    next();
  }
  else {
    res.status(403).send("authRequired else if ERROR");
  }
}; 
