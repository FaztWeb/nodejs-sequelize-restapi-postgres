import { Task } from "../models/Task.js";

export async function createTask(req, res) {
  try {
    const { name, done, projectId } = req.body;
    const newTask = await Task.create({
      projectId,
      name,
      done,
    });
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await Task.findAll({
      attributes: ["id", "projectId", "name", "done"],
      order: [["id", "DESC"]],
    });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateTask(req, res) {
  const { id } = req.params;
  // const { projectid, name, done } = req.body;
  try {
    // const updatedTask = await Task.update(
    //   { name, done, projectid },
    //   { where: { id } }
    // );

    const task = await Task.findOne({
      attributes: ["name", "projectId", "done", "id"],
      where: { id },
    });

    task.set(req.body);

    await task.save();

    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    await Task.destroy({
      where: { id },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getTask(req, res) {
  const { id } = req.params;
  try {
    const task = await Task.findOne({
      where: { id },
      attributes: ["id", "projectId", "name", "done"],
    });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
