const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {createRefreshToken, updateRefreshToken, getRefreshToken} = require("../services/refeshToken");
const { expireIn } = require("./literals");

async function generateAccessToken(userId) {
    return jwt.sign({ userId }, process.env.ACCESS_SECRET_KEY, {expiresIn: '1h'});
}

async function generateRefreshToken(userId) {
    return jwt.sign({ userId }, process.env.REFRESH_SECRET_KEY, {expiresIn: '6M'});
}

async function checkTokenAndRefresh(userId) {
    try {
        const tokenData = await getRefreshToken(userId);
        if (!tokenData) {
            const refreshToken = await generateRefreshToken(userId);
            await createRefreshToken(userId, refreshToken, expireIn);
            return refreshToken
        }

        const now = new Date();
        const expiration = new Date(tokenData.expiresAt);

        if (expiration > now) {
            return tokenData;
        } else {
            const newToken = await generateRefreshToken(userId);
            await updateRefreshToken(userId, newToken, expireIn);
            return newToken
        }
    } catch (e) {
        throw e;
    }


}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    checkTokenAndRefresh,
};