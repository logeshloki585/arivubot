import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { getServerSession } from "next-auth";

export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials: any) {
        try {
          console.log(credentials);
          if (!credentials?.email || !credentials.password) {
            return null;
          }

          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            return null;
          }

          if (credentials.password !== user.password) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: "user",
          };
        } catch (e) {
          console.log(e);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export async function getUser() {
  const session = await getServerSession();
  console.log(session);
  return session;
}
