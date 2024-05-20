const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authMiddleware = require("../middleware/authMiddleware");
const {createUser} = require("../services/developmentLog");

router.get('/register-user', (req, res) => {
    res.send(`
    <form method="POST" action="/register-user">
      <input type="text" name="username" required placeholder="Enter your id">
      <input type="password" name="password" required placeholder="Enter your password">
      <button type="submit">Login</button>
    </form>
  `);
});

router.post('/register-user', authMiddleware, async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username, hashedPassword);
        res.status(201).send("Register Successful")
    } catch (e) {
        console.error(e)
    }
});

module.exports = router;