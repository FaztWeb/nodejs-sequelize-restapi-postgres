import Project from '../models/Project';
import Task from '../models/Task';

export async function getProjects(req, res) {
    try {
        const projects = await Project.findAll({
            atributes: ['id', 'name', 'priority', 'description', 'deliverydate']
        });
        res.json({
            data: projects
        })
    } catch (error) {
        console.log(error);
        res.json({
            data: {},
            message: 'something goes wrong'
        });
    }
};

export async function createProject(req, res) {
    const { name, priority, description, deliverydate } = req.body;
    try {
        let newProject = await Project.create({
            name,
            priority,
            description,
            deliverydate
        }, {
                fields: ['name', 'priority', 'description', 'deliverydate']
            });
        if (newProject) {
            return res.json({
                message: 'New Project created',
                data: newProject
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something Goes Wrong. Try Again.',
            data: {},
        })
    }
    res.json('received');
};

export async function getOneProject(req, res) {
    const { id } = req.params;
    try {
        const project = await Project.findOne({
            where: {
                id
            }
        })
        res.json(project);
    } catch (error) {
        console.log(error);
    }
}

export async function updateProject(req, res) {
    const { id } = req.params;
    const { name, priority, description, deliverydate } = req.body;
    try {
        const projects = await Project.findAll({
            atributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
            where: {
                id
            }
        });
        if (projects.length > 0) {
            projects.forEach(async (project) => {
                await project.update({
                    // name: name ? name : project.name,
                    name,
                    priority,
                    description,
                    deliverydate
                });
            });
            return res.json({
                message: 'Project Updated',
                data: projects
            })
        }
    } catch (e) {
        res.json({
            message: 'Cannot update this Project.',
            data: {}
        })
    }
};

export async function deleteProject(req, res) {
    const { id } = req.params;
    try {
        await Task.destroy({
            where: {
                projectid: id
            }
        });
        const deleteRowsCount = await Project.destroy({
            where: {
                id
            }
        });
        res.json({
            message: 'Project Deleted',
            count: deleteRowsCount
        })
    } catch (error) {
        res.json({
            message: 'Delete Failed.',
            data: {}
        });
    }
};