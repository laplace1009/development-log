const express = require('express');
const {PrismaClient} = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.get('/language', (req, res) => {
    res.send(`
        <form method="POST" action="/language">
            <input type="text" name="language" required="추가할 언어를 입력해주세요.">
            <button type="submit">추가</button>
        </form>
    `)
});

router.post('/language', async (req, res) => {
    try {
        const { language: text } = req.body;
        const language = text.trim().toUpperCase();
        console.log(language)
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

module.exports = router;