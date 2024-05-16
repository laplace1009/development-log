const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const {createUl, createLi} = require("../utils/element");
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
    const name = req.query.name;
    if (isNaN(id)) {
        return res.status(400).send('Invalid project ID');
    }
    try {
        const responseList = await prisma.developmentLog.findMany({
            where: { projectId: id },
            orderBy: {
                id: 'asc',
            }
        })
        const createProjectList =
            responseList.reduce((acc, item, idx) =>
                acc.concat(createLi('development', {name: `${idx + 1} 일차`, id: item.id})), createUl(''));

        res.status(200).send(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>개발일지</title>
            <link rel="stylesheet" href="../css/index.css">
        </head>
        <body>
        <div class="main-container">
            <div class="header-container">
                <h1>${name}</h1>
                <button id="invertBtn">Invert Colors</button>
            </div>
            ${createProjectList}
        </div>
        <script>
            document.getElementById('invertBtn').addEventListener('click', function() {
                document.body.classList.toggle('invert');
            });
            
            const applyOSTheme = () => {
                const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isDarkMode) {
                    document.body.classList.remove('invert');
                } else {
                    document.body.classList.add('invert');
                }
            };
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyOSTheme);
            document.querySelectorAll('a').forEach((e) => {
                e.setAttribute('target', '_blank');
            })
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