import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../utils/db";

// const urlAfterLogin = '/u/stats';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authenitcation providers
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // ...add options
  ],
  pages: {
    signIn: "/signin",
  },
  // callbacks: {
  //   redirect({}): {
  //     return ;
  //   },
  // }I
});
