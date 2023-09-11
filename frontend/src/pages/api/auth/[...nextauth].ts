import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// import axios from "axios";
import { axiosAuth } from "@/lib/axios";

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions;

const nextAuthOptions: NextAuthOptionsCallback = (
  reqAuth: NextApiRequest,
  resAuth: NextApiResponse
) => {
  return {
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "your email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const loginData = {
            email: credentials?.email,
            password: credentials?.password,
          };
          // Add logic here to look up the user from the credentials supplied
          const res = await axiosAuth.post(`/auth/login`, loginData, {
            withCredentials: true,
          });
          if (res.headers) {
            const cookies = res.headers["set-cookie"] || [];
            resAuth.setHeader("Set-Cookie", cookies);
          }
          const { data } = res;
          const user = data;
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        },
      }),
    ],
    pages: {
      signIn: "/auth/signin",
    },
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token, user }) {
        session.user = token as any;
        return session;
      },
    },
  };
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default Auth;
