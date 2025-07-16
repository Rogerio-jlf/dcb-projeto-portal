"use client";

import { Lock, Eye, EyeOff } from "lucide-react";

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
        <label className="block text-sm font-medium text-white/90 uppercase tracking-wide">
          Senha
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-xs text-white/70 hover:text-emerald-300 flex items-center transition-colors duration-200"
        >
          {showPassword ? (
            <>
              <EyeOff className="w-4 h-4 mr-1" /> Ocultar
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-1" /> Mostrar
            </>
          )}
        </button>
      </div>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-emerald-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 hover:bg-white/10 hover:border-white/30"
          placeholder="••••••••"
          required
        />
      </div>
    </div>
  );
}
