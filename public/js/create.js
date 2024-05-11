import {createOption} from "./utils.js";

const text = document.getElementById('markdown-editor');
const languageElem = document.getElementById('language-selector');
const projectElem = document.getElementById('project-selector');

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
            (acc, {id, language: text}) =>
                acc.concat(createOption({id, text})), createOption({id: '', text: 'choose language'}));
        projectElem.innerHTML = createOption({id: '', text: 'choose project'});
    } catch (e) {
        console.error(e);
    }
})

document.getElementById('language-selector').addEventListener('change', async () => {
    try {
        const response = await fetch(`/project-list`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const projects = await response.json();
        projectElem.innerHTML =  projects.reduce(
            (acc, {id, name}) =>
                acc.concat(createOption({id: id, text: name})), createOption({id: '', text: 'choose project'}));
    } catch (e) {
        console.error(e);
    }
})

document.getElementById('register').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: {project: projectElem.value, text: text.value} }),
        });
        const { redirect } = await response.json();
        window.location.href = `http://localhost:8080${redirect}`
    } catch (e) {
        console.error(e);
    }
    // console.log(text.value)
})

