import { Hono } from "hono";
import { signUp, signIn } from "../controllers/userAuth";
import {
  allPosts,
  createPost,
  deleteBlogById,
  getPostById,
  userPosts,
} from "../controllers/postController";
import authMiddleware from "../middlewares/authMiddeware";

const userRouter = new Hono();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);

//posts
userRouter.get("/posts", allPosts);
userRouter.post("/posts", authMiddleware, userPosts);
userRouter.post("/newpost", authMiddleware, createPost);

userRouter.get("/post/:id", getPostById);
userRouter.delete("/post/:id", authMiddleware, deleteBlogById);

export default userRouter;
