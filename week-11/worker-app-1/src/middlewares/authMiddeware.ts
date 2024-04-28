import { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";

async function authMiddleware(c: Context, next: Next) {
  try {
    const token = await c.req.header("token");
    if (!token || token.startsWith("Bearer "))
      return c.json({ message: "token is not provided" }, 401);
    const decode = await Jwt.verify(token.split(" ")[1], c.env.SECRET_KEY);
    if (!decode) return c.json({ message: "Not acceptable" }, 401);
    c.set("userId", decode);
    await next();
  } catch (error) {
    return c.json({ message: "Internal Server Error" + error }, 500);
  }
}

export default authMiddleware;
