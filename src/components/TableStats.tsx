import React from "react";

const TableStats = ({ statsArr, muscleGrp }: any) => {
  // console.log("TableStats muscleGrp:", muscleGrp);
  // console.log("TableStats statsArr:", statsArr);
  let filteredArr = statsArr;

  if (muscleGrp !== "ALL") {
    filteredArr = statsArr.filter((stat: any) => stat.muscleGrp == muscleGrp);
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Exercise</th>
            <th>Weight</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Last Updated</th>
          </tr>
          {filteredArr &&
            filteredArr.map((stat: any, key: any) => (
              <tr key={key}>
                <td>{stat.exerciseName}</td>
                <td>{stat.weight}</td>
                <td>{stat.sets}</td>
                <td>{stat.reps}</td>
                <td>{stat.updatedAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableStats;
