const express = require('express');
const router = express.Router();
const marked= require('marked');
const {getDevelopmentLog} = require("../services/developmentLog");

router.get('/development/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send('Invalid project ID');
    }
    try {
    const {text, projectId, project: {name, languageId, language: {language}}} = await getDevelopmentLog(id);
    const txt = marked.marked(text)
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
                <button id="editBtn">Edit</button>
                <button id="previewBtn">Preview</button>
                <button id="invertBtn">Invert Colors</button>
            </div>
            <textarea id="markdown-editor" placeholder="개발 일지 내용을 저장해주세요" name="editor" required class="hidden"></textarea>
            <div id="preview"></div>
            <form class="admin">
                <div class="form-controls">
                    <select id="language-selector" name="language">
                        <option></option>
                    </select>
                    <select id="project-selector" name="project">
                        <option></option>
                    </select>
                    <button id="modify" type="submit">Modify</button>
                </div>
            </form>
        </div>
        <script>
            const markdownElem = document.getElementById('markdown-editor');
            const languageElem = document.getElementById('language-selector');
            const projectElem = document.getElementById('project-selector');
            const previewDiv = document.getElementById('preview');
            const getMarkdownText = () => markdownElem.value;
            const curryingWithConvert = (text, ...args) => f => b => text ? b(f, text, ...args) : f(text, ...args);
            const preview = (text, div) => {
                div.innerHTML = text;
                previewDiv.classList.remove('hidden');
                document.getElementById('markdown-editor').classList.add('hidden');
            }
            
            document.getElementById('invertBtn').addEventListener('click', function() {
                document.body.classList.toggle('invert');
            });
            const convert = async (f, text, ...args) => {
                const response = await fetch('/convert', {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: text,
                });
                const htmlText = await response.text();
                f(htmlText, ...args);
            }
            
            document.getElementById('previewBtn').addEventListener('click', async () => 
                curryingWithConvert(getMarkdownText(), previewDiv)(preview)(convert));
            
            document.getElementById('editBtn').addEventListener('click', () => {
                document.getElementById('markdown-editor').classList.remove('hidden');
                document.getElementById('preview').classList.add('hidden');
            });

            document.addEventListener('DOMContentLoaded', async () => {
                document.getElementById('preview').innerHTML = \`${txt}\`
                document.getElementById('markdown-editor').innerHTML = \`${text}\`
                if (document.cookie.split('; ').some(cookie => cookie.startsWith('accessToken'))) {
                    document.querySelector('.admin').classList.remove('admin')
                }
                const languageOption = document.getElementById('language-selector').querySelector('option')
                const projectOption = document.getElementById('project-selector').querySelector('option')
                languageOption.value = \`${languageId}\`
                languageOption.innerHTML = \`${language}\`
                projectOption.innerHTML = \`${name}\`
                projectOption.value = \`${projectId}\`
            })
            
            const applyOSTheme = () => {
                const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isDarkMode) {
                    document.body.classList.remove('invert');
                } else {
                    document.body.classList.add('invert');
                }
            };
            
            document.getElementById('modify').addEventListener('click', async (e) => {
                e.preventDefault();
                const response = await fetch('/modify', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: {id: ${id}, projectId: ${projectId}, text: getMarkdownText() } })
                })
                if (response.ok) {
                    window.location.replace(\`http://localhost:8080/\`)
                }
            });
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyOSTheme);
        </script>
        </body>
        </html>
    `)
} catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
}
});

module.exports = router;

