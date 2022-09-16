import {
  Modal,
  TextInput,
  TransferList,
  TransferListData,
  TransferListItem,
} from "@mantine/core";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useWorkoutExers } from "../../react-query-hooks/useWorkoutExers";
import { useWorkoutNonExers } from "../../react-query-hooks/useWorkoutNonExers";
import work from "../../styles/Workout.module.css";
import RoseLoader from "../main/RoseLoader";

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
  // Client state
  const [data, setData] = useState<TransferListData>([[], []]);

  // Server state
  const { data: exers, isLoading: exersLoading } = useWorkoutExers(workoutName);
  const { data: nonExers, isLoading: nonExersLoading } =
    useWorkoutNonExers(workoutName);

  /* --------------------------------TRANSFER LIST DATA----------------------------------- */
  let exersValues: TransferListItem[];
  let nonExersValues: TransferListItem[];
  let initialValues: TransferListData = [[], []];
  if (Array.isArray(exers) && Array.isArray(nonExers)) {
    exersValues = exers.map((exercise) => {
      return {
        value: exercise.name,
        label: exercise.name,
        group: exercise.muscleGrp as string,
      };
    });
    nonExersValues = nonExers.map((exercise) => {
      return {
        value: exercise.name,
        label: exercise.name,
        group: exercise.muscleGrp as string,
      };
    });
    initialValues = [exersValues, nonExersValues];

    // After fetching the data and converting it to a list,
    // set client state data with initial values iff data is currently empty
    if (!data[0].length && !data[0].length) {
      setData(initialValues);
    }
  }

  /* --------------------------------TRANSFER ITEM COMPONENT-------------------------- */

  /* --------------------------------SUBMIT HANDLER----------------------------------- */
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);

    console.log("save changes clicked. idk");
  };

  // While data is currently being fetched
  if (exersLoading && nonExersLoading) {
    return <RoseLoader />;
  }

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
        // margin: "0 auto",
        // height: "40em",
      }}
    >
      <form onSubmit={handleSave}>
        <TextInput
          placeholder="Workout name"
          withAsterisk
          required
          value={workoutName}
          onChange={(e) => setWorkoutName(e.currentTarget.value)}
        />

        {/* Mantine transferList here */}
        <TransferList
          value={data}
          onChange={setData}
          searchPlaceholder="Search..."
          nothingFound="Nothing here"
          showTransferAll={false}
          listHeight={250}
          breakpoint="sm"
          titles={["Current exercises", "Exercises to add"]}
          filter={(query, item) =>
            item.label.toLowerCase().includes(query.toLowerCase().trim()) ||
            item.group!.toLowerCase().includes(query.toLowerCase().trim())
          }
        />

        {/* These buttons will be included in the modal */}
        <section className={work.modifyBtns}>
          <button onClick={() => setEditMode(false)}>Cancel</button>
          <button type="submit">Save changes</button>
        </section>
      </form>
    </Modal>
  );
};
export default ModalWorkout;
