// These exercises will be used as server state for right side of Modal in ModalWorkout.tsx

import { Exercise, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../../utils/db";
import { authOptions } from "../auth/[...nextauth]";

type Error = {
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Exercise[] | Error>
) => {
  // Session
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "You must be logged in." });
  }

  const { email, workoutName } = req.query;

  try {
    if (typeof email === "string" && typeof workoutName === "string") {
      const nonWoExercises = await prisma.exercise.findMany({
        where: {
          workouts: {
            none: {
              creatorEmail: { equals: email },
              name: { equals: workoutName },
            },
          },
        },
      });

      // Return array of exercises in workout
      return res.status(200).send(nonWoExercises);
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: e.message });
    }
  }
  return res.status(400).json({ error: "Invalid request." });
};

export default handler;
