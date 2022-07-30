import { Exercise_stat } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export interface IEditMode {
  status: boolean;
  rowKey: number | null;
}

export interface IOnEdit {
  id: number;
  weight: number;
  sets: number;
  reps: number;
}

export interface ITableRowUpdates {
  username: string;
  exerciseName: string;
  newWeight: number;
  newSets: number;
  newReps: number;
}

export interface ITableRow {
  key: number;
  theKey: number;
  username: string;
  stat: Exercise_stat;
  onEdit: ({ id, weight, sets, reps }: IOnEdit) => void;
  inEditMode: IEditMode;
  updateStats: ({
    username,
    exerciseName,
    newWeight,
    newSets,
    newReps,
  }: ITableRowUpdates) => Promise<void>;
  onSave: ({
    username,
    exerciseName,
    newWeight,
    newSets,
    newReps,
  }: ITableRowUpdates) => void;
  onCancel: () => void;
  setWeight: (value: SetStateAction<number | null>) => void;
  // setWeight: Dispatch<SetStateAction<number | null>>;
  setSets: Dispatch<SetStateAction<number | null>>;
  setReps: Dispatch<SetStateAction<number | null>>;
  weight: number;
  sets: number;
  reps: number;
}

export interface ITableStats {
  statsArr: never[];
  muscleGrp: string;
  username: string;
  setFetchingData: Dispatch<React.SetStateAction<boolean>>;
}
