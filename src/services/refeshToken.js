const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createRefreshToken(userId, token, expireIn) {
    return prisma.refreshToken.create({
        data: {
            userId,
            refreshToken: token,
            expiresAt: new Date(Date.now() + expireIn),
        }
    });
}

async function getRefreshToken(userId) {
    return prisma.refreshToken.findUnique({
        where: { userId },
    });
}

async function updateRefreshToken(userId, newToken, newExpiresInt) {
    return prisma.refreshToken.update({
        where: { userId },
        data: {
            refreshToken: newToken,
            expiresAt: new Date(Date.now() + newExpiresInt),
        }
    });
}

async function deleteRefreshToken(userId) {
    return prisma.refreshToken.delete({
        where: { userId },
    })
}

module.exports = {
    createRefreshToken,
    updateRefreshToken,
    getRefreshToken,
    deleteRefreshToken,
}