"use client";

import { Mail } from "lucide-react";

interface LoginInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmailInputLogin({ value, onChange }: LoginInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-lg font-semibold tracking-wider text-white">
        Email
      </label>
      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Mail className="h-7 w-7 text-emerald-400" />
        </div>
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-lg border border-white/50 bg-white/10 py-4 pr-3 pl-14 text-lg tracking-wider text-white placeholder-white/50 transition-all duration-300 hover:border-white/90 hover:bg-white/20 focus:border-transparent focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          placeholder="Seu email aqui"
          required
        />
      </div>
    </div>
  );
}
