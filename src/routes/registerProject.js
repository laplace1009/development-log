const express = require('express');
const {PrismaClient} = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.get('/registerProject', async (req, res) => {
    try {
        const languages = await prisma.language.findMany();
        const innerHtml = languages.reduce(
            (a, b) =>
                `${a}<option value="${b.id}">${b.language}</option>`, `<option value="">언어를 선택해주세요.</option>`);
        res.send(`
        <form method="POST" action="/registerProject">
            <select name="languageId">
                ${innerHtml}
            </select>
            <input type="text" name="name" required="추가할 프로젝트를 입력해주세요.">
            <button type="submit">추가</button>
        </form>
    `)
    } catch (e) {
        console.error(e);
        res.status(500).send('server error');
    }
});

router.post('/registerProject', async (req, res) => {
    try {
        const { languageId, name:text } = req.body;
        const name = text.trim();
        const lang = await prisma.project.findUnique({
            where: {
                languageId: parseInt(languageId),
                name,
            }
        });

        if (lang) {
            res.status(200).send('exist project');
        } else {
            await prisma.project.create({
                data: {
                    languageId: parseInt(languageId),
                    name,
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