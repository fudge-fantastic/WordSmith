// This file is the Parent of the posts.$slug.tsx and posts._index.tsx
import { json, Outlet } from "@remix-run/react";
import { getAllPosts } from "../db/query"

export async function loader() {
    const posts = await getAllPosts()
    console.log("coming from posts.tsx")
    // console.log({"Data is being fetched from the DB (posts.tsx)": posts})
    // return json({ success: true, posts })
    return json(posts)
}

export default function Posts() {
    return (
        <div>
            <Outlet />
        </div>
    )
}