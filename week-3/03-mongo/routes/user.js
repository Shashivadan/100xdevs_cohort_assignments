const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db/index");
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  const ExitsingUser = await User.findOne({ username: username });

  if (ExitsingUser) {
    return res.json({
      message: "user already exists",
    });
  }

  const newUser = await User.create({
    username: username,
    password: password,
  });
  res.json({
    message: "user created successfully",
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allData = await adminSignup.Course.find({});

  res.status(200).json(allData);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.body.username;

  const user = await User.findOne({ username });
  const course = await Course.findOne({ _id: courseId });

  if (!course) {
    res.json({
      message: "course purchased successfully",
    });
  }

  User.updateOne({ username: username }, { $push: { courses: course } });

  res.json({
    message: "course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
  }
  res.status(200).json({
    coursePurchased: user.Courses,
  });
});

module.exports = router;
