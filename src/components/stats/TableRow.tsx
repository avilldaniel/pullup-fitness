import React, { useContext } from "react";
import type { FC } from "react";
import { ActionIcon, TextInput } from "@mantine/core";
import {
  IconBarbell,
  IconCircleCheck,
  IconCircleX,
  IconTrash,
} from "@tabler/icons";
import { TableStatsContext } from "../../utils/contexts";
import { ITableRow } from "../../utils/types";
import useFetchUser from "../../react-query-hooks/useFetchUser";

const TableRow: FC<ITableRow> = ({
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
}) => {
  // Fetch username
  const { data } = useFetchUser();

  // Context
  const { muscleGrp } = useContext(TableStatsContext);

  // Format date
  const d = new Date(stat.updatedAt);
  const month = ("0" + (d.getMonth() + 1)).slice(-2).toString();
  const day = ("0" + d.getDate()).slice(-2).toString();
  const year = ("0" + d.getFullYear()).slice(-2).toString();
  const date = month.concat("/" + day).concat("/" + year);

  return (
    <tr key={theKey}>
      {/* Exercise name */}
      <td style={{ wordWrap: "break-word", textAlign: "start" }}>
        {stat.exerciseName}
      </td>

      {/* Weight */}
      <td>
        {inEditMode.status && inEditMode.rowKey === theKey ? (
          <TextInput
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.currentTarget.value)}
            styles={{
              input: {
                padding: "0.2em",
                width: "5em",
                display: "flex",
                textAlign: "center",
              },
            }}
          />
        ) : (
          parseFloat(stat.weight?.toString()!).toFixed(1)
        )}
      </td>

      {/* Sets */}
      <td>
        {inEditMode.status && inEditMode.rowKey === theKey ? (
          <TextInput
            type="number"
            value={sets}
            onChange={(e) => setSets(e.currentTarget.value)}
            styles={{
              input: {
                padding: "0.2em",
                width: "3em",
                display: "flex",
                textAlign: "center",
              },
            }}
          />
        ) : (
          stat.sets
        )}
      </td>

      {/* Reps */}
      <td>
        {inEditMode.status && inEditMode.rowKey === theKey ? (
          <TextInput
            type="number"
            value={reps}
            onChange={(e) => setReps(e.currentTarget.value)}
            styles={{
              input: {
                padding: "0.2em",
                width: "3em",
                display: "flex",
                textAlign: "center",
              },
            }}
          />
        ) : (
          stat.reps
        )}
      </td>

      {/* Last Updated */}
      <td
        style={{
          display: inEditMode.status ? "none" : "",
          textAlign: "center",
        }}
      >
        {date}
      </td>

      {/* Edit */}
      {muscleGrp !== "ALL" && (
        <td>
          {/* In edit mode */}
          {inEditMode.status && inEditMode.rowKey === theKey ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "4em",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              {/* Save changes */}
              <ActionIcon
                onClick={() =>
                  onSave({
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
                <IconCircleCheck color="#37b24d" />
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
            </div>
          ) : (
            // Not in edit mode
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "4em",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              {/* Click to enter edit mode */}
              <ActionIcon
                onClick={() =>
                  onEdit({
                    id: theKey,
                    weight: stat.weight!,
                    sets: stat.sets.toString(),
                    reps: stat.reps!.toString(),
                  })
                }
                radius="md"
                size="md"
                aria-label="Modify stats"
                title="Update"
              >
                <IconBarbell />
              </ActionIcon>

              {/* Delete exercise */}
              <ActionIcon
                onClick={() =>
                  onDelete({
                    username: data.username,
                    creatorName: stat.creatorName,
                    exerciseName: stat.exerciseName,
                    muscleGrp: stat.muscleGroup,
                  })
                }
                radius="md"
                size="md"
                aria-label="Delete record"
                title="Delete"
              >
                <IconTrash color="#e9627f" />
              </ActionIcon>
            </div>
          )}
        </td>
      )}
    </tr>
  );
};

export default TableRow;
