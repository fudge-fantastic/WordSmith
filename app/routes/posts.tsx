// This file is the Parent of the posts.$slug.tsx and posts._index.tsx
import { useLoaderData, json, Outlet} from "@remix-run/react";
import { getAllPosts } from "../db/query"
import type { Posts } from "../shared/types";

export async function loader() {
    console.log("coming from posts.tsx")
    const posts = await getAllPosts()
    return json(posts || [])
}

export default function Posts() {
    const data = useLoaderData<Posts[]>() || []; 
    return (
        <div>
            <Outlet  context={{ sharedData: data }} />
        </div>
    )
}