const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/upload', authMiddleware, async (req, res) => {
    try {
        const { project, text } = req.body.content;
        await prisma.developmentLog.create({
            data: {
                projectId: parseInt(project),
                text,
            }
        });
        res.status(200).send({redirect: '/'})
    } catch (e) {
        console.error(e);
        res.status(404).send('Server Error');
    }
})

module.exports = router;