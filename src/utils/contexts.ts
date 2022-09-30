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
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
}
export const clockDefault = {
  seconds: 0,
  // seconds: 10,
  setSeconds: () => {},
};
export const ClockContext = createContext<IClockContext>(clockDefault);
