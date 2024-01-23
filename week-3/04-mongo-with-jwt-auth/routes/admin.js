const { Router, json } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "afeSDvadsv";

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  if (await Admin.findOne({ username })) {
    return res.status(202).json({
      message: "Admin already exists",
    });
  }
  const newAdmin = new Admin({
    username: username,
    password: password,
  }).save();
  res.status(200).json({
    massage: "user created",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await User.findOne({
    username: username,
    password: password,
  });

  if (!userExists) {
    return res.status(400).json({
      massage: "something went wrong",
    });
  }

  const token = jwt.sign({ username }, JWT_SECRET);

  if (!token) {
    return res.status(404).json({
      massage: "token is not created",
    });
  }

  res.status(200).json({
    token: token,
  });
  return;
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const existingCourse = await Course.find({ title });

  if (existingCourse) {
    return res.json({
      massage: "course already exists",
    });
  }

  const newCourse = new Course({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  }).save();

  res.json({
    massage: "course is created",
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourse = await Course.find({});

  if (!allCourse) {
    return res.status(404).json({
      massage: "some thing went wrong",
    });
  }

  res.json({
    Courses: allCourse,
  });
});

module.exports = router;
