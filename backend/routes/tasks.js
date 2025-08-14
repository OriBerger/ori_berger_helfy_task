import express from "express";
const router = express.Router();

let tasks = [];
let nextId = 1;

router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

router.post("/", (req, res) => {
  const { title, description, priority } = req.body;
  const priorities = ["low", "medium", "high"];
  if (typeof title !== "string" || typeof description !== "string") {
    return res
      .status(400)
      .json({
        message: "Title and description are required and must be strings.",
      });
  }
  if (!priorities.includes(priority)) {
    return res
      .status(400)
      .json({ message: "Priority must be one of: low, medium, high." });
  }
  const newTask = {
    id: nextId++,
    title,
    description,
    completed: false,
    createdAt: new Date(),
    priority,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  
  const { title, description, priority } = req.body;
  
  if (!title && !description && !priority) {
    return res.status(400).json({ 
      message: "At least one field (title, description, or priority) must be provided for update." 
    });
  }
  
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }
  
  if (priority && !["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ 
      message: "Priority must be one of: low, medium, high." 
    });
  }
  
  if (title) task.title = title;
  if (description) task.description = description;
  if (priority) task.priority = priority;
  
  res.status(200).json(task);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});

router.patch("/:id/toggle", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }
  task.completed = !task.completed;
  res.status(200).json(task);
});

export default router;
