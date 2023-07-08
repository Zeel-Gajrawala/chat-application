const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  let token;
  if ("authorization" in req.headers) {
    token = req.headers["authorization"].split(" ")[1];
  }

  if (!token) {
    return res.status(403).send("Token Required");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
