const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const {generateAccessToken} = require("../utils/tokenUtils");

router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.session;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, id) => {
        if (err) return res.sendStatus(403);
        const newAccessToken = generateAccessToken(id);
        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: false });
        res.status(200).send('Access Token refreshed');
    })
})

module.exports = router;