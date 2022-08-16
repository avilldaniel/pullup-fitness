import { Exercise_stat, Muscle_grp, Prisma } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export interface IModalDelete {
  delModalOpened: boolean;
  setDelModalOpened: Dispatch<SetStateAction<boolean>>;
  invalidDelete: boolean;
  deleteQueue: IOnDelete;
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

export interface IOnDelete {
  creatorName?: string;
  username?: string;
  exerciseName?: string;
  muscleGrp?: Muscle_grp;
}

export interface IEditMode {
  status: boolean;
  rowKey: number | null;
}

export interface IOnEdit {
  id: number;
  weight: Prisma.Decimal;
  // weight: number;
  sets: string;
  reps: string;
}

export interface ITableRowUpdates {
  // username: string;
  creatorName: string;
  exerciseName: string;
  newWeight: string;
  // newWeight: number;
  newSets: string;
  newReps: string;
}

export interface IUpdatedStat {
  username: string;
  muscleGrp: string;
  creatorName: string;
  exerciseName: string;
  newWeight: string;
  newSets: string;
  newReps: string;
}

export interface ITableRow {
  key: number;
  theKey: number;
  // username: string;
  stat: Exercise_stat;
  onEdit: ({ id, weight, sets, reps }: IOnEdit) => void;
  inEditMode: IEditMode;
  updateStats: ({
    // username,
    exerciseName,
    newWeight,
    newSets,
    newReps,
  }: ITableRowUpdates) => Promise<void>;
  onSave: ({
    // username,
    exerciseName,
    newWeight,
    newSets,
    newReps,
  }: ITableRowUpdates) => void;
  onCancel: () => void;
  onDelete: ({ creatorName, username, exerciseName }: IOnDelete) => void;
  setWeight: Dispatch<SetStateAction<string>>;
  // setWeight: (value: SetStateAction<number | null>) => void;
  setSets: Dispatch<SetStateAction<string>>;
  setReps: Dispatch<SetStateAction<string>>;
  weight: string;
  // weight: number;
  sets: string;
  reps: string;
}

export interface ITableStats {
  muscleGrp: string;
  username: string;
  filteredArr: never[];
  setFilteredArr: Dispatch<React.SetStateAction<never[]>>;
  setDelModalOpened: Dispatch<React.SetStateAction<boolean>>;
  setDeleteQueue: React.Dispatch<React.SetStateAction<IOnDelete | undefined>>;
}
