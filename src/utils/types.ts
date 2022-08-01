import { Exercise_stat } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export interface IModalExers {
  username: string;
  muscleGrp: string;
  // modalOpen: boolean;
  // setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IModalExer {
  username: string;
  muscleGrp: string;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

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
  creatorName: string;
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
  muscleGrp: string;
  username: string;
  filteredArr: never[];
  setFilteredArr: Dispatch<React.SetStateAction<never[]>>;
  // statsArr: never[];
  // setStatsArr: Dispatch<React.SetStateAction<never[]>>;
  // setFetchingData: Dispatch<React.SetStateAction<boolean>>;
}
