import { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";

async function authMiddleware(c: Context, next: Next) {
  const token = c.req.header("token");
  if (!token) return c.json({ message: "token is not provided" }, 401);
  try {
    const decode = await Jwt.verify(token, c.env.SECRET_KEY);
    if (!decode) return c.json({ message: "not acceptable" }, 401);
    c.set("userId", decode);
    next();
  } catch (error) {
    return c.json({ message: "Internal Server Error" }, 500);
  }
}

export default authMiddleware;
