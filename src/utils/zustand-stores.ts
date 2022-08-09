import create from "zustand";

// User state; possibly use for auth?
interface UserState {
  username: string;
  setUsername: (newUsername: string) => void;
}
export const useUserStore = create<UserState>()((set) => ({
  username: "",
  setUsername: (newUsername) => set(() => ({ username: newUsername })),
  // setUsername: (by: string) => set((state) => ({username: ...state.username, string}))
}));

// Workout state
