import { createSessionStorage } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function createDatabaseSessionStorage({ cookie }) {
  return createSessionStorage({
    cookie,
    async createData(data, expires) {
      const { userId } = data;
      if (!userId) throw new Error("userId is required to create a session.");

      const session = await prisma.session.create({
        data: {
          userId: userId,
          expiresAt: expires ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
      return session.id;
    },

    async readData(id) {
      const session = await prisma.session.findUnique({
        where: { id },
        include: { user: true },
      });
      if (!session) return null;
      return {userId: session.user.id, userName: session.user.name, userEmail: session.user.email, expiresAt: session?.expiresAt}
    },

    async updateData(id, data, expires) {
      await prisma.session.update({
        where: { id },
        data: {
          expiresAt: expires, 
        },
      });
    },

    async deleteData(id) {
      await prisma.session.delete({
        where: { id },
      });
    },
  });
}

export const { getSession, commitSession, destroySession } = createDatabaseSessionStorage({
  cookie: {
    name: "__ws_session",
    domain: process.env.DOMAIN,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET ?? "default-secret"], // Ensure SESSION_SECRET is set in .env
    secure: true,
  },
});