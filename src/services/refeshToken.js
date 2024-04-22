const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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