import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function getAllPosts() {
    // try {
    //     return await prisma.post.findMany({
    //         include: {
    //             user:true,
    //             comments:true
    //         },
    //         orderBy: {
    //             date: 'desc'
    //         }
    //     })
    // } catch (error) {
    //     console.log("An unexpected error occurred: ", error);
    //     return []
    // }
    return []
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

// User Creation, now goto login.tsx
export async function createUser(name, email, password, bio) {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        
        if (existingUser) {
            console.log("Existing User Found: ", existingUser);
            return { error: true, message: ("User already exists, try logging in instead"), status: 400 };
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await prisma.user.create({
                data: { name, email, password: hashedPassword, bio }
            });
            console.log("New User Created: ", newUser);
            return newUser;
        }
    } catch (error) {
        console.log("An unexpected error occurred: ", error.message);
        return { error: true, message: ("An unexpected error occurred: "  + error.message), status: 400 };
    }
}

// User Login
export async function loginUser(email, password) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!existingUser) {
            console.log("User not found with email:", email);
            // this one will halt the execution
            return { error: true, message: ("Username or password is incorrect"), status: 200 };
        } else {
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (passwordMatch) {
                console.log("User Login Successful: ", existingUser);
                return existingUser; // Optionally return full user data
            } else {
                console.log("Password does not match for user:", existingUser);
                return { error: true, message: ("Username or password is incorrect"), status: 200 };
            }
        }
    } catch (error) {
        console.log("An unexpected error occurred: ", error.message);
        return { error: true, message: ("An unexpected error occurred: ", error.message), status: 200 };
    }
}