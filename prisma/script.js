import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({log: ['query']});
// const prisma = new PrismaClient({log: ['query']}); for Logging SQL in Console

async function main() {
    const findPosts = await prisma.user.findMany();
    console.log(findPosts)
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