import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions_db";

export async function loader({request}: {request: Request}) {
    const userSession = await getSession(request.headers.get("cookie"));
    return redirect("/login", { headers: { "Set-Cookie": await destroySession(userSession) } });
}


export default function Logout() {
    return (    
        <div>
            <h1 className="text-3xl font-bold">You&apos;ve been Logged Out</h1>
        </div>
    )
}