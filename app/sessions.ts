// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
  userId: string;
  userName: string;
  userEmail: string;
};

type SessionFlashData = {
  error: string;
};

// Read, create and delete the session
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",
        // all of these are optional, localhost for now
        domain: "localhost",
        // Expires can also be set (although maxAge overrides it when used in combination)
        httpOnly: true,
        maxAge: 90,
        path: "/",
        sameSite: "lax",
        secrets: [process.env.SESSION_SECRET ?? 'default-secret'], 
        secure: true,
      },
    }
  );

export { getSession, commitSession, destroySession };
