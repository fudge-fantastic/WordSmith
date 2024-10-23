import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllPosts() {
    try {

        return await prisma.post.findMany({
            include: {
                user:true,
                comments:true
            },
            orderBy: {
                date: 'desc'
            }
        })
    } catch (error) {
        console.log("An unexpected error occurred: ", error);
        return []
    }
}

// Post Creation
export async function createPost(userId, postId, title, slug, summary, description, category) {
    try {
        return await prisma.post.create({
            userId, postId, title, slug, summary, description, category
        })
    } catch (error) {
        console.log("An unexpected error occurred: ", error);
    }
}