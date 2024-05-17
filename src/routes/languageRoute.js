const express = require('express');
const {PrismaClient} = require("@prisma/client");
const {getLanguages} = require("../services/registerLogField");
const router = express.Router();
const prisma = new PrismaClient();
const authMiddleware = require("../middleware/authMiddleware");

router.get('/language', authMiddleware, (req, res) => {
    res.send(`
        <form method="POST" action="/language">
            <input type="text" name="language" placeholder="추가할 언어를 입력해주세요." required>
            <button type="submit">추가</button>
        </form>
    `)
});

router.post('/language', authMiddleware, async (req, res) => {
    try {
        const { language: text } = req.body;
        const language = text.trim().toUpperCase();
        const lang = await prisma.language.findUnique({
            where: {language},
        });

        if (lang) {
            res.status(200).send('exist language');
        } else {
            await prisma.language.create({
                data: {
                    language,
                }
            })
            res.status(200).send('successfully registered');
        }
    } catch (e) {
        console.error(e);
        res.status(500).send('server error');
    }
});

router.get('/language-list', async (req, res) => {
    const languages = await getLanguages();
    res.status(200).json(languages)
})

module.exports = router;