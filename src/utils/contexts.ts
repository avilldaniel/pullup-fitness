import { createContext, Dispatch, SetStateAction } from "react";

// Table stats context
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

// Timer context
interface IClockContext {
  clock: number;
  setClock: Dispatch<SetStateAction<number>>;
}
export const clockDefault = {
  // clock: 0,
  clock: 60,
  setClock: () => {},
};
export const ClockContext = createContext<IClockContext>(clockDefault);
