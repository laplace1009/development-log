const createElement = ({tag, id, value, name}) => `<${tag} id="${id}" value="${value}">{name}</${tag}>`;
const optionElemCreater = ({id, text}) => `<option value="${id}">${text}</option>`;
const createUl = (language) => `<ul>${language}</ul>`;
const createLi = (project) => `<li><a>${project}</a></li>`;