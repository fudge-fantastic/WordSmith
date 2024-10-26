import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

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

// User Creation, now goto login.tsx
export async function createUser(name, email, password, bio) {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        
        if (existingUser) {
            console.log("Existing User Found: ", existingUser);
            throw new Error("User already exists, try logging in instead.");
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
        return { error: true, message: error.message };
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
            throw new Error("User does not exist");
        } else {
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (passwordMatch) {
                console.log("User Login Successful: ", existingUser);
                return existingUser; // Optionally return full user data
            } else {
                console.log("Password does not match for user:", existingUser);
                // throw new Error("Invalid password");
                return { error: true, message: "Invalid password" };
            }
        }
    } catch (error) {
        console.log("An unexpected error occurred: ", error.message);
        return { error: true, message: ("An unexpected error occurred: ", error.message) };
    }
}