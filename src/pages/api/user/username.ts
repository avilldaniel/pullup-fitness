// API route called when user attemps to log in with email
// if username exists, set it in client state, return status ok
// else if username does not exist, return status bad

import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../utils/db";

type Data = {
  username?: string;
  error?: string;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // Get email from client form
  const { emailInput } = req.query;

  if (emailInput && typeof emailInput === "string") {
    // Fetch username using email
    try {
      const username = await prisma.appUser.findFirstOrThrow({
        where: {
          email: {
            equals: emailInput,
          },
        },
        select: {
          username: true,
        },
      });

      // Return username
      return res.status(200).json(username);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(e.message);
        return res.status(400).json({ error: e.message });
      }
      console.error(e);
      return res.status(400).json({ message: "Invalid request." });
    }
  }
};

export default handler;
