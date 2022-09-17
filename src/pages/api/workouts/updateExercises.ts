import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../../utils/db";
import { authOptions } from "../auth/[...nextauth]";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Session
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  // Pull array of exercise IDs, workout name, and user email
  const { arr, workoutName, email } = JSON.parse(req.body);
  // console.log(req.body);
  console.log({ arr, workoutName, email });
  // Function for index upsert
  const idUpsert = async (exerId: number) => {
    await prisma.workout.update({
      where: {
        name_creatorEmail: {
          creatorEmail: email,
          name: workoutName,
        },
      },
      // create: {
      //   exercises: {

      //   }
      // },
      data: {
        exercises: {
          connect: {
            id: exerId,
          },
        },
      },
    });
  };

  try {
    if (Array.isArray(arr)) {
      arr.forEach((exerId) => {
        idUpsert(exerId);
      });
    }
    // Return ok status
    return res.status(200);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: e.message });
    }
  }
  return res.status(400).json({ error: "Invalid request." });
};

export default handler;
