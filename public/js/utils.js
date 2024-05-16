export const createOption = ({id, text}) => `<option value="${id}">${text}</option>`;
export const createUl = (language) => `<ul>${language}</ul>`;
export const createLi = (project) => `<li><a href="http://localhost:8080/project/${project.id}?name=${project.name}">${project.name}</a></li>`;