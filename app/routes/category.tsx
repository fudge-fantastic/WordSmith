import { Link, Outlet } from "@remix-run/react";

export default function MainCategory() {
    return (
        <div>
            <div className = "text-center font-semibold">
                <p>Well hello there stranger, this is the Category page</p>
                <Link to="http://localhost:5173">Return Home?</Link>
                <Outlet />
            </div>
        </div>
    )
}