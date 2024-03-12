// Middleware for handling auth
const databaseLogs = require("../db/index");
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;

  const admin = await databaseLogs.Admin.findOne({
    username: username,
    password: password,
  });

  if (admin) {
    res.json({
      message: "successfully logged",
    });
    next();
  }
  res.status(404).json({
    message: "wrong username and password",
  });
}

module.exports = adminMiddleware;
