import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({log: ['query']});
// const prisma = new PrismaClient({log: ['query']}); for Logging SQL in Console

async function main() {
    // await prisma.user.deleteMany()
    
    // const findUser = await prisma.user.findMany()
    // const user = await prisma.user.create({
    //     data: {
    //         name: "Aaditya",
    //         email: "bluesalt3040@test.com",
    //         password: "password9090",
    //         role: "ADMIN",
    //     }
    // })
    // console.log(findUser)

    // const existingUser = await prisma.user.findUnique({
    //     where: { email: "sp@gmail.com" }
    // });
    // console.log(existingUser)
    
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