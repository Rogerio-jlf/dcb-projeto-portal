"use client";

import { ArrowRight } from "lucide-react";

interface LoginButtonProps {
  isLoading: boolean;
}

export default function ButtonLogin({ isLoading }: LoginButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex justify-center tracking-wider italic items-center py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg text-2xl font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-90 relative overflow-hidden"
    >
      {isLoading ? (
        <>
          {/* Loading spinner customizado */}
          <div className="relative mr-2">
            <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-7 h-7 border-3 border-transparent border-t-white/60 rounded-full animate-spin animation-delay-150"></div>
          </div>

          {/* Texto com animação */}
          <span className="flex items-center">
            Acessando
            <span className="ml-1 flex">
              <span className="animate-pulse animation-delay-0 text-4xl leading-none">.</span>
              <span className="animate-pulse animation-delay-150 text-4xl leading-none">.</span>
              <span className="animate-pulse animation-delay-300 text-4xl leading-none">.</span>
            </span>
          </span>
        </>
      ) : (
        <>
          Entrar <ArrowRight className="ml-2 h-7 w-7" />
        </>
      )}

      {/* Efeito shimmer durante loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer -skew-x-12"></div>
      )}
    </button>
  );
}
