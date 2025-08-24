import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const comment = await prisma.comment.create({
      data: {
        taskId: Number(id),
        userId: Number(userId),
        content,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const getCommentsByTaskId = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { taskId: Number(id) },
      include: { user: true },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
