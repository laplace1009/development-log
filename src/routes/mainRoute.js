const express = require('express');
const {PrismaClient} = require('@prisma/client');
router = express.Router();
const prisma = new PrismaClient();

router.get('/main-view', async (req, res) => {
    try {
        const temp = await prisma.language.findMany({
            include: {
                project: true,
            }
        })
        res.status(200).json(temp)
    } catch (e) {
        console.error(e);
    }
})

module.exports = router;

