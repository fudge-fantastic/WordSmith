// This file is the Parent of the posts.$slug.tsx and posts._index.tsx
import { Outlet } from "@remix-run/react";

export default function Posts() {
    return (
        <div>
            <Outlet />
        </div>
    )
}