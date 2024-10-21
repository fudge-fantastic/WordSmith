import { json } from "@remix-run/react"
import { getAllPosts } from "../db/query"

export async function loader() {
    const posts = await getAllPosts()
    console.log({"Data is being fetched from the DB": posts})
    return json({ success: true, posts })
}

export default function demo() {
    return (
        <div>
            <h1 className="text-xl text-center">This is the demo page, WIP</h1>
        </div>
    )
}