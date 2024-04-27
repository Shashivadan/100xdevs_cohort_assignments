import { Context } from "hono";
import { signupScheme, signInSchema } from "../utils/zodUtils";
import { Jwt } from "hono/utils/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
// const prisma = new PrismaClient().$extends(withAccelerate());

import { PrismaClient } from "@prisma/client/edge";

enum ErrorCodes {
  ErrorNotFound = 404,
  NotAcceptable = 406,
  Unauthorized = 401,
  InternalError = 500,
}

type SignUpTypes = {
  username: string;
  password: string;
  email: string;
};

async function signUp(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body: SignUpTypes = await c.req.json();

    const { success } = signupScheme.safeParse(body);

    if (!success) {
      return c.status(ErrorCodes.NotAcceptable);
    }

    const existingUser = await prisma.users.findFirst({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return c.json(
        { message: "user already exists" },
        ErrorCodes.Unauthorized
      );
    }

    const newUser = await prisma.users.create({
      data: {
        email: body.email,
        username: body.username,
        password: body.password,
      },
      select: {
        email: true,
        username: true,
        id: true,
      },
    });

    if (!newUser) {
      c.status(ErrorCodes.ErrorNotFound);
      return c.json(
        { message: "user is not created" },
        ErrorCodes.ErrorNotFound
      );
    }

    const userId = newUser.id;

    const token = await Jwt.sign(userId, c.env.SECRET_KEY);

    return c.json({
      token,
      userInfo: {
        username: newUser.username,
        email: newUser.email,
        userId: newUser.id,
      },
    });
  } catch (error) {
    return c.body("Internal server error" + error, ErrorCodes.InternalError);
  }
}

type signInType = {
  email: string;
  password: string;
};

async function signIn(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body: signInType = await c.req.json();

    const { success } = signInSchema.safeParse(body);

    if (!success) {
      return c.json({ message: "not Acceptable" }, ErrorCodes.NotAcceptable);
    }

    const user = await prisma.users.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
      select: {
        email: true,
        username: true,
        id: true,
      },
    });

    if (!user) {
      return c.json({ messgae: "unauthorized" }, ErrorCodes.Unauthorized);
    }

    const userId = user.id;

    const token = await Jwt.sign(userId, c.env.SECRET_KEY);
    return c.json({
      token,
      userInfo: {
        username: user.username,
        email: user.email,
        userId: user.id,
      },
    });
  } catch (error) {
    return c.body("Internal server error" + error, ErrorCodes.InternalError);
  }
}

export { signUp, signIn };
