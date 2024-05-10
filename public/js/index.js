import {createLi, createUl} from "./utils.js";

const main = document.getElementById('languages')
const createProjectList = (projectList) =>
    projectList.reduce((acc, {language, project}) =>
        createUl(language).concat(project.reduce((acc, {name}) =>
            acc + createLi(name), '')), '')

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/main-view', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        const projectList = await response.json();
        console.log(createProjectList(projectList))
        main.innerHTML = createProjectList(projectList)
    } catch (error) {
        console.error(error)
    }
})