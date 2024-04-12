import { PrismaClient } from "@prisma/client";

import { Context } from "hono";

import { signupScheme, signInSchema } from "../utils/zodUtils";
import { Jwt } from "hono/utils/jwt";
import { z } from "zod";

const prisma = new PrismaClient();

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
      data: {
        email: body.email,
        username: body.username,
        password: body.password,
      },
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
    return c.body("Internal server error" + error, ErrorCodes.InternalError);
  }
}

type signInType = {
  email: string;
  password: string;
};

async function signIn(c: Context) {
  const body: signInType = await c.req.json();
}

export { signUp };
