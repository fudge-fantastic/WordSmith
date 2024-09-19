import { Outlet } from "@remix-run/react";

export default function Design() {
    return (
        <div>
            <h1>This is a Design page</h1>
            <Outlet/>
        </div>
    )
}