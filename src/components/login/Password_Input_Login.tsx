"use client";

import { Eye, EyeOff, Lock } from "lucide-react";

interface LoginPasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

export default function PasswordInputLogin({
  value,
  onChange,
  showPassword,
  setShowPassword,
}: LoginPasswordInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-lg font-semibold tracking-wider text-white">
          Senha
        </label>
        <div className="group relative">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex cursor-pointer items-center text-base tracking-wider text-white transition-colors duration-200 hover:text-black"
          >
            {showPassword ? (
              <EyeOff className="h-7 w-7" />
            ) : (
              <Eye className="h-7 w-7" />
            )}
          </button>

          {/* Tooltip */}
          <span className="absolute -top-8 right-14 translate-x-1/2 rounded bg-black px-2 py-1 text-lg tracking-wider whitespace-nowrap text-white opacity-0 transition group-hover:opacity-100">
            {showPassword ? "Ocultar senha" : "Mostrar senha"}
          </span>
        </div>
      </div>

      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Lock className="h-7 w-7 text-emerald-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-lg border border-white/50 bg-white/10 py-4 pr-3 pl-14 text-lg tracking-wider text-white placeholder-white/50 transition-all duration-300 hover:border-white/90 hover:bg-white/20 focus:border-transparent focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          placeholder="••••••••"
          required
        />
      </div>
    </div>
  );
}
