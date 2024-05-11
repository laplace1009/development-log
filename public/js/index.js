import {createLi, createUl} from "./utils.js";

const main = document.getElementById('languages')
const createProjectList = (projectList) =>
    projectList.reduce((acc, {language, project}) =>
        createUl(language).concat(project.reduce((acc, project) =>
            acc.concat(createLi(project)), ``)), ``)

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