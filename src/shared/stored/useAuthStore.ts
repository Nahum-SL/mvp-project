import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const safeStorage = {
  getItem: (key: string) => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
  },
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        setToken: (token) => {
          if (token) {
            safeStorage.setItem("token", token);
          } else {
            safeStorage.removeItem("token");
          }
          set({ token });
        },
        login: (user, token) => {
          safeStorage.setItem("token", token);
          set({ user, token, isAuthenticated: true });
        },
        logout: () => {
          safeStorage.removeItem("token");
          set({ user: null, token: null, isAuthenticated: false });
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({ user: state.user, token: state.token }),
      },
    ),
    { name: "AuthStore" },
  ),
);
