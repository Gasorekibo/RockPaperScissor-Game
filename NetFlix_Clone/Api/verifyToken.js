const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    // The line bellow is bkz token appear as bearer token, so to catch the token we will need to split it
    // using empty space and then return list where token is on index 1.
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.jwt_key, (err, user) => {
      if (err) res.status(403).json("Token is not Valid");
      else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).json("You are Not Authenticated");
  }
}

module.exports = verifyToken;
