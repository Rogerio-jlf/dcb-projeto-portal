"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-10 right-13 z-50 flex items-center rounded-full border border-slate-100 bg-white p-3 shadow-md shadow-black dark:border dark:border-slate-500 dark:bg-slate-950 dark:shadow-md dark:shadow-white">
      {/* Parte do Sol (Light) */}
      <button
        onClick={() => setTheme("light")}
        className="flex h-8 w-12 items-center justify-center"
        aria-label="Tema claro"
      >
        <Sun className="h-8 w-8 text-black dark:text-slate-500" />
      </button>

      {/* Divisor */}
      <div className="mx-1 h-8 w-px bg-black dark:bg-white" />

      {/* Parte da Lua (Dark) */}
      <button
        onClick={() => setTheme("dark")}
        className="flex h-8 w-12 items-center justify-center"
        aria-label="Tema escuro"
      >
        <Moon className="h-8 w-8 text-slate-300 dark:text-white" />
      </button>
    </div>
  );
}
