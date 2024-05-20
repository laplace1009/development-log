const express = require('express');
const router = express.Router();
const marked= require('marked');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const {createDevelopmentLog} = require("../services/developmentLog");

router.get('/create', authMiddleware, async (req, res) => {
   await res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'create.html'));
});

router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { project, editor } = req.body;
        await createDevelopmentLog(project, editor);
        res.status(200).redirect('/')
    } catch (e) {
        res.status(500).send('server error')
        console.error(`created error ${e}`)
    }
})

router.post('/convert', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const htmlContent = await marked.marked(req.body.toString());
    res.send(htmlContent);
});

module.exports = router;
