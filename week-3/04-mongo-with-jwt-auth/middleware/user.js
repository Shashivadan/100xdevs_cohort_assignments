const jwt = require("jsonwebtoken");
const secretKey = "dchbhd ajvcdfv";

const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  try {
    const auth = req.headers.Authorization;

    const decode = jwt.verify(auth, secretKey);
    if (!decode) {
      res.status(404).json({
        message: "wrong authorized key",
      });
    }

    const user = await User.findOne({ username: decode.username });

    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    }

    if (
      user.username === decode.username &&
      user.password === decode.password
    ) {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: err,
    });
  }
}

module.exports = userMiddleware;
