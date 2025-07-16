"use client";

import { Loader2, ArrowRight } from "lucide-react";

interface LoginButtonProps {
  isLoading: boolean;
}

export default function ButtonLogin({ isLoading }: LoginButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex justify-center tracking-wider italic items-center py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg text-2xl font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-90"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin h-7 w-7 mr-2" />
          Acessando...
        </>
      ) : (
        <>
          Entrar <ArrowRight className="ml-2 h-7 w-7" />
        </>
      )}
    </button>
  );
}
