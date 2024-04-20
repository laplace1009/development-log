const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/register', (req, res) => {
    res.send(`
    <form method="POST" action="/register">
      <input type="text" name="username" required placeholder="Enter your id">
      <input type="password" name="password" required placeholder="Enter your password">
      <button type="submit">Login</button>
    </form>
  `);
});

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            }
        });
        res.status(201).send("Register Successful")
    } catch (e) {
        console.error(e)
    }
});

module.exports = router;