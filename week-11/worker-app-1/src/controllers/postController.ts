import { Context } from "hono";

import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();

async function allPosts(c: Context) {
  try {
    const allPosts = await prisma.posts.findMany();
    return c.json({
      allPosts,
    });
  } catch (error) {}
}

async function createPosts(c: Context) {
  try {
    const allPosts = await prisma.posts.findMany();
    return c.json({
      allPosts,
    });
  } catch (error) {}
}

export { allPosts, createPosts };
