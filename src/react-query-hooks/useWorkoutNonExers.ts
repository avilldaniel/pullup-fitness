// React-Query hook to fetch user's non-exercises within specific workout

import { Exercise } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useWorkoutNonExers = (woName: string) => {
  const { data: session } = useSession();
  return useQuery<Exercise[] | string>(
    ["woNonExers", session?.user?.email, woName],
    async () => {
      const res = await fetch(
        `/api/workouts/fetchNonExers?email=${session?.user?.email}&woName=${woName}`
      );
      const nonExercises = await res.json();
      return nonExercises;
    }
  );
};
