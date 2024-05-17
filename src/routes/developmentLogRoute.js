const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const marked= require('marked');
const prisma = new PrismaClient();

router.get('/development/:id', async (req, res) => {
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

        const text = marked.marked(project.text)

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
                <button id="editBtn" class="hidden">Edit</button>
                <button id="previewBtn" class="hidden">Preview</button>
                <button id="invertBtn">Invert Colors</button>
            </div>
            <textarea id="markdown-editor" placeholder="개발 일지 내용을 저장해주세요" name="editor" required class="hidden"></textarea>
            <div id="preview"></div>
            <form class="hidden">
                <div class="form-controls">
                    <select id="language-selector" name="language"></select>
                    <select id="project-selector" name="project"></select>
                    <button id="modify" type="submit">Modify</button>
                </div>
            </form>
        </div>
        <script>
            document.getElementById('invertBtn').addEventListener('click', function() {
                document.body.classList.toggle('invert');
            });
            
            document.addEventListener('DOMContentLoaded', async () => {
                document.getElementById('preview').innerHTML = \`${text}\`
                // if (document.cookie.split('; ').some(cookie => cookie.startsWith('accessToken'))) {
                //     document.querySelectorAll('.hidden').forEach(el => {
                //         el.classList.remove('hidden');
                //     }))
                // }
            })
            
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