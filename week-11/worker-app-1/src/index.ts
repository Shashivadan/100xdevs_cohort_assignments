import { Hono } from "hono";
import { cors } from "hono/cors";
import userRouter from "./routes/usersRoute";

const app = new Hono();

app.use(cors());
app.route("/api/v1/user", userRouter);

export default app;
