import { Hono } from "hono";
import { signUp } from "../controllers/userAuth";

const userRouter = new Hono();

userRouter.post("/signup", signUp);

export default userRouter;
