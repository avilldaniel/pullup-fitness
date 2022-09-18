import { Prisma, Workout } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../../utils/db";
import { authOptions } from "../auth/[...nextauth]";

type Data = {
  message?: string;
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Workout | Data>
) => {
  // Session
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  const { name, email } = JSON.parse(req.body);

  try {
    const createdWorkout = await prisma.workout.create({
      data: {
        name,
        creatorEmail: email,
      },
    });

    return res.status(200).send(createdWorkout);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: e.message });
    }
    return res.status(400).json({ error: "Invalid Request" });
  }
};

export default handler;
