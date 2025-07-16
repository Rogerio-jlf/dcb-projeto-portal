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
      <div className="flex justify-between items-center">
        <label className="block text-lg font-semibold text-white tracking-wider">Senha</label>
        <div className="relative group">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-base tracking-wider text-white hover:text-black flex items-center transition-colors duration-200 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
          </button>

          {/* Tooltip */}
          <span className="absolute -top-8 right-14 translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-lg rounded px-2 py-1 whitespace-nowrap tracking-wider">
            {showPassword ? "Ocultar senha" : "Mostrar senha"}
          </span>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-7 w-7 text-emerald-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-14 pr-3 py-4 bg-white/10 border border-white/50 rounded-lg text-lg tracking-wider text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:bg-white/20 hover:border-white/90"
          placeholder="••••••••"
          required
        />
      </div>
    </div>
  );
}
