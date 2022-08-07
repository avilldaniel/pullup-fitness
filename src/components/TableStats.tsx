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
import useSWR from "swr";
import statsFetcher from "../fetchers/statsFetcher";
// import { getStatsFetcher, useFetchStats } from "../react-query-hooks/stats";
import { useRouter } from "next/router";
import { TableStatsContext } from "../utils/contexts";
import OrangeLoader from "./OrangeLoader";
import { useUserStore } from "../utils/zustand-stores";
import ModalDelete from "./ModalDelete";
import { useQuery } from "@tanstack/react-query";

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

  // Fetch user stats
  // const { isLoading, isError, data } = useFetchStats(username);
  // const { isLoading, isError, data } = useQuery(["stats"], getStatsFetcher);
  const { isLoading, isError, data } = useQuery(["stats"], async () => {
    const res = await axios.get("/api/stats/fetchStats", {
      params: {
        username,
      },
    });

    console.log("hellores.data 2:", res.data);
    return res.data;
  });

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
    // console.log("inEditMode:", inEditMode);
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
    const res = await axios.post("/api/stats/post-update", {
      username,
      creatorName,
      exerciseName,
      newWeight,
      newSets,
      newReps,
    });
    // console.log("res.data:", res.data);

    // Re-fetch data to re-render new data
    // setFilteredArr(res.data);

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
  // individual rows to render
  let rows: [] = [];
  if (data) {
    rows = data.map((stat: Exercise_stat, key: number) => {
      // const rows = data.map((stat: Exercise_stat, key: number) => {
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
    });
  }

  return (
    <>
      {/* Table of stats */}
      {isLoading ? (
        <OrangeLoader />
      ) : isError ? (
        <p>
          To add exercises, select a muscle group. <br />
          Then add from a list of preset exercises, or create your own exercise.
        </p>
      ) : (
        <>
          <Table fontSize="sm" horizontalSpacing={4} striped>
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
// import { useState } from "react";
// import { Table } from "@mantine/core";
// import { Exercise_stat } from "@prisma/client";
// import {
//   IEditMode,
//   IOnDelete,
//   IOnEdit,
//   ITableRowUpdates,
//   ITableStats,
// } from "../utils/types";
// import TableRow from "./TableRow";
// import axios from "axios";
// import useSWR from "swr";
// import statsFetcher from "../fetchers/statsFetcher";

// const TableStats = ({
//   muscleGrp,
//   username,
//   filteredArr,
//   setFilteredArr,
//   setDelModalOpened,
//   setDeleteQueue,
// }: ITableStats) => {
//   const { data, error, isValidating } = useSWR(
//     muscleGrp !== "ALL" && username
//       ? [`/api/stats/${username}/${muscleGrp}`, setFilteredArr]
//       : [`/api/stats/${username}`, setFilteredArr],
//     statsFetcher,
//     {
//       onErrorRetry: (error) => {
//         // Never retry on 400.
//         if (error.status === 400) return;
//       },
//     }
//   );
//   // console.log("useSWR data:", data);
//   // console.log("useSWR error:", error);

//   /****************************************************************************/
//   // State variables which allow table to be dynamic and editable
//   const [inEditMode, setInEditMode] = useState<IEditMode>({
//     status: false,
//     rowKey: null,
//   });
//   const [weight, setWeight] = useState<number | null>(null);
//   const [sets, setSets] = useState<number | null>(null);
//   const [reps, setReps] = useState<number | null>(null);

//   const onEdit = ({ id, weight, sets, reps }: IOnEdit) => {
//     setInEditMode({
//       status: true,
//       rowKey: id,
//     });
//     // console.log("inEditMode:", inEditMode);
//     setWeight(weight);
//     setSets(sets);
//     setReps(reps);
//   };

//   const updateStats = async ({
//     username,
//     creatorName,
//     exerciseName,
//     newWeight,
//     newSets,
//     newReps,
//   }: ITableRowUpdates) => {
//     const res = await axios.post("/api/stats/post-update", {
//       username,
//       creatorName,
//       exerciseName,
//       newWeight,
//       newSets,
//       newReps,
//     });
//     // console.log("res.data:", res.data);

//     // Re-fetch data to re-render new data
//     setFilteredArr(res.data);
//     // Reset state after posting
//     onCancel();
//   };

//   // Invoke when user hits save
//   const onSave = ({
//     username,
//     creatorName,
//     exerciseName,
//     newWeight,
//     newSets,
//     newReps,
//   }: ITableRowUpdates) => {
//     updateStats({
//       username,
//       creatorName,
//       exerciseName,
//       newWeight,
//       newSets,
//       newReps,
//     });
//   };

//   // Reset state
//   const onCancel = () => {
//     setInEditMode({
//       status: false,
//       rowKey: null,
//     });
//     setWeight(null);
//     setSets(null);
//     setReps(null);
//   };

//   // Invoke when user wants to delete a record
//   // if creatorName !== "admin", delete exercise WHERE username: username AND exerciseName: exerciseName
//   const onDelete = ({
//     creatorName,
//     username,
//     exerciseName,
//     muscleGrp,
//   }: IOnDelete) => {
//     // Open modal "Are you sure you want to delete this exercise?"
//     setDelModalOpened(true);

//     // store 3 variables in a state
//     setDeleteQueue({ creatorName, username, exerciseName, muscleGrp });
//   };
//   /****************************************************************************/

//   // individual rows to render
//   const rows = filteredArr.map((stat: Exercise_stat, key: number) => {
//     return (
//       <TableRow
//         key={key}
//         theKey={key}
//         username={username}
//         stat={stat}
//         onEdit={onEdit}
//         inEditMode={inEditMode}
//         updateStats={updateStats}
//         onSave={onSave}
//         onCancel={onCancel}
//         onDelete={onDelete}
//         setWeight={setWeight}
//         setSets={setSets}
//         setReps={setReps}
//         weight={weight!}
//         sets={sets!}
//         reps={reps!}
//       />
//     );
//   });

//   return (
//     <div>
//       {/* Table of stats */}
//       <Table fontSize="sm" horizontalSpacing={4} striped>
//         <thead>
//           <tr>
//             <th>Exercise</th>
//             <th>Weight</th>
//             <th>Sets</th>
//             <th>Reps</th>
//             <th>Last Updated</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </Table>
//     </div>
//   );
// };

// export default TableStats;
