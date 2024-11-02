import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log: ['query']});
// const prisma = new PrismaClient({log: ['query']}); for Logging SQL in Console

async function main() {
    // await prisma.session.deleteMany()
    // await prisma.user.deleteMany()
    const findUser = await prisma.user.findMany()
    const findSessions = await prisma.session.findMany()
    console.log(findUser, findSessions)
}



main()
    .catch((e) => {
    console.error(e.message)
})
    .finally(async() => {
        await prisma.$disconnect()
    })


// For post:
// title slug summary description category author, are must!
