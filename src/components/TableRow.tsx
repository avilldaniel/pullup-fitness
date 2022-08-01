import { ActionIcon, NumberInput } from "@mantine/core";
import { IconBarbell, IconCircleCheck, IconCircleX } from "@tabler/icons";
import React from "react";
import { ITableRow } from "../utils/types";

const TableRow = ({
  // key,
  theKey,
  username,
  stat,
  onEdit,
  inEditMode,
  updateStats,
  onSave,
  onCancel,
  setWeight,
  setSets,
  setReps,
  weight,
  sets,
  reps,
}: ITableRow) => {
  // Formate date
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
        {inEditMode.status && inEditMode.rowKey === theKey ? (
          <>
            <ActionIcon
              onClick={() =>
                onSave({
                  username: username,
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
        )}
      </td>
    </tr>
  );
};

export default TableRow;