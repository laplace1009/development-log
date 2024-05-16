const createUl = (language) => `<ul>${language}</ul>`;
const createLi = (path, obj) => `<li><a href="http://localhost:8080/${path}/${obj.id}">${obj.name}</a></li>`;

module.exports = {
    createUl,
    createLi,
}