const createUl = (language) => `<ul>${language}</ul>`;
const createLi = (path, obj) => `<li><a href="/${path}/${obj.id}">${obj.name}</a></li>`;

module.exports = {
    createUl,
    createLi,
}