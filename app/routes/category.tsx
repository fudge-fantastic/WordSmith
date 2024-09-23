import { Link, Outlet } from "@remix-run/react";

export const meta = () => {
    return [
        {title: "Category"}, {name: "description", content:"This is the category page and you won't find anything here :)"},
    ]
} 

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