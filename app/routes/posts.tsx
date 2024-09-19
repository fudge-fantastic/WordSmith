import { Outlet } from "@remix-run/react";


export default function Posts() {
    return (
        <div>
            <h1>This is a Posts page</h1>
            <Outlet />
        </div>
    )
}