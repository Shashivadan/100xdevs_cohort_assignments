const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

const { Admin, Course } = require("../db/index");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const ExitsingUser = await Admin.findOne({ username });
  if (ExitsingUser) {
    return res.json({
      message: "user already exists",
    });
  }
  const addAdmin = new Admin({
    username: username,
    password: password,
  }).save();
  res.status(200).json({
    message: "Admin created successfully",
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const newCourse = new Course({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  }).save();

  res.json({
    message: "Course created successfully",
    courseId: req.body.courseId,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allData = await adminSignup.Course.find({});
  res.json(allData);
});

module.exports = router;
