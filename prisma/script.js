import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({log: ['query']});
// const prisma = new PrismaClient({log: ['query']}); for Logging SQL in Console

async function main() {
    // await prisma.user.deleteMany()
    // const user = await prisma.user.createMany({
    //     data: [{
    //         name: "Bluesalt",
    //         email: "bluesalt@gmail.com",
    //         birthDate: "15-12-2002",
    //         password: "Bluesalt"
    //     },
    //     {
    //         name: "GoogleWasMyIdea",
    //         email: "iwashere@gmail.com",
    //         birthDate: "10-08-2001",
    //         password: "iwasheretoo"
    //     },
    // ]
    // })

    const findUsers = await prisma.user.findMany()
    console.log(findUsers)
}

main()
    .catch((e) => {
    console.error(e.message)
})
    .finally(async() => {
        await prisma.$disconnect()
    })