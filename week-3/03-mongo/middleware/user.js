const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  const username = req.headers.username;
  const password = req.headers.password;

  const user = await User.findOne({ username });

  if (user.password === password && user.username === username) {
    return next();
  }
  res.json({
    message: "wrong username and password",
  });
}

module.exports = userMiddleware;
