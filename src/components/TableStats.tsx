import { Table } from "@mantine/core";
import { Exercise_stat } from "@prisma/client";
import { useState } from "react";
import {
  IEditMode,
  IOnEdit,
  ITableRowUpdates,
  ITableStats,
} from "../utils/types";
import TableRow from "./TableRow";
import axios from "axios";
import useSWR from "swr";
import statsFetcher from "../fetchers/statsFetcher";

const TableStats = ({
  // statsArr,
  muscleGrp,
  username,
  filteredArr,
  setFilteredArr,
}: // setStatsArr,
// setFetchingData,
ITableStats) => {
  // console.log("TableStats muscleGrp:", muscleGrp);
  // const [filteredArr, setFilteredArr] = useState([]);
  const { data, error, isValidating } = useSWR(
    muscleGrp !== "ALL" && username
      ? [`/api/stats/${username}/${muscleGrp}`, setFilteredArr]
      : [`/api/stats/${username}`, setFilteredArr],
    statsFetcher,
    {
      onErrorRetry: (error) => {
        // Never retry on 400.
        if (error.status === 400) return;
      },
    }
  );
  // console.log("useSWR data:", data);
  // console.log("useSWR error:", error);

  /****************************************************************************/
  // State variables which allow table to be dynamic and editable
  const [inEditMode, setInEditMode] = useState<IEditMode>({
    status: false,
    rowKey: null,
  });
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
    // switch (field) {
    //   case "weight":
    //     console.log("field is weight");
    //     setWeight(unit);
    //     break;
    //   case "sets":
    //     console.log("field is sets");
    //     setSets(unit);
    //     break;
    //   case "reps":
    //     console.log("field is reps");
    //     setReps(unit);
    //     break;
    //   default:
    //     break;
    // }
  };

  const updateStats = async ({
    username,
    exerciseName,
    newWeight,
    newSets,
    newReps,
  }: ITableRowUpdates) => {
    // const res = await axios.post('/api/stats/post-update', {
    //   username: username,
    //   exerciseName: exerciseName,
    //   newWeight: newWeight,
    //   newSets: newSets,
    //   newReps: newReps
    // })
    const res = await axios.post("/api/stats/post-update", {
      username,
      exerciseName,
      newWeight,
      newSets,
      newReps,
    });
    console.log("res.data:", res.data);

    // re-fetch data to re-render new data
    setFilteredArr(res.data);
    // console.log("trying to append res.data:", filteredArr);

    // Reset state after posting
    onCancel();
  };

  // invoke when user hits save
  const onSave = ({
    username,
    exerciseName,
    newWeight,
    newSets,
    newReps,
  }: ITableRowUpdates) => {
    updateStats({ username, exerciseName, newWeight, newSets, newReps });
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
  /****************************************************************************/

  // let filteredArr = data;
  // if (muscleGrp !== "ALL") {
  //   filteredArr = filteredArr.filter(
  //     (stat: Exercise_stat) => stat.muscleGroup == muscleGrp
  //   );
  // }
  // let filteredArr = statsArr;
  // if (muscleGrp !== "ALL") {
  //   filteredArr = statsArr.filter(
  //     (stat: Exercise_stat) => stat.muscleGroup == muscleGrp
  //   );
  // }

  const rows = filteredArr.map((stat: Exercise_stat, key: number) => {
    // const rows = filteredArr.map((stat: Exercise_stat, key: number) => {
    // const d = new Date(stat.updatedAt);
    // const date = d.toLocaleDateString("en-US");

    // console.log("stat & key:", stat, key);
    return (
      <TableRow
        key={key}
        theKey={key}
        username={username}
        stat={stat}
        onEdit={onEdit}
        inEditMode={inEditMode}
        updateStats={updateStats}
        onSave={onSave}
        onCancel={onCancel}
        setWeight={setWeight}
        setSets={setSets}
        setReps={setReps}
        weight={weight!}
        sets={sets!}
        reps={reps!}
      />
    );
    // <tr key={key}>
    //   <td>{stat.exerciseName}</td>
    //   <td>
    //     <NumberInput value={stat.weight!} disabled color="" />
    //   </td>
    //   <td>
    //     <NumberInput value={stat.sets!} disabled />
    //   </td>
    //   <td>
    //     <NumberInput value={stat.reps!} disabled />
    //   </td>
    //   {/* <td>{stat.weight}</td>
    //   <td>{stat.sets}</td>
    //   <td>{stat.reps}</td> */}
    //   <td>{date}</td>
    //   {/* <td>{stat.updatedAt.toString().slice(0, 10)}</td> */}
    //   <td>
    //     <ActionIcon
    //       // onClick={}
    //       radius="md"
    //       size="sm"
    //       aria-label="Modify stats"
    //     >
    //       <IconBarbell />
    //     </ActionIcon>
    //   </td>
    // </tr>
  });

  return (
    <div>
      <Table>
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
    </div>
  );
};

export default TableStats;

// import { ActionIcon, NumberInput, Table } from "@mantine/core";
// import { Exercise_stat } from "@prisma/client";
// import { IconBarbell } from "@tabler/icons";
// import { useState } from "react";
// import { ITableStats } from "../utils/types";

// const TableStats = ({ statsArr, muscleGrp }: ITableStats) => {
//   // console.log("TableStats muscleGrp:", muscleGrp);
//   // console.log("TableStats statsArr:", statsArr);

//   let filteredArr = statsArr;
//   if (muscleGrp !== "ALL") {
//     filteredArr = statsArr.filter(
//       (stat: Exercise_stat) => stat.muscleGroup == muscleGrp
//     );
//   }

//   const rows = filteredArr.map((stat: Exercise_stat, key: number) => {
//     const d = new Date(stat.updatedAt);
//     const date = d.toLocaleDateString("en-US");
//     // console.log("stat & key:", stat, key);
//     return (
//       <tr key={key}>
//         <td>{stat.exerciseName}</td>
//         <td>
//           <NumberInput value={stat.weight!} disabled color="" />
//         </td>
//         <td>
//           <NumberInput value={stat.sets!} disabled />
//         </td>
//         <td>
//           <NumberInput value={stat.reps!} disabled />
//         </td>
//         {/* <td>{stat.weight}</td>
//         <td>{stat.sets}</td>
//         <td>{stat.reps}</td> */}
//         <td>{date}</td>
//         {/* <td>{stat.updatedAt.toString().slice(0, 10)}</td> */}
//         <td>
//           <ActionIcon
//             // onClick={}
//             radius="md"
//             size="sm"
//             aria-label="Modify stats"
//           >
//             <IconBarbell />
//           </ActionIcon>
//         </td>
//       </tr>
//     );
//   });

//   return (
//     <div>
//       <Table>
//         <thead>
//           <tr>
//             <th>Exercise</th>
//             <th>Weight</th>
//             <th>Sets</th>
//             <th>Reps</th>
//             <th>Last Updated</th>
//             <th>Edit</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </Table>
//     </div>
//   );
// };

// export default TableStats;
