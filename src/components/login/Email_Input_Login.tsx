"use client";

import { Mail } from "lucide-react";

interface LoginInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmailInputLogin({ value, onChange }: LoginInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/90 uppercase tracking-wide">
        E-mail
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="h-5 w-5 text-emerald-400" />
        </div>
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 hover:bg-white/10 hover:border-white/30"
          placeholder="seu@email.com"
          required
        />
      </div>
    </div>
  );
}
