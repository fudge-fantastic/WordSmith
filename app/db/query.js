import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function getAllPosts() {
    try {
        return await prisma.post.findMany({
            include: {
                author: true,  
                comments: true 
            },
            orderBy: {
                createdAt: 'desc' 
            }
        });
    } catch (error) {
        console.log("An unexpected error occurred: ", error);
        return [];
    }
}


// Post Creation
export async function createPost(userId, title, slug, summary, description, category) {
    console.log(userId, title, slug, summary, description, category);
    try {
        return await prisma.post.create({
            data: {
                authorId: userId,  // Maps userId to the Post's authorId field
                title,
                slug,
                summary,
                description,
                category,
            },
        });
    } catch (error) {
        console.log("An unexpected error occurred: ", error);
        throw new Error("Failed to create post");
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
            return { error: true, message: ("Username or password is incorrect"), status: 200 };
        } else {
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (passwordMatch) {
                console.log("User Login Successful: ", existingUser);
                return existingUser;
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

// Get post ID
export async function getPostById(id) {
    try {
        const post = await prisma.post.findUnique({
            where: { id }
        })
        if (!post) {
            console.log("Post not found with id:", id);
            return { error: true, message: ("Post not found"), status: 200 };
        }
        console.log("Post found: ", post);
        return post;

    } catch (error) {
        console.log("An unexpected error occurred: ", error.message);
        return { error: true, message: ("An unexpected error occurred: ", error.message), status: 200 };
    }    
}

// Edit Post 
export async function editPost(postId, userId, title, slug, summary, description, category) {
    try {
      return await prisma.post.update({
        where: {
          id: postId, // Use the postId to find the specific post
        },
        data: {
          authorId: userId, // Maps userId to the Post's authorId field
          title,
          slug,
          summary,
          description,
          category,
        },
      });
    } catch (error) {
      console.error("An unexpected error occurred: ", error);
      throw new Error("Failed to edit post");
    }
  }