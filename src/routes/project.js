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
        res.status(200).send(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>개발일지</title>
            <link rel="stylesheet" href="../css/developmentLog.css">
        </head>
        <body>
        <div class="editor-container">
            <div class="header-container">
                <button id="invertBtn">Invert Colors</button>
            </div>
            <div id="preview">${htmlContent}</div>
        </div>
        <script>
            document.getElementById('invertBtn').addEventListener('click', function() {
                document.body.classList.toggle('invert');
            });
        </script>
        </body>
        </html>
    `)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;