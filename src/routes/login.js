const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id;
            res.send('Login successfully');
        } else {
            res.status(401).send('Invalid Credentials');
        }
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;