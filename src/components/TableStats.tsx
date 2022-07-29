import { Table } from "@mantine/core";
import { Exercise_stat } from "@prisma/client";
import { ITableStats } from "../utils/types";

const TableStats = ({ statsArr, muscleGrp }: ITableStats) => {
  // console.log("TableStats muscleGrp:", muscleGrp);
  // console.log("TableStats statsArr:", statsArr);
  let filteredArr = statsArr;

  if (muscleGrp !== "ALL") {
    filteredArr = statsArr.filter(
      (stat: Exercise_stat) => stat.muscleGroup == muscleGrp
    );
  }

  const rows = filteredArr.map((stat: Exercise_stat, key: number) => (
    <tr key={key}>
      <td>{stat.exerciseName}</td>
      <td>{stat.weight}</td>
      <td>{stat.sets}</td>
      <td>{stat.reps}</td>
      <td>{stat.updatedAt.toString().slice(0, 10)}</td>
    </tr>
  ));

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
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {/* <table>
        <tbody>
          <tr>
            <th>Exercise</th>
            <th>Weight</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Last Updated</th>
          </tr>
          {filteredArr &&
            filteredArr.map((stat: Exercise_stat, key: number) => (
              <tr key={key}>
                <td>{stat.exerciseName}</td>
                <td>{stat.weight}</td>
                <td>{stat.sets}</td>
                <td>{stat.reps}</td>
                <td>{stat.updatedAt.toString().slice(0, 10)}</td>
              </tr>
            ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default TableStats;
