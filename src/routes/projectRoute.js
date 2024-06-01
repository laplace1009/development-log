const express = require('express');
const router = express.Router();
const {createUl, createLi} = require("../utils/element");
const authMiddleware = require('../middleware/authMiddleware');
const {getProject, createProject, getProjectList, getLanguageList, getDevelopmentLogList} = require("../services/developmentLog");

router.get('/register-project', authMiddleware, async (req, res) => {
    try {
        const languages = await getLanguageList();
        const innerHtml = languages.reduce(
            (a, b) =>
                `${a}<option value="${b.id}">${b.language}</option>`, `<option value="">언어를 선택해주세요.</option>`);
        res.send(`
        <form method="POST" action="/register-project">
            <select name="languageId">
                ${innerHtml}
            </select>
            <input type="text" name="name" placeholder="추가할 프로젝트를 입력해주세요." required>
            <button type="submit">추가</button>
        </form>
    `)
    } catch (e) {
        console.error(e);
        res.status(500).send('server error');
    }
});

router.post('/register-project', authMiddleware, async (req, res) => {
    try {
        const { languageId, name:text } = req.body;
        const name = text.trim();
        const lang = await getProject(languageId, name);

        if (lang) {
            res.status(200).send('exist project');
        } else {
            await createProject(languageId, name);
            res.status(200).send('successfully registered');
        }
    } catch (e) {
        console.error(e);
        res.status(500).send('server error');
    }
});

router.get('/project-list/:id', async (req, res) => {
    try {
        const projects = await getProjectList(parseInt(req.params.id));
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
        const responseList = await getDevelopmentLogList(id);
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