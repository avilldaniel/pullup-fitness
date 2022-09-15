import { Prisma, Workout } from "@prisma/client";
import { prisma } from "../../../utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type Message = {
  message?: string;
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Workout[] | Message>
) => {
  // Verify session
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // Fetch workouts using email
  const { email } = req.query;
  if (typeof email === "string") {
    try {
      const workouts = await prisma.workout.findMany({
        where: {
          creatorEmail: { equals: email },
        },
        orderBy: {
          id: "desc",
        },
      });

      // Return array of workouts
      return res.status(200).send(workouts);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ error: e.message });
      }
    }
  }
  res.status(400).json({ message: "Invalid request." });
};

export default handler;
