// @ts-nocheck
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "validate",
      name: "validate",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, request: any) {
        console.log("CRED: ");
        console.log("CRED: ", credentials, request);
        // console.log("CRED: ", request);
        let authToken = "";
        try {
          if (
            credentials.email === "gtest1" &&
            credentials.password === "gtest1"
          ) {
            return credentials;
          }
        } catch (err) {
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
        user && (token.user = user)
        return token;
    },
    session: async ({ session, token }) => {
        session.user = token.user
        return session;
    }
},
  pages: {
    // signIn: "/api/auth/sigin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export { handler as GET, handler as POST };
