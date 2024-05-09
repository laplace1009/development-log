const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/project-list', async (req, res) => {
    try {
        const projects = await prisma.project.findMany()
        res.status(200).json(projects)
    } catch (e) {
        console.error(e)
        res.status(404).send('Not Found')
    }
})

router.get('/project/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const projects = await prisma.project.findUnique({
            where: {
                id,
            }
        });

        if (projects) {
            console.log(projects)
        } else {
            res.status(404).send('Project Not Found');
        }
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;