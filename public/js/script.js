// public/script.js 파일

const languageElem = document.getElementById('language-selector');
const projectElem = document.getElementById('project-selector');
const optionElemCreater = ({id, text}) => `<option value="${id}">${text}</option>`;

document.getElementById('previewBtn').addEventListener('click', () => {
    const markdownText = document.getElementById('markdown-editor').value;
    const previewDiv = document.getElementById('preview');
    fetch('/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: markdownText,
    })
        .then(response => response.text())
        .then(html => {
            previewDiv.innerHTML = html;
            previewDiv.classList.remove('hidden');
            document.getElementById('markdown-editor').classList.add('hidden');
        });
});

document.getElementById('editBtn').addEventListener('click', () => {
    document.getElementById('markdown-editor').classList.remove('hidden');
    document.getElementById('preview').classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`/language-list`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const languages = await response.json();
        languageElem.innerHTML = languages.reduce(
            (a, b) => a + optionElemCreater({id: b.id, text: b.language}), optionElemCreater({id: '', text: 'choose language'}));
        projectElem.innerHTML = optionElemCreater({id: '', text: 'choose project'});
    } catch (e) {
        console.error(e);
    }
})
//
document.getElementById('language-selector').addEventListener('change', async () => {
    try {
        const response = await fetch(`/project-list/${languageElem.value}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const projects = await response.json();
        console.log(projects)
        projectElem.innerHTML = projects.reduce(
            (a, b) => a + optionElemCreater({id: b.id, text: b.name}), optionElemCreater({id: '', text: 'choose project'}));
    } catch (e) {
        console.error(e)
    }
})

