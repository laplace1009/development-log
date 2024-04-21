const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const {generateAccessToken} = require("../utils/tokenUtils");
const {authenticateToken} = require("../middleware/authMiddleware");

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "Protected data", user: req.user });
});

router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.session;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        const newAccessToken = generateAccessToken(user);
        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true });
        res.status(200).send('Access Token refreshed');
    })
})

module.exports = router;