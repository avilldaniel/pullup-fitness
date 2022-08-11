import React, { useState } from "react";
import { TableStatsContext, tableStatsDefault } from "../utils/contexts";

interface ITableStatsProvider {
  children: React.ReactNode;
}
export const TableStatsProvider = ({ children }: ITableStatsProvider) => {
  // const [username, setUsername] = useState<string>("");
  // const [muscleGrp, setMuscleGrp] = useState<string>("ALL");
  // const [exerciseName, setExerciseName] = useState<string>("");

  // const [username, setUsername] = useState<string>(tableStatsDefault.username);
  const [muscleGrp, setMuscleGrp] = useState<string>(
    tableStatsDefault.muscleGrp
  );
  const [exerciseName, setExerciseName] = useState<string>(
    tableStatsDefault.exerciseName
  );

  return (
    <TableStatsContext.Provider
      value={{
        // username,
        muscleGrp,
        exerciseName,
        // setUsername,
        setMuscleGrp,
        setExerciseName,
      }}

      // value={{
      //   usernameContext: [username, setUsername],
      //   muscleGrpContext: [muscleGrp, setMuscleGrp],
      //   exerciseNameContext: [exerciseName, setExerciseName]
      // }}
    >
      {children}
    </TableStatsContext.Provider>
  );
};
