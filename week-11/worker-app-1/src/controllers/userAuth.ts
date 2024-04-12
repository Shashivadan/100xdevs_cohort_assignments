import { PrismaClient } from "@prisma/client";

import { Context } from "hono";

import { signupScheme } from "../utils/zodUtils";
import { Jwt } from "hono/utils/jwt";

const prisma = new PrismaClient();

enum ErrorCodes {
  ErrorNotFound = 404,
  NotAcceptable = 406,
  Unauthorized = 401,
}

type SignUpTypes = {
  username: string;
  password: string;
  email: string;
};

async function signup(c: Context) {
  try {
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
      return c.status(ErrorCodes.Unauthorized);
    }

    const newUser = await prisma.users.create({
      data: body,
    });

    if (!newUser) {
      return c.status(ErrorCodes.ErrorNotFound);
    }

    const userId = newUser.id;

    const token = Jwt.sign(userId, "1234");

    return c.json({
      token,
      userInfo: {
        username: newUser.username,
        email: newUser.email,
        userId: newUser.id,
      },
    });
  } catch (error) {
    return c.body("Internal server error" + error, 500);
  }
}
