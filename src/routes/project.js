const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const marked= require('marked');
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
    if (isNaN(id)) {
        return res.status(400).send('Invalid project ID');
    }
    try {
        const project = await prisma.developmentLog.findUnique({
            where: {
                id: id,
            }
        });
        const htmlContent = await marked.marked(project.text);
        res.status(200).send(
            `<div id="preview" 
                        style="width: 50%;
                        margin: 20px;
                        height: 600px;
                        border: 1px solid #ccc;
                        padding: 10px;
                        resize: none;
                        overflow: auto;">${htmlContent}
                  </div>`)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;