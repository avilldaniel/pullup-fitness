import { ActionIcon, NumberInput, useMantineTheme } from "@mantine/core";
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
}: ITableRow) => {
  // Theme
  const theme = useMantineTheme();

  // Zustand
  const username = useUserStore((state) => state.username);

  // Format date
  const d = new Date(stat.updatedAt);
  const month = ("0" + d.getMonth()).slice(-2).toString();
  const day = ("0" + d.getDate()).slice(-2).toString();
  const date = month.concat("/" + day);
  // const date = d.toLocaleDateString("en-US");

  // Format weight
  const w = parseFloat(weight);

  return (
    <tr key={theKey}>
      {/* Exercise name */}
      <td style={{ wordWrap: "break-word", textAlign: "start" }}>
        {stat.exerciseName}
      </td>

      {/* Weight */}
      <td>
        {inEditMode.status && inEditMode.rowKey === theKey ? (
          <NumberInput
            size="sm"
            value={w}
            // value={weight}
            onChange={(e) => setWeight(e!.toString())}
            min={0}
            hideControls
            precision={1}
            styles={{
              input: {
                // dev
                // border: "1px solid yellow",

                padding: "0.2em",
                width: "5em",
                display: "flex",
                textAlign: "center",
              },
            }}
          />
        ) : (
          parseFloat(stat.weight?.toString()!).toFixed(1)
          // parseFloat(stat.weight).toFixed(1)
        )}
      </td>

      {/* Sets */}
      <td>
        {inEditMode.status && inEditMode.rowKey === theKey ? (
          <NumberInput
            size="sm"
            value={sets}
            onChange={(e) => setSets(e!)}
            min={0}
            hideControls
            styles={{
              input: {
                // dev
                // border: "1px solid yellow",

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
          <NumberInput
            size="sm"
            value={reps}
            onChange={(e) => setReps(e!)}
            min={0}
            hideControls
            styles={{
              input: {
                // dev
                // border: "1px solid yellow",

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
      <td>
        {/* In edit mode */}
        {inEditMode.status && inEditMode.rowKey === theKey ? (
          <div
            style={{
              // dev
              // border: "1px solid yellow",

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
          </div>
        ) : (
          // Not in edit mode
          <div
            style={{
              // dev
              // border: "1px solid yellow",

              display: "flex",
              flexDirection: "column",
              height: "3.3em",
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
                  sets: stat.sets,
                  reps: stat.reps!,
                })
              }
              radius="md"
              size="sm"
              aria-label="Modify stats"
              title="Update"
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
              <IconTrash color={theme.colors.orange[5]} />
            </ActionIcon>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
