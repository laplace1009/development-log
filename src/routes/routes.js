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
const loginUserRoute = require('./login');
const tokenRouter = require('./token');
const createRouter = require('./createLog');
const languageRouter = require('./registerLanguage');
const projectRegisterRouter = require('./registerProject');

router.use(registerUserRoute);
router.use(loginUserRoute);
router.use(tokenRouter);
router.use(createRouter);
router.use(languageRouter);
router.use(projectRegisterRouter);

module.exports = router;

