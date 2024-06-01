const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {createDevelopmentLog, modifyDevelopmentLog} = require("../services/developmentLog");

router.post('/upload', authMiddleware, async (req, res) => {
    try {
        const { project, text } = req.body.content;
        await createDevelopmentLog(project, text);
        res.redirect('/');
    } catch (e) {
        console.error(e);
        res.status(404).send('Server Error');
    }
})

router.patch('/modify', authMiddleware, async (req, res) => {
    const { id, projectId , text } = req.body.content;
    try {
        await modifyDevelopmentLog(id, projectId, text);
        res.status(200).send('ok');
    } catch (e) {
        console.error(`updated error ${e}`)
        res.status(500).send('server error');
    }

})

module.exports = router;