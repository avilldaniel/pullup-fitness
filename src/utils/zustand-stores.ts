import create from "zustand";

// User state
interface UserState {
  username: string;
  setUsername: (newUsername: string) => void;
}
export const useUserStore = create<UserState>()((set) => ({
  username: "",
  setUsername: (newUsername) => set(() => ({ username: newUsername })),
}));

// Workout state
