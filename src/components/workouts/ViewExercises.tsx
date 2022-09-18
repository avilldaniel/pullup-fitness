import { Exercise } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useWorkoutExers } from "../../react-query-hooks/useWorkoutExers";
import RoseLoader from "../main/RoseLoader";
import ModalWorkout from "./ModalWorkout";
import work from "../../styles/Workout.module.css";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "@mantine/core";

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
  const [delModal, openDelModal] = useState(false);

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
    openDelModal(false);
  };

  // Rendering
  if (isLoading) {
    return <RoseLoader />;
  }

  return (
    <div>
      <section>
        <h1>{workoutName}</h1>

        {/* Handle delete */}
        <button type="button" onClick={() => openDelModal(true)}>
          Delete SVG
        </button>
        <Modal
          opened={delModal}
          onClose={() => openDelModal(false)}
          title="Are you sure you want to delete this workout?"
          withCloseButton={false}
          centered
        >
          {/* {invalidDelete && <p>Cannot delete record. Try refreshing.</p>} */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleDelete} variant="filled" color="red">
              Yes.
            </Button>
            <Button
              onClick={() => openDelModal(false)}
              variant="subtle"
              color="white"
            >
              No.
            </Button>
          </div>
        </Modal>
      </section>
      {Array.isArray(exercises) && exercises.length ? (
        <ul>
          {exercises.map((exercise) => {
            return exerciseRow(exercise);
          })}
        </ul>
      ) : (
        <p>This workout currently has no exercises.</p>
      )}

      <section className={work.viewBtns}>
        <button
          onClick={() => {
            setViewWorkout(false);
            queryClient.invalidateQueries(["workouts", email]);
          }}
        >
          Go back
        </button>
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
