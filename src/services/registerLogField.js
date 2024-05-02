const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function getLanguages() {
    return prisma.language.findMany()
}


async function getProject(id) {
    return prisma.project.findMany({
        where: {
            languageId: id,
        }
    })
}

module.exports = {
    getLanguages,
    getProject,
}