import { Exercise_stat } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export interface IPresetExerDiff {
  username: string;
  muscleGrp: string;
}

export interface IModalExers {
  username: string;
  muscleGrp: string;
  setFilteredArr: Dispatch<React.SetStateAction<never[]>>;
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
}
