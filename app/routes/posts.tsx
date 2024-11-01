// This file is the Parent of the posts.$slug.tsx and posts._index.tsx
import { json, Outlet} from "@remix-run/react";
import { getAllPosts } from "../db/query"

export async function loader() {
    console.log("coming from posts.tsx")
    const posts = await getAllPosts()
    return json(posts)
}

export default function Posts() {
    return (
        <div className="">
            <Outlet />
        </div>
    )
}