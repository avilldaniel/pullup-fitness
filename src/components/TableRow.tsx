import { ActionIcon, NumberInput } from "@mantine/core";
import {
  IconBarbell,
  IconCircleCheck,
  IconCircleX,
  IconTrash,
} from "@tabler/icons";
import React from "react";
import { ITableRow } from "../utils/types";
import { useUserStore } from "../utils/zustand-stores";

const TableRow = ({
  // key,
  theKey,
  stat,
  onEdit,
  inEditMode,
  onSave,
  onCancel,
  onDelete,
  setWeight,
  setSets,
  setReps,
  weight,
  sets,
  reps,
}: // username,
any) => {
  // }: ITableRow) => {

  // Zustand
  const username = useUserStore((state) => state.username);

  // Format date
  const d = new Date(stat.updatedAt);
  const date = d.toLocaleDateString("en-US");

  return (
    <tr key={theKey}>
      <td>{stat.exerciseName}</td>

      {/* Weight */}
      <td>
        {inEditMode.status && inEditMode.rowKey === theKey ? (
          <NumberInput value={weight} min={0} onChange={(e) => setWeight(e!)} />
        ) : (
          stat.weight
        )}
      </td>

      {/* Sets */}
      <td>
        {inEditMode.status && inEditMode.rowKey === theKey ? (
          <NumberInput value={sets} min={0} onChange={(e) => setSets(e!)} />
        ) : (
          stat.sets
        )}
      </td>

      {/* Reps */}
      <td>
        {inEditMode.status && inEditMode.rowKey === theKey ? (
          <NumberInput value={reps} min={0} onChange={(e) => setReps(e!)} />
        ) : (
          stat.reps
        )}
      </td>

      {/* Last Updated */}
      <td>{date}</td>

      {/* Action */}
      <td>
        {/* In edit mode */}
        {inEditMode.status && inEditMode.rowKey === theKey ? (
          <>
            {/* Save changes */}
            <ActionIcon
              onClick={() =>
                onSave({
                  // username: username,
                  creatorName: stat.creatorName,
                  exerciseName: stat.exerciseName,
                  newWeight: weight,
                  newSets: sets,
                  newReps: reps,
                })
              }
              radius="md"
              size="md"
              aria-label="Save changes"
              title="Save"
            >
              <IconCircleCheck color="green" />
            </ActionIcon>

            {/* Cancel changes */}
            <ActionIcon
              onClick={() => onCancel()}
              radius="md"
              size="md"
              aria-label="Cancel changes"
              title="Cancel"
            >
              <IconCircleX color="red" />
            </ActionIcon>
          </>
        ) : (
          // Not in edit mode
          <>
            {/* Click to enter edit mode */}
            <ActionIcon
              onClick={() =>
                onEdit({
                  id: theKey,
                  weight: stat.weight!,
                  sets: stat.sets,
                  reps: stat.reps!,
                })
              }
              radius="md"
              size="sm"
              aria-label="Modify stats"
              title="Edit"
            >
              <IconBarbell />
            </ActionIcon>

            {/* Delete exercise */}
            <ActionIcon
              onClick={() =>
                onDelete({
                  username: username,
                  creatorName: stat.creatorName,
                  exerciseName: stat.exerciseName,
                  muscleGrp: stat.muscleGroup,
                })
              }
              radius="md"
              size="sm"
              aria-label="Delete record"
              title="Delete"
            >
              <IconTrash color="red" />
            </ActionIcon>
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
