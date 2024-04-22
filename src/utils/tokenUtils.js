const jwt = require("jsonwebtoken");
const prismaClient = require("@prisma/client");
const {PrismaClient} = require("@prisma/client/extension");
const prisma = new PrismaClient();

function generateAccessToken(data) {
    return jwt.sign(data, process.env.SECRET, {expiresIn: '15m'});
}

function generateRefreshToken(data) {
    return jwt.sign(data, process.env.SECRET, {expiresIn: '6h'});
}

async function createRefreshToken(userId, token, expireIn) {
    return await prisma.refreshToken.create({
        data: {
            userId: userId,
            refreshToken: token,
            expiresAt: new Date(Date.now() + expireIn),
        }
    });
}

async function getRefreshToken(userId) {
    return await prisma.refreshToken.findUnique({
        where: { userId: userId },
    });
}

async function updateRefreshToken(userId, newToken, newExpiresInt) {
    return await prisma.refreshToken.update({
        where: { userId: userId },
        data: {
            refreshToken: newToken,
            expiresAt: new Date(Date.now() + newExpiresInt),
        }
    });
}

async function deleteRefreshToken(userId) {
    return await prisma.refreshToken.delete({
        where: { userId: userId },
    })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};