import { createContext, Dispatch, SetStateAction } from "react";

// type table stats context,
// define table stats defaults
// then create context w/ defaults
interface ITableStatsContext {
  // usernameContext: (string | React.Dispatch<React.SetStateAction<string>>)[];
  // muscleGrpContext: (string | React.Dispatch<React.SetStateAction<string>>)[];
  // exerciseNameContext: (
  //   | string
  //   | React.Dispatch<React.SetStateAction<string>>
  // )[];
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  muscleGrp: string;
  setMuscleGrp: Dispatch<SetStateAction<string>>;
  exerciseName: string;
  setExerciseName: Dispatch<SetStateAction<string>>;
}
export const tableStatsDefault = {
  username: "",
  setUsername: () => {},
  muscleGrp: "ALL",
  setMuscleGrp: () => {},
  exerciseName: "",
  setExerciseName: () => {},
};
// export const TableStatsContext = createContext(null);
export const TableStatsContext =
  createContext<ITableStatsContext>(tableStatsDefault);
// export const TableStatsContext = createContext<ITableStatsContext | null>(null);
