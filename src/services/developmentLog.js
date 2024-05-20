const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const getUser = async (username) => prisma.user.findUnique({
    where: { username },
});

const createUser = async (userName, hashedPassword) =>
    await prisma.user.create({
        data: {
            username: userName,
            password: hashedPassword,
        }
    });

const createLanguage = async (language) =>
    await prisma.language.create({
        data: {
            language,
        }
    })

const getLanguage = async (language) =>
    prisma.language.findUnique({
        where: {language},
    });

const getLanguageListWithProjectList = async () => await prisma.language.findMany({
    include: {
        project: true,
    }
})

const getLanguageList = async () => prisma.language.findMany()

const getProject = async (languageId) =>
    prisma.project.findFirst({
        where: {
            languageId: parseInt(languageId),
            name,
        }
    });

const getProjectList = async () => prisma.project.findMany()

const createProject = async (languageId, name) =>
    prisma.project.create({
        data: {
            languageId: parseInt(languageId),
            name,
        }
    })

const getDevelopmentLog = async (id) =>
    prisma.developmentLog.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            text: true,
            projectId: true,
            project: {
                select: {
                    name: true,
                    languageId: true,
                    language: {
                        select: {
                            language: true,
                        }
                    }
                }
            }
        }
    });

const getDevelopmentLogList = async (id) =>
    prisma.developmentLog.findMany({
        where: { projectId: id },
        orderBy: {
            id: 'asc',
        }
    })

const createDevelopmentLog = async (project, editor) =>
    await prisma.developmentLog.create({
        data: {
            projectId: parseInt(project),
            text: editor,
        }
    })

const modifyDevelopmentLog = async (id, projectId, text) =>
    await prisma.developmentLog.update({
        where: { id },
        data: {
            projectId,
            text,
        }
    });

module.exports = {
    createUser,
    getUser,
    createLanguage,
    getLanguageList,
    getLanguage,
    getLanguageListWithProjectList,
    createProject,
    getProject,
    getProjectList,
    createDevelopmentLog,
    getDevelopmentLog,
    getDevelopmentLogList,
    modifyDevelopmentLog,
}