import create from "zustand";

interface UserState {
  // Email
  email: string;
  setEmail: (newEmail: string) => void;

  // Username
  username: string;
  setUsername: (newUsername: string) => void;
}
export const useUserStore = create<UserState>()((set) => ({
  // Email
  email: "",
  setEmail: (newEmail) => set(() => ({ email: newEmail })),

  // Username
  username: "",
  setUsername: (newUsername) => set(() => ({ username: newUsername })),
}));

// Workout state
