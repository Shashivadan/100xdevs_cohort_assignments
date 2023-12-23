const jwt = require("jsonwebtoken");
const secretKey = "dchbhd ajvcdfv";

const { User } = require("../db/index");

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const auth = req.headers.auth;

  const decode = jwt.verify(auth, secretKey);
  if (!decode) {
    res.status(404).json({
      message: "not authorizedkey",
    });
  }

  const user = User.findOne({ username: decode.username });

  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
  }

  if (user.username === decode.username && user.password === decode.password) {
    next();
  }
}

module.exports = userMiddleware;
