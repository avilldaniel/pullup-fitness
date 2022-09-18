import {
  Modal,
  TextInput,
  TransferList,
  TransferListData,
  TransferListItem,
} from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
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
  exersLength: number | undefined;
}

const ModalWorkout: FC<ModalWorkoutProps> = ({
  workoutName,
  setWorkoutName,
  editMode,
  setEditMode,
  exersLength,
}) => {
  // Session
  const session = useSession();

  // Client state
  const [data, setData] = useState<TransferListData>([[], []]);
  const [newName, setNewName] = useState<string>(workoutName);

  // Server state
  const { data: exers, isLoading: exersLoading } = useWorkoutExers(workoutName);
  const { data: nonExers, isLoading: nonExersLoading } =
    useWorkoutNonExers(workoutName);

  /* --------------------------------TRANSFER LIST DATA----------------------------------- */
  let exersValues: TransferListItem[];
  let nonExersValues: TransferListItem[];
  let initialValues: TransferListData = [[], []];
  let previousState: TransferListData = [[], []];
  let previousName: string;
  if (Array.isArray(exers) && Array.isArray(nonExers)) {
    exersValues = exers.map((exercise) => {
      return {
        value: exercise.id.toLocaleString(),
        label: exercise.name,
        group: exercise.muscleGrp as string,
      };
    });
    nonExersValues = nonExers.map((exercise) => {
      return {
        value: exercise.id.toLocaleString(),
        label: exercise.name,
        group: exercise.muscleGrp as string,
      };
    });
    initialValues = [exersValues, nonExersValues];

    // Set client state data with initial values iff
    // data has not been set yet (data = [[], []])
    if (!data[0].length && !data[1].length) {
      previousName = workoutName;
      // If workout currently has exercises in it
      // data = [userExercises, restOfExercises]
      if (exersLength) {
        setData(initialValues);
        previousState = data;
      }

      // Else, if workout currently has no exercises
      // data = [empty, allExercises]
      else if (!exersLength) {
        setData([[], nonExersValues]);
      }
    }
  }

  /* --------------------------------MUTATION----------------------------------- */
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (arr: number[]) => {
      return fetch("/api/workouts/updateExercises", {
        method: "post",
        body: JSON.stringify({
          arr,
          workoutName,
          newName: newName.length > 30 ? newName.slice(0, 29) : newName,
          email: session.data?.user?.email,
        }),
      });
    },
    {
      onSuccess: async (data) => {
        console.log("trigger onSuccess");
        const arr = await data.json();
        const email = session?.data?.user?.email;
        setWorkoutName(newName.length > 30 ? newName.slice(0, 29) : newName);
        queryClient.setQueryData(["woExercises", email, workoutName], () => {
          return arr;
        });
        setEditMode(false);
      },
      onSettled: () => {
        console.log("trigger onSettled");
        const email = session?.data?.user?.email;
        queryClient.invalidateQueries(["woNonExers", email, workoutName]);
        queryClient.invalidateQueries(["woExercises", email, workoutName]);
      },
    }
  );

  /* --------------------------------SUBMIT HANDLER----------------------------------- */
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Map array of exercise IDs to update (mutate) db with
    const arr = data[0].map((exercise) => {
      return parseInt(exercise.value);
    });

    // Mutate
    return mutation.mutate(arr);
  };

  // While data is currently being fetched
  if (exersLoading && nonExersLoading) {
    return <RoseLoader />;
  }

  // Render form iff able to store previous data state as a fallback
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
      {previousState && (
        <form onSubmit={handleSave}>
          <TextInput
            placeholder="Workout name"
            withAsterisk
            required
            value={newName}
            onChange={(e) => setNewName(e.currentTarget.value)}
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
            titles={["Current exercises", "Exercises available to add"]}
            filter={(query, item) =>
              item.label.toLowerCase().includes(query.toLowerCase().trim()) ||
              item.group!.toLowerCase().includes(query.toLowerCase().trim())
            }
          />

          {/* These buttons will be included in the modal */}
          <section className={work.modifyBtns}>
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setData(previousState);
                setNewName(workoutName);
              }}
            >
              Cancel
            </button>
            <button type="submit">Save changes</button>
          </section>
        </form>
      )}
    </Modal>
  );
};
export default ModalWorkout;
