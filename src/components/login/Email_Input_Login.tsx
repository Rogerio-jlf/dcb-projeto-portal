"use client";

import { Mail } from "lucide-react";

interface LoginInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmailInputLogin({ value, onChange }: LoginInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-lg font-semibold text-white tracking-wider">Email</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="h-7 w-7 text-emerald-400" />
        </div>
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-lg block w-full pl-14 pr-3 py-4 bg-white/10 border border-white/50 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:bg-white/20 hover:border-white/90 tracking-wider"
          placeholder="Seu email aqui"
          required
        />
      </div>
    </div>
  );
}
