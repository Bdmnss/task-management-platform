import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (req, res) => {
  const { title, description, status, dueDate, assigneeId } = req.body;
  const createdById = req.user.id;

  let dueDateValue;
  if (typeof dueDate === "number") {
    // თუ რიცხვია, დღევანდელიდან იმდენი დღე
    dueDateValue = new Date();
    dueDateValue.setDate(dueDateValue.getDate() + dueDate);
  } else {
    // პირდაპირ თარიღი
    dueDateValue = new Date(dueDate);
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "pending",
        dueDate: dueDateValue,
        assigneeId: Number(assigneeId),
        createdById: Number(createdById),
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "admin") {
      tasks = await prisma.task.findMany({
        include: {
          comments: { include: { user: true } },
          files: { include: { user: true } },
        },
      });
    } else {
      tasks = await prisma.task.findMany({
        where: { assigneeId: req.user.id },
        include: {
          comments: { include: { user: true } },
          files: { include: { user: true } },
        },
      });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate, assigneeId } = req.body;

  try {
    let updateData = {};
    if (req.user.role === "admin") {
      let dueDateValue;
      if (typeof dueDate === "number") {
        dueDateValue = new Date();
        dueDateValue.setDate(dueDateValue.getDate() + dueDate);
      } else {
        dueDateValue = new Date(dueDate);
      }
      updateData = {
        title,
        description,
        status,
        dueDate: dueDateValue,
        assigneeId: Number(assigneeId),
      };
    } else {
      const task = await prisma.task.findUnique({ where: { id: Number(id) } });
      // employee მხოლოდ საკუთარ დავალებაზე აქვს წვდომა
      if (!task || task.assigneeId !== req.user.id) {
        return res.status(403).json({ error: "Access denied" });
      }
      // employee შეუძლია მხოლოდ სტატუსი შეცვალოს
      const forbiddenFields = ["title", "description", "dueDate", "assigneeId"];
      for (const field of forbiddenFields) {
        if (req.body[field] !== undefined) {
          return res
            .status(403)
            .json({ error: "Access denied: employees can only update status" });
        }
      }
      updateData = { status };
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: updateData,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
