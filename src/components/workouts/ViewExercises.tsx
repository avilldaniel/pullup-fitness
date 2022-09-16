import { Exercise } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useWorkoutExers } from "../../react-query-hooks/useWorkoutExers";
import RoseLoader from "../main/RoseLoader";
import ModalWorkout from "./ModalWorkout";
import work from "../../styles/Workout.module.css";

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
  // States
  const [editMode, setEditMode] = useState(false);

  // Server state
  const { data: exercises, isLoading, isError } = useWorkoutExers(workoutName);

  // Exercise rows to render
  const exerciseRow = (exercise: Exercise) => {
    return <li key={exercise.id}>{exercise.name}</li>;
  };

  if (isLoading) {
    return <RoseLoader />;
  }

  return (
    <div>
      <h1>{workoutName}</h1>
      {Array.isArray(exercises) && (
        <ul>
          {exercises.map((exercise) => {
            return exerciseRow(exercise);
          })}
        </ul>
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
      />
    </div>
  );
};
export default ViewExercises;
