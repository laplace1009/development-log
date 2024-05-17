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

const userRouter = require('./userRoute');
const loginRouter = require('./loginRoute');
const tokenRouter = require('./tokenRoute');
const createRouter = require('./registerRoute');
const languageRouter = require('./languageRoute');
const mainRouter = require('./mainRoute');
const projectRouter = require('./projectRoute');
const uploadRouter = require('./uploadRoute');
const developmentLogRouter = require('./developmentLogRoute');

router.use(userRouter);
router.use(loginRouter);
router.use(tokenRouter);
router.use(createRouter);
router.use(languageRouter);
router.use(mainRouter);
router.use(projectRouter);
router.use(uploadRouter);
router.use(developmentLogRouter);

module.exports = router;

