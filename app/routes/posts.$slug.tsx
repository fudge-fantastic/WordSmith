import { Outlet } from "@remix-run/react"

export async function loader({params}) {
    const slug = params.slug
    console.log(slug)
    return slug
}

export default function SinglePost() {
    return (
        <div>
            <h1>Are you lost my boi?</h1>
            <Outlet />
        </div>
    )
}