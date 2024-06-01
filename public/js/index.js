import {createLi, createUl} from "./utils.js";

const main = document.getElementById('languages')
const createProjectList = (projectList) =>
    projectList.reduce((ul, {language, project}) =>
        ul.concat(createUl(language).concat(project.reduce((li, project) =>
            li.concat(createLi(project)), ``))), ``)

const applyOSTheme = () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
        document.body.classList.remove('invert');
    } else {
        document.body.classList.add('invert');
    }
};

document.getElementById('invertBtn').addEventListener('click', function () {
    document.body.classList.toggle('invert');
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/main-view', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        const projectList = await response.json();
        main.innerHTML = createProjectList(projectList)
    } catch (error) {
        console.error(error)
    }
})

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyOSTheme);