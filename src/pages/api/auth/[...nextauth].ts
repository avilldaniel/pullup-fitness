import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../utils/db";
import { createTransport } from "nodemailer";
import { html, text } from "../../../utils/customVerificationReq";

const port =
  typeof process.env.EMAIL_SERVER_PORT === "number"
    ? process.env.EMAIL_SERVER_PORT
    : 465;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authenitcation providers
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        // port: port,
        port,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,

      // OTP
      async generateVerificationToken() {
        // Declare a digits variable
        // which stores all digits
        var digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      },
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
        token,
      }) {
        /* your function */
        const { host } = new URL(url);
        const transport = createTransport(server);
        const result = await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          text: text({ token, host }),
          html: html({ token, host }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
  ],
  // ...add callbacks
  pages: {
    signIn: "/signin",
  },
};

export default NextAuth(authOptions);
