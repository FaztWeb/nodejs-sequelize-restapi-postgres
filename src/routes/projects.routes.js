import { Router } from "express";
import {
  getProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
  getProjectTasks,
} from "../controllers/project.controller.js";

const router = Router();

// Routes
router.post("/", createProject);
router.get("/", getProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id", getProject);

router.get("/:id/tasks", getProjectTasks);

export default router;
