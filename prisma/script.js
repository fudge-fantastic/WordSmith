import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function main() {
    // await prisma.session.deleteMany()
    await prisma.post.deleteMany({ where: { authorId: "91060d0e-0620-470c-87c1-ee29634246b1" } });
    // await prisma.user.deleteMany()
    // await prisma.post.deleteMany()
    const findUser = await prisma.user.findMany()
    const findSessions = await prisma.session.findMany()
    const findPosts = await prisma.post.findMany()
    console.log(findUser, findSessions, findPosts)
}



main()
    .catch((e) => {
    console.error(e.message)
})
    .finally(async() => {
        await prisma.$disconnect()
    })
