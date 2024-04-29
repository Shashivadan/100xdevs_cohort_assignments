import { Context } from "hono";

import { withAccelerate } from "@prisma/extension-accelerate";
// const prisma = new PrismaClient().$extends(withAccelerate());

import { PrismaClient } from "@prisma/client/edge";

async function allPosts(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allPosts = await prisma.posts.findMany({
      include: {
        tags: true,
        User: true,
      },
    });
    return c.json({
      post: allPosts.map((post) => {
        return {
          id: post.id,
          username: post.User.username,
          userId: post.userId,
          title: post.title,
          body: post.body,
          createdAt: post.createdAr,
        };
      }),
    });
  } catch (error) {
    return c.json(
      {
        message: "Internal Server Error" + error,
      },
      500
    );
  }
}

async function userPosts(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userPosts = await prisma.posts.findMany({
      where: {
        userId: c.get("userId"),
      },
    });
    return c.json({
      userPosts,
    });
  } catch (error) {
    return c.json({ message: "Internal Server Error :" + error }, 500);
  }
}

interface PostType {
  title: string;
  body: string;
  tags: string;
}

async function createPost(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const { title, body, tags }: PostType = await c.req.json();

    if (!title || !body) {
      return c.json({ message: "not acceptable" }, 401);
    }

    const newTag: string[] = tags.split(",").map((tag) => tag.trim());

    const newPost = await prisma.posts.create({
      data: {
        userId: c.get("userId"),
        title: title,
        body: body,
        tags: {
          connectOrCreate: newTag.map((tag) => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
      select: {
        id: true,
        title: true,
        body: true,
        tags: {
          select: {
            tag: true,
            id: true,
          },
        },
      },
    });

    if (!newPost) {
      return c.json(
        {
          message: "post not created",
        },
        403
      );
    }
    return c.json({
      post: newPost,
    });
  } catch (error) {
    return c.json({ message: "Internal Server Error" + error }, 500);
  }
}

async function getPostById(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id: number = await Number(c.req.param("id"));
    const userPost = await prisma.posts.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
        body: true,
        tags: true,
      },
    });

    if (!userPost) {
      return c.json({ message: "Post not Exists" }, 401);
    }
    return c.json({
      userPost,
    });
  } catch (error) {
    return c.json({ message: "Internal Server Error" + error }, 500);
  }
}

async function deleteBlogById(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id: number = await Number(c.req.param("id"));

    const postExisting = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.get("userId"),
      },
    });

    if (!postExisting) {
      return c.json({ message: "post Not Exists" }, 400);
    }

    const deletePost = await prisma.posts.delete({
      where: {
        userId: c.get("userId"),
        id: id,
      },
    });

    if (!deletePost) {
      return c.json({ message: "no Post is deleted" }, 403);
    }

    return c.json({ message: "successfully deleted" });
  } catch (error) {
    return c.json({ message: "Internal Server Error" + error }, 500);
  }
}

type UpdateType = {
  title: string;
  body: string;
};

async function updatePost(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id: number = await Number(c.req.param("id"));
    const { title, body }: UpdateType = await c.req.json();

    const postExists = await prisma.posts.findUnique({
      where: {
        id: id,
        userId: c.get("userId"),
      },
    });
    if (!postExists) {
      return c.json({ message: "Post Not Exists" });
    }

    const updatePost = await prisma.posts.update({
      where: {
        userId: c.get("userId"),
        id: id,
      },
      data: {
        title,
        body,
      },
    });

    if (!postExists) {
      return c.json(
        {
          message: "post not updated",
        },
        403
      );
    }

    return c.json({ updatePost });
  } catch (error) {
    return c.json({ message: "Internal Server Error : " + error }, 500);
  }
}

export {
  allPosts,
  userPosts,
  createPost,
  getPostById,
  deleteBlogById,
  updatePost,
};
