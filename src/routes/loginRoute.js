const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {generateAccessToken, checkTokenAndRefresh} = require('../utils/tokenUtils');

router.get('/login', async (req, res) => {
    await res.sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'login.html'))
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const accessToken = await generateAccessToken(user.id);
                const refreshToken = await checkTokenAndRefresh(user.id)
                req.session.refreshToken = refreshToken;

                res.cookie('accessToken', accessToken, { httpOnly: false, secure: false });

                req.session.userId = user.username;
                res.redirect('/')
            } else {
                res.status(401).send('Invalid Credentials');
            }
        } else {
            res.status(401).send('Invalid Credentials');
        }
    } catch (e) {
        console.error(e);
        res.status(500).send('Sever Error');
    }
});

router.get('/logout', async (req, res) => {
    res.clearCookie('accessToken');
    res.redirect('/')
})

module.exports = router;