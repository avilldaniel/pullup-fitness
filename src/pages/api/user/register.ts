import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { prisma } from "../../../utils/db";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name, username } = JSON.parse(req.body);
  try {
    // Create new user
    const newUser = await prisma.appUser.create({
      data: {
        email,
        name,
        username,
      },
    });

    // Add 3 default workouts for user
    await prisma.workout.create({
      data: {
        creatorName: newUser.username,
        name: "Push",
        exercises: {
          connect: [
            {
              name_muscleGrp_creator: {
                name: "Barbell Bench Press",
                muscleGrp: "CHEST",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Push-ups",
                muscleGrp: "CHEST",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Dips",
                muscleGrp: "CHEST",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Skullcrusher",
                muscleGrp: "TRICEP",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Dumbbell Overhead Extension",
                muscleGrp: "TRICEP",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Cable Push-down",
                muscleGrp: "TRICEP",
                creator: "admin",
              },
            },
          ],
        },
      },
    });
    await prisma.workout.create({
      data: {
        creatorName: newUser.username,
        name: "Pull",
        exercises: {
          connect: [
            {
              name_muscleGrp_creator: {
                name: "Bent-over Row",
                muscleGrp: "BACK",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Pull-ups",
                muscleGrp: "BACK",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Face Pull",
                muscleGrp: "BACK",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Dumbbell Curl",
                muscleGrp: "BICEP",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Hammer Curl",
                muscleGrp: "BICEP",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Cable Curl",
                muscleGrp: "BICEP",
                creator: "admin",
              },
            },
          ],
        },
      },
    });
    await prisma.workout.create({
      data: {
        creatorName: newUser.username,
        name: "Legs",
        exercises: {
          connect: [
            {
              name_muscleGrp_creator: {
                name: "Back Squat",
                muscleGrp: "LEGS",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Deadlift",
                muscleGrp: "LEGS",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Leg Curl",
                muscleGrp: "LEGS",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Leg Extension",
                muscleGrp: "LEGS",
                creator: "admin",
              },
            },
            {
              name_muscleGrp_creator: {
                name: "Standing Calf Raise",
                muscleGrp: "LEGS",
                creator: "admin",
              },
            },
          ],
        },
      },
    });

    return res.status(200).json(newUser);
  } catch (e) {
    // Handle error when data does not conform to Zod schema
    // error handling is taken from Zod's docs
    if (e instanceof z.ZodError) {
      console.log(e.issues);
      return res.status(400).send(e.issues);
    }

    // Handle error when invalid data is used in prisma schema query
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation. A new user cannot be created."
        );
        return res.status(400).send(e.meta);
      }
    }
    return res.status(400).send(e);
  }
}
