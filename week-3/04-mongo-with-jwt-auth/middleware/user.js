const jwt = require("jsonwebtoken");
const secretKey = "dchbhd ajvcdfv";

const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("bearer ")) {
    res.status(404).josn({});
  }
  try {
    const decode = jwt.verify(authorization.split(" ")[1], secretKey);
    if (decode.username) {
      next();
    } else {
      res.status(404).josn({});
    }
  } catch (err) {
    res.status(404).josn({
      msg: err,
    });
  }
}

module.exports = userMiddleware;
