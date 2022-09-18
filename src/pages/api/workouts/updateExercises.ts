import { Exercise, Prisma, Workout } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../../utils/db";
import { authOptions } from "../auth/[...nextauth]";

type Data = {
  message?: string;
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Exercise[] | Workout | Data>
) => {
  // Session
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // Pull array of exercise IDs, workout name, and user email
  const { arr, workoutName, email, newName } = JSON.parse(req.body);

  // If HTTP method is DELETE, use id and delete
  if (req.method === "DELETE") {
    const deleted = await prisma.workout.delete({
      where: {
        name_creatorEmail: {
          name: workoutName,
          creatorEmail: email,
        },
      },
    });
    return res.status(200).send(deleted);
  }

  // Convert to array of objects of exercise IDs [{id: 1}, {id: 2}, {id: 3}, etc.]
  const idArr = arr.map((id: number) => {
    return { id };
  });

  try {
    // Disconnect all exercises currently connected to workout
    const workoutExercises = await prisma.workout.update({
      where: {
        name_creatorEmail: {
          creatorEmail: email,
          name: workoutName,
        },
      },
      data: {
        exercises: {
          set: idArr,
        },
        name: {
          set: newName,
        },
      },
      select: {
        exercises: true,
      },
    });

    // Return updated array of exercises
    return res.status(200).send(workoutExercises.exercises);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: e.message });
    }
  }
  return res.status(400).json({ error: "Invalid request." });
};

export default handler;
