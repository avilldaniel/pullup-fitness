import { createContext, Dispatch, SetStateAction } from "react";

// type table stats context,
// define table stats defaults
// then create context w/ defaults
interface ITableStatsContext {
  muscleGrp: string;
  setMuscleGrp: Dispatch<SetStateAction<string>>;
  exerciseName: string;
  setExerciseName: Dispatch<SetStateAction<string>>;
}
export const tableStatsDefault = {
  muscleGrp: "ALL",
  setMuscleGrp: () => {},
  exerciseName: "",
  setExerciseName: () => {},
};
export const TableStatsContext =
  createContext<ITableStatsContext>(tableStatsDefault);
