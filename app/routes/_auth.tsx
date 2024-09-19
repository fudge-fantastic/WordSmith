import { Outlet } from "@remix-run/react";

export default function AuthPage() {
    return (
    <div>
        Auth page
        <Outlet />
    </div>
    );
}