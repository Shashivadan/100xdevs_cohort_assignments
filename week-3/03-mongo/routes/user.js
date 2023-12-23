const { Router } = require("express");
const router = Router();
const { User, Course } = require("../middleware/user");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const ExitsingUser = User.findOne({ username });
  if (ExitsingUser) {
    return res.json({
      message: "user already exists",
    });
  }

  const newUser = new User({
    username: username,
    password: password,
  }).save();
  res.json({
    message: "Admin created successfully",
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
  if (course) {
    user.courses.push(course);
    user.save();
    res.json({
      message: "course purchased successfully",
    });
  } else {
    res.status(400).json({
      message: "course not found",
    });
  }
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
    coursePurchased: user.courses,
  });
});

module.exports = router;
