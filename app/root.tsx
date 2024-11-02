import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import {NextUIProvider} from "@nextui-org/react";
import { redirect } from "react-router";

import "./tailwind.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { destroySession, getSession } from "./sessions_db";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({request}: {request: Request}) {
  const userSession = await getSession(request.headers.get("cookie"));
  console.log("SessionData:", userSession.data);
  if(userSession.has("userId")) {
    if(new Date(userSession.get("expiresAt")) > new Date()) {
      // console.log(new Date(userSession.get("expiresAt")) , new Date(), new Date(userSession.get("expiresAt")) < new Date())
      return json(true)
    }
    return redirect("/login", { headers: { "Set-Cookie": await destroySession(userSession) } });
  }
  return json(false)
}

export function Layout() {
  const isLoggedIn = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5038091624857202"
     crossOrigin="anonymous"></script>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <NextUIProvider >
            <NavBar isLoggedIn={isLoggedIn} />
            <ScrollRestoration />
            <Scripts />
            <Outlet />
            <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}