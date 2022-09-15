import { Button, ScrollArea } from "@mantine/core";
import { FC, useState } from "react";
import work from "../../styles/Workout.module.css";
import rose from "../../styles/RoseBtn.module.css";
import { IconArrowRight } from "@tabler/icons";
import { Workout } from "@prisma/client";
import { useFetchWorkouts } from "../../react-query-hooks/useFetchWorkouts";
import RoseLoader from "../main/RoseLoader";
import ViewExercises from "./ViewExercises";

interface rowProps {
  workout: Workout;
  index: number;
}

const WorkoutComp: FC = () => {
  // Fetch workouts
  const { data: workouts, isLoading, isError } = useFetchWorkouts();

  // State
  const [workoutName, setWorkoutName] = useState<string>("");
  const [viewWorkout, setViewWorkout] = useState(false);

  // Rows to render
  const workoutRow = ({ workout, index }: rowProps) => {
    return (
      <li key={workout.id} className={work.row}>
        <button
          onClick={() => {
            setViewWorkout(true);
            setWorkoutName(workout.name);
          }}
          style={{
            borderTop: index === 0 ? "0" : "2px solid whitesmoke",
          }}
        >
          <h3>{workout.name}</h3>
          <IconArrowRight />
        </button>
      </li>
    );
  };

  if (isLoading) {
    return <RoseLoader />;
  }

  return (
    <div className={work.container}>
      <main>
        {!viewWorkout ? (
          <>
            {/* List of workouts */}
            <ScrollArea scrollbarSize={4} className={work.scroll}>
              <ul>
                {Array.isArray(workouts) &&
                  workouts.map((workout, index) => {
                    return workoutRow({ workout, index });
                  })}
              </ul>
            </ScrollArea>

            {/* Create workout */}
            <Button
              onClick={() => {
                setViewWorkout(true);
                setWorkoutName("");
              }}
              className={rose.btn}
            >
              Create workout
            </Button>
          </>
        ) : (
          // View exercises of workout
          <ScrollArea scrollbarSize={4} className={work.scroll}>
            <ViewExercises
              workoutName={workoutName}
              setWorkoutName={setWorkoutName}
              setViewWorkout={setViewWorkout}
            />
          </ScrollArea>
        )}
      </main>
    </div>
  );
};
export default WorkoutComp;
