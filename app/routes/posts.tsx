// This file is the Parent of the posts.$slug.tsx and posts._index.tsx
import { useLoaderData, Outlet} from "@remix-run/react";
import { getAllPosts } from "../db/query"
import type { Posts } from "../shared/types";
import { json } from "@remix-run/node";

export async function loader() {
    try {
        const posts = await getAllPosts()
        return json(posts || [])
    } catch (error) {
        throw new Response("Failed to load all posts", {status : 500})
    }
}

export default function Posts() {
    const data = useLoaderData<Posts[]>() || []; 
    return (
        <div>
            <Outlet  context={{ sharedData: data }} />
        </div>
    )
}

export function ErrorBoundary({error}: Readonly<{error: Error}>) {
    return (
        <div>
            <h2 className="text-3xl font-bold">Something went wrong</h2>
            <p>{error.message || "Please Try Again"}</p>
        </div>
    )
}