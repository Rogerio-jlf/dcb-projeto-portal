"use client";

import React from "react";
import { useEffect } from "react";

interface CheckboxLoginProps {
  email: string;
  setEmail: (value: string) => void;
}

export default function CheckboxLogin({ email, setEmail }: CheckboxLoginProps) {
  const [checked, setChecked] = React.useState(false);

  // Recupera os dados ao montar
  useEffect(() => {
    const savedRemember = localStorage.getItem("rememberMe") === "true";
    const savedEmail = localStorage.getItem("savedEmail") || "";

    if (savedRemember) {
      setChecked(true);
      setEmail(savedEmail);
    }
  }, [setEmail]);

  // Atualiza localStorage quando o checkbox mudar
  const handleChange = (value: boolean) => {
    setChecked(value);

    if (!value) {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("savedEmail");
    } else {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("savedEmail", email);
    }
  };

  // Sempre que o email mudar e o checkbox estiver marcado, salva no localStorage
  useEffect(() => {
    if (checked) {
      localStorage.setItem("savedEmail", email);
    }
  }, [email, checked]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          checked={checked}
          onChange={(e) => handleChange(e.target.checked)}
          className="h-7 w-7 text-emerald-400 focus:ring-emerald-400 border-white/50 rounded bg-white/10 transition-all duration-200 cursor-pointer"
        />
        <label
          htmlFor="remember"
          className="ml-2 block text-base italic text-white hover:text-black transition-colors cursor-pointer tracking-wider font-semibold"
        >
          Lembrar-me
        </label>
      </div>
    </div>
  );
}
