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
      className="relative flex w-full transform items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 text-2xl font-medium tracking-wider text-white italic transition-all duration-300 hover:scale-105 hover:from-emerald-600 hover:to-cyan-600 hover:shadow-2xl focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none active:scale-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? (
        <>
          {/* Loading spinner customizado */}
          <div className="relative mr-2">
            <div className="h-7 w-7 animate-spin rounded-full border-3 border-white/30 border-t-white"></div>
            <div className="animation-delay-150 absolute inset-0 h-7 w-7 animate-spin rounded-full border-3 border-transparent border-t-white/60"></div>
          </div>

          {/* Texto com animação */}
          <span className="flex items-center">
            Acessando
            <span className="ml-1 flex">
              <span className="animation-delay-0 animate-pulse text-4xl leading-none">
                .
              </span>
              <span className="animation-delay-150 animate-pulse text-4xl leading-none">
                .
              </span>
              <span className="animation-delay-300 animate-pulse text-4xl leading-none">
                .
              </span>
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
        <div className="animate-shimmer absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      )}
    </button>
  );
}
