import { Modal, TextInput } from "@mantine/core";
import { Dispatch, FC, SetStateAction, useState } from "react";
import work from "../../styles/Workout.module.css";

interface ModalWorkoutProps {
  workoutName: string;
  setWorkoutName: Dispatch<SetStateAction<string>>;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const ModalWorkout: FC<ModalWorkoutProps> = ({
  workoutName,
  setWorkoutName,
  editMode,
  setEditMode,
}) => {
  return (
    <Modal
      opened={editMode}
      onClose={() => setEditMode(false)}
      title={`Add or remove exercises to your workout plan.`}
      centered
      size="90%"
      style={{
        maxWidth: "30em",
        margin: "auto",
      }}
    >
      <form>
        <TextInput
          placeholder="Workout name"
          withAsterisk
          required
          value={workoutName}
          onChange={(e) => setWorkoutName(e.currentTarget.value)}
        />
        <button onClick={() => {}}>Edit exercises</button>
      </form>

      {/* These buttons will be included in the modal */}
      <section className={work.modifyBtns}>
        <button onClick={() => setEditMode(false)}>Cancel</button>
        <button type="submit">Save changes</button>
      </section>
    </Modal>
  );
};
export default ModalWorkout;
