// React-Query hook to fetch user's non-exercises within specific workout

import { Exercise } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useWorkoutNonExers = (workoutName: string) => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  return useQuery<Exercise[] | string>(
    ["woNonExers", email, workoutName],
    async () => {
      const res = await fetch(
        `/api/workouts/fetchNonExers?email=${email}&workoutName=${workoutName}`
      );
      const nonExercises = await res.json();
      return nonExercises;
    }
  );
};
