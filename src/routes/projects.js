import { Router } from 'express'
const router = Router();

// Controllers
import { getProjects, createProject, updateProject, getOneProject, deleteProject } from '../controllers/project.controller';

// Routes
router.post('/', createProject);
router.get('/', getProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.get('/:id', getOneProject)

export default router;