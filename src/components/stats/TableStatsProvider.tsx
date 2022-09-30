import React, { useState } from "react";
import type { FC } from "react";
import { TableStatsContext, tableStatsDefault } from "../../utils/contexts";

interface ITableStatsProvider {
  children: React.ReactNode;
}
export const TableStatsProvider: FC<ITableStatsProvider> = ({ children }) => {
  const [muscleGrp, setMuscleGrp] = useState<string>(
    tableStatsDefault.muscleGrp
  );
  const [exerciseName, setExerciseName] = useState<string>(
    tableStatsDefault.exerciseName
  );

  return (
    <TableStatsContext.Provider
      value={{
        muscleGrp,
        exerciseName,
        setMuscleGrp,
        setExerciseName,
      }}
    >
      {children}
    </TableStatsContext.Provider>
  );
};
