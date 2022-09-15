import { Exercise } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useWorkoutExers } from "../../react-query-hooks/useWorkoutExers";
import RoseLoader from "../main/RoseLoader";
import ModalWorkout from "./ModalWorkout";

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
      {Array.isArray(exercises) && (
        <ul>
          {exercises.map((exercise) => {
            return exerciseRow(exercise);
          })}
        </ul>
      )}

      <button onClick={() => setViewWorkout(false)}>Go back</button>

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
