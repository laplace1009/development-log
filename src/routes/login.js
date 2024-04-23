const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {generateAccessToken, checkTokenAndRefresh} = require('../utils/tokenUtils');

router.get('/login', (req, res) => {
    res.send(`
    <form method="POST" action="/login">
      <input type="text" name="username" required placeholder="Enter your id">
      <input type="password" name="password" required placeholder="Enter your password">
      <button type="submit">Login</button>
    </form>
  `);
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
                res.cookie('accessToken', accessToken, { httpOnly: true, secure: false });

                req.session.userId = user.username;
                res.status(200).send('Login successful');
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

module.exports = router;