import { Hono } from "hono";
import { signUp, signIn } from "../controllers/userAuth";
import { allPosts } from "../controllers/postController";
import authMiddleware from "../middlewares/authMiddeware";

const userRouter = new Hono();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);

//posts
userRouter.get("/posts", authMiddleware, allPosts);
userRouter.post("/posts", allPosts);

export default userRouter;
