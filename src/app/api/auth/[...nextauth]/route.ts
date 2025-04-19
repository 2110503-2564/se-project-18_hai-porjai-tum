<<<<<<< HEAD
import {type Session} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/libs/prisma";
import NextAuth from "next-auth/next";
import { type AuthOptions } from "next-auth/";

const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: any }) {
      if (session.user) {
        (session.user as any).id = user.id;
        (session.user as any).role = user.role;
      }
      return session;
    },
  },
  session: {
    strategy: "database",
  },
};


export default NextAuth(options);
=======
import NextAuth from "next-auth";
import { authOptions } from "./authOptions";
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
