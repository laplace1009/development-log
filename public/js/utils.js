export const createOption = ({id, text}) => `<option value="${id}">${text}</option>`;
export const createUl = (language) => `<ul>${language}</ul>`;
export const createLi = (project) => `<li><a href="/project/${project.id}?name=${project.name}">${project.name}</a></li>`;

export const applyOSTheme = () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
        document.body.classList.add('invert');
    } else {
        document.body.classList.remove('invert');
    }
};