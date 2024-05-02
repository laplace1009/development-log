const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    // res.send(`Number of views: ${req.session.views}`);
    res.status(200).send(`<h1>DevelopmentLog!!!</h1>`)
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

