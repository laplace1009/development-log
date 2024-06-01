import {applyOSTheme, createOption} from "./utils.js";

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

document.getElementById('invertBtn').addEventListener('click', function () {
    document.body.classList.toggle('invert');
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`/language-list`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const languages = await response.json();
        languageElem.innerHTML = languages.reduce(
            (acc, { id, language: text }) =>
                acc.concat(createOption({ id, text })), createOption({ id: '', text: 'choose language' }));
        projectElem.innerHTML = createOption({ id: '', text: 'choose project' });
    } catch (e) {
        console.error(e);
    }
});

document.getElementById('language-selector').addEventListener('change', async () => {
    try {
        const response = await fetch(`/project-list`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const projects = await response.json();
        projectElem.innerHTML = projects.reduce(
            (acc, { id, name }) =>
                acc.concat(createOption({ id: id, text: name })), createOption({ id: '', text: 'choose project' }));
    } catch (e) {
        console.error(e);
    }
});

document.getElementById('register').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        await fetch(`/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: { project: projectElem.value, text: getMarkdownText() } }),
        });
        window.location.href = '/redirect/main';
    } catch (e) {
        console.error(e);
    }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyOSTheme);
