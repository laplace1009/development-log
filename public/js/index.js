const main = document.getElementById('languages')
const createUl = (language) => `<ul>${language}</ul>`
const createLi = (project) => `<li>${project}</li>`
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
        const str = createProjectList(projectList)
        main.innerHTML = str;
        console.log(str);
    } catch (error) {
        console.error(error)
    }
})