import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith("https://") ?? false;
const hostName = new URL(process.env.NEXTAUTH_URL || "http://localhost:3000").hostname;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  cookies: {
    sessionToken: {
      name: useSecureCookies ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: useSecureCookies, domain: hostName === "localhost" ? undefined : `.${hostName}` },
    },
    callbackUrl: {
      name: useSecureCookies ? `__Secure-next-auth.callback-url` : `next-auth.callback-url`,
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: useSecureCookies },
    },
    csrfToken: {
      name: useSecureCookies ? `__Host-next-auth.csrf-token` : `next-auth.csrf-token`,
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: useSecureCookies },
    },
    state: {
      name: useSecureCookies ? `__Secure-next-auth.state` : `next-auth.state`,
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: useSecureCookies, maxAge: 900 },
    },
    pkceCodeVerifier: {
      name: useSecureCookies ? `__Secure-next-auth.pkce.code_verifier` : `next-auth.pkce.code_verifier`,
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: useSecureCookies, maxAge: 900 },
    },
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        (session.user as any).id = user.id;
        (session.user as any).role = (user as any).role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
