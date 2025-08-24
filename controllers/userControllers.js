import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve user profile" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, department } = req.body;

  let updateData = { name, email, role, department };
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }
  if (req.file && req.file.filename) {
    updateData.avatar = req.file.filename;
  }

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};
