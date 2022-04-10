import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";

export async function getProjects(req, res) {
  try {
    const projects = await Project.findAll({
      atributes: ["id", "name", "priority", "description", "deliverydate"],
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createProject(req, res) {
  const { name, priority, description, deliveryDate } = req.body;
  try {
    let newProject = await Project.create(
      {
        name,
        priority,
        description,
        deliveryDate: new Date(deliveryDate).getTime(),
      },
      {
        fields: ["name", "priority", "description", "deliverydate"],
      }
    );
    return res.json(newProject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.json("received");
}

export async function getProject(req, res) {
  const { id } = req.params;
  try {
    const project = await Project.findOne({
      where: {
        id,
      },
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function updateProject(req, res) {
  const { id } = req.params;
  const { name, priority, description, deliverydate } = req.body;
  try {
    const projects = await Project.findAll({
      atributes: ["id", "name", "priority", "description", "deliverydate"],
      where: {
        id,
      },
    });
    if (projects.length > 0) {
      projects.forEach(async (project) => {
        await project.update({
          // name: name ? name : project.name,
          name,
          priority,
          description,
          deliverydate,
        });
      });
      return res.json({
        message: "Project Updated",
        data: projects,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteProject(req, res) {
  const { id } = req.params;
  try {
    await Task.destroy({
      where: {
        projectId: id,
      },
    });
    await Project.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getProjectTasks(req, res) {
  const { id } = req.params;
  try {
    const tasks = await Task.findAll({
      attributes: ["id", "projectId", "name", "done"],
      where: { projectId: id },
    });
    res.json(tasks);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
