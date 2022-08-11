import { useContext, useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { Exercise_stat } from "@prisma/client";
import {
  IEditMode,
  IOnDelete,
  IOnEdit,
  ITableRowUpdates,
  ITableStats,
} from "../utils/types";
import TableRow from "./TableRow";
import axios from "axios";
import { useRouter } from "next/router";
import { TableStatsContext } from "../utils/contexts";
import OrangeLoader from "./OrangeLoader";
import { useUserStore } from "../utils/zustand-stores";
import ModalDelete from "./ModalDelete";
import { useFetchStats } from "../react-query-hooks/useFetchStats";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TableStats = () => {
  // Router
  const router = useRouter();
  const { username: queryUsername } = router.query;

  // Zustand
  const username = useUserStore((state) => state.username);
  const setUsername = useUserStore((state) => state.setUsername);

  // Set username on loadup
  useEffect(() => {
    if (queryUsername && typeof queryUsername === "string") {
      setUsername(queryUsername);
    }
  });

  // Context
  const { muscleGrp } = useContext(TableStatsContext);

  // Fetch user stats
  const { isLoading, isError, data: stats } = useFetchStats();

  // Mutation for updating stats
  const queryClient = useQueryClient();
  const updateStatsMutation = useMutation(
    async (updatedStat: any) => {
      const res = await axios.put("/api/stats/updateStats", updatedStat);
      return res.data;
    },
    {
      onSuccess: (data) => {
        // Iterate thru current cache of stats, if a stat matches our current stat,
        // replace the old stat with the current updated one
        queryClient.setQueriesData(
          ["stats", username],
          (oldData: Exercise_stat[] | undefined) => {
            return oldData?.map((stat) => {
              if (
                stat.exerciseName === data.exerciseName &&
                stat.creatorName === data.creatorName
              ) {
                return data;
              }
              return stat;
            });
          }
        );
      },
    }
  );

  /****************************************************************************/
  // Make table editable, dynamic

  const [inEditMode, setInEditMode] = useState<IEditMode>({
    status: false,
    rowKey: null,
  });
  const [delModalOpened, setDelModalOpened] = useState(false);
  const [invalidDelete, setInvalidDelete] = useState(false);
  const [deleteQueue, setDeleteQueue] = useState({});

  const [weight, setWeight] = useState<number | null>(null);
  const [sets, setSets] = useState<number | null>(null);
  const [reps, setReps] = useState<number | null>(null);

  const onEdit = ({ id, weight, sets, reps }: IOnEdit) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setWeight(weight);
    setSets(sets);
    setReps(reps);
  };

  const updateStats = async ({
    // username,
    creatorName,
    exerciseName,
    newWeight,
    newSets,
    newReps,
  }: ITableRowUpdates) => {
    // Update query cache
    updateStatsMutation.mutate({
      username,
      creatorName,
      exerciseName,
      newWeight,
      newSets,
      newReps,
    });

    // Reset state after posting
    onCancel();
  };

  // Invoke when user hits save
  const onSave = ({
    // username,
    creatorName,
    exerciseName,
    newWeight,
    newSets,
    newReps,
  }: ITableRowUpdates) => {
    updateStats({
      username,
      creatorName,
      exerciseName,
      newWeight,
      newSets,
      newReps,
    });
  };

  // Reset state
  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
    setWeight(null);
    setSets(null);
    setReps(null);
  };

  // Invoke when user wants to delete a record
  // if creatorName !== "admin", delete exercise WHERE username: username AND exerciseName: exerciseName
  const onDelete = ({
    username,
    muscleGrp,
    exerciseName,
    creatorName,
  }: IOnDelete) => {
    // Open modal "Are you sure you want to delete this exercise?"
    setDelModalOpened(true);

    // store 3 variables in a state
    setDeleteQueue({ username, muscleGrp, exerciseName, creatorName });
  };

  /****************************************************************************/
  // Individual rows to render
  let rows: React.ReactNode[] = [];
  if (stats) {
    rows = stats.map((stat: Exercise_stat, key: number) => {
      if (stat.muscleGroup === muscleGrp || muscleGrp === "ALL") {
        return (
          <TableRow
            key={key}
            theKey={key}
            // username={username}
            stat={stat}
            onEdit={onEdit}
            inEditMode={inEditMode}
            updateStats={updateStats}
            onSave={onSave}
            onCancel={onCancel}
            onDelete={onDelete}
            setWeight={setWeight}
            setSets={setSets}
            setReps={setReps}
            weight={weight!}
            sets={sets!}
            reps={reps!}
          />
        );
      }
    });

    // Remove undefined values in array
    rows = rows.filter((stat) => stat);
  }

  return (
    <>
      {/* Table of stats */}
      {isLoading ? (
        <OrangeLoader /> // change to global loader
      ) : !rows.length ? (
        // ) : isError ? (
        <p>
          To add exercises, select a muscle group. <br />
          Then add from a list of preset exercises, or create your own exercise.
        </p>
      ) : (
        <>
          <Table fontSize="sm" horizontalSpacing={4} highlightOnHover>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Weight</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>

          <ModalDelete
            delModalOpened={delModalOpened}
            setDelModalOpened={setDelModalOpened}
            // deleteSubmitted={deleteSubmitted}
            invalidDelete={invalidDelete}
            deleteQueue={deleteQueue}
          />
        </>
      )}
    </>
  );
};

export default TableStats;
