const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'index.html'));
    } catch (e) {
        console.error(e);
    }
})

const registerUserRoute = require('./registerLanguage');
const loginUserRoute = require('./loginRoute');
const tokenRouter = require('./token');
const createRouter = require('./createLog');
const languageRouter = require('./registerLanguage');
const projectRegisterRouter = require('./registerProject');
const mainViewRouter = require('./mainRoute');
const projectListRouter = require('./projectRoute');
const uploadRouter = require('./upload');
const developmentLogRouter = require('./developmentLogRoute');

router.use(registerUserRoute);
router.use(loginUserRoute);
router.use(tokenRouter);
router.use(createRouter);
router.use(languageRouter);
router.use(projectRegisterRouter);
router.use(projectListRouter);
router.use(mainViewRouter);
router.use(uploadRouter);
router.use(developmentLogRouter);

module.exports = router;

