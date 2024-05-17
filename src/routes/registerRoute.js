const express = require('express');
const router = express.Router();
const marked= require('marked');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/create', authMiddleware, async (req, res) => {
   await res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'create.html'));
});

router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { language, project, editor } = req.body;
        await prisma.developmentLog.create({
            data: {
                projectId: parseInt(project),
                text: editor,
            }
        })
        res.status(200).redirect('/')
    } catch (e) {
        res.status(500).send('server error')
        console.error(`created error ${e}`)
    }
})

router.patch('/update/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const {text} = req.body;
    try {
        const updateText = await prisma.developmentLog.update({
            where: { id: parseInt(id) },
            data: {
                text: text,
            }
        });
        res.json(updateText);
    } catch (e) {
        console.error(`updated error ${e}`)
        res.status(500).send('server error');
    }
})

router.post('/convert', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const htmlContent = await marked.marked(req.body.toString());
    res.send(htmlContent);
});

module.exports = router;
