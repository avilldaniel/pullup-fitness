// React-Query hook to fetch user's exercises within specific workout

import { Exercise } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useWorkoutExers = (workoutName: string) => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  return useQuery<Exercise[] | string>(
    ["woExercises", email, workoutName],
    async () => {
      const res = await fetch(
        `/api/workouts/fetchExercises?email=${email}&workoutName=${workoutName}`
      );
      const exercises = await res.json();
      return exercises;
    }
  );
};
