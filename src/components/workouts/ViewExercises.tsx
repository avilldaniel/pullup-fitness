import { Exercise } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useWorkoutExers } from "../../react-query-hooks/useWorkoutExers";
import RoseLoader from "../main/RoseLoader";
import ModalWorkout from "./ModalWorkout";
import work from "../../styles/Workout.module.css";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

interface ViewExercisesProps {
  workoutName: string;
  setWorkoutName: Dispatch<SetStateAction<string>>;
  setViewWorkout: Dispatch<SetStateAction<boolean>>;
}

const ViewExercises: FC<ViewExercisesProps> = ({
  workoutName,
  setWorkoutName,
  setViewWorkout,
}) => {
  // Session
  const session = useSession();

  // States
  const [editMode, setEditMode] = useState(false);

  // Server state
  const { data: exercises, isLoading } = useWorkoutExers(workoutName);

  // Exercise rows to render
  const exerciseRow = (exercise: Exercise) => {
    return <li key={exercise.id}>{exercise.name}</li>;
  };

  /* --------------------------------DELETE HANDLER----------------------------------- */
  const queryClient = useQueryClient();
  const email = session.data?.user?.email;
  const handleDelete = async () => {
    const emptyArr: number[] = [];
    await fetch("/api/workouts/updateExercises", {
      method: "DELETE",
      body: JSON.stringify({
        emptyArr,
        workoutName,
        email,
        newName: "",
      }),
    });
    queryClient.invalidateQueries(["workouts", email]);
    setViewWorkout(false);
  };

  // Rendering
  if (isLoading) {
    return <RoseLoader />;
  }

  return (
    <div>
      <section>
        <h1>{workoutName}</h1>
        <button type="button" onClick={handleDelete}>
          Delete SVG
        </button>
      </section>
      {Array.isArray(exercises) && exercises.length ? (
        <ul>
          {exercises.map((exercise) => {
            return exerciseRow(exercise);
          })}
        </ul>
      ) : (
        <p>This workout has no exercises.</p>
      )}

      <section className={work.viewBtns}>
        <button onClick={() => setViewWorkout(false)}>Go back</button>
        <button onClick={() => setEditMode(true)}>Edit exercises</button>
      </section>

      <ModalWorkout
        workoutName={workoutName}
        setWorkoutName={setWorkoutName}
        editMode={editMode}
        setEditMode={setEditMode}
        exersLength={exercises?.length}
      />
    </div>
  );
};
export default ViewExercises;
