import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const uploadFile = async (req, res) => {
  const { id } = req.params;
  const uploadedBy = req.user.id;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const file = await prisma.file.create({
      data: {
        taskId: Number(id),
        filename: req.file.filename,
        url: `/uploads/${req.file.filename}`,
        uploadedBy: Number(uploadedBy),
      },
    });
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload file" });
  }
};

export const getFilesByTaskId = async (req, res) => {
  const { id } = req.params;

  try {
    const files = await prisma.file.findMany({
      where: {
        taskId: Number(id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve files" });
  }
};
