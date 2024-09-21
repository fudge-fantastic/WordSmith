import { Outlet } from "@remix-run/react";

export default function MainCategory() {
    return (
        <div>
            <h1>This is a Category page</h1>
            <Outlet />
        </div>
    )
}