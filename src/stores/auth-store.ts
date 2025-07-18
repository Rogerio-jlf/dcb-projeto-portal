// stores/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,

      login: (email, password) => {
        if (email === "teste@email.com" && password === "123456") {
          set({ isAuthenticated: true });
          return true; // ✅ sucesso
        } else {
          set({ isAuthenticated: false });
          return false; // ✅ falha
        }
      },

      logout: () => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage", // chave no localStorage
    }
  )
);
