const jwt = require("jsonwebtoken");
const secretKey = "sjcbksvCuksdcvldskhj";

const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  try {
    const auth = req.headers.Authorization;
    // const password = req.headers.password;
    if (!auth || !auth.startsWith("Bearer ")) {
      res.status(404).json({
        message: "not authorized key",
      });
    }

    const decode = jwt.verify(auth.split("")[1], secretKey);

    if (!decode) {
      res.status(404).json({
        message: "not authorized",
      });
    }
    // const admin = await Admin.findOne({ username: decode.username });

    if (!admin) {
      res.status(404).json({
        message: "not authorized",
      });
    }

    // if (
    //   admin.password === decode.password &&
    //   admin.username === decode.username
    // ) {
    //   next();
    // }
    next();
  } catch (err) {
    console.log(err);
    res.status(404).jsgon({
      message: err,
    });
  }
}

module.exports = adminMiddleware;
