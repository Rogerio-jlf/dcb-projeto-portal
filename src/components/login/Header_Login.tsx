"use client";

import Image from "next/image";

export default function Headerlogin() {
  return (
    <div className="relative bg-gradient-to-r from-emerald-600/20 via-cyan-600/20 to-purple-600/20 px-6 pt-8 pb-4 backdrop-blur-sm">
      <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"></div>

      <div className="relative z-10 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-xl shadow-black">
          <Image
            src="/favicon_dcb.png"
            alt="Logo"
            width={64}
            height={64}
            className="h-20 w-20 object-cover"
          />
        </div>
        <h2 className="font-orbitron mb-1 text-5xl font-bold tracking-wider text-white">
          DCB
        </h2>
        <p className="text-xl font-semibold tracking-wider text-white">
          Distribuidora Cirúrgica Brasileira
        </p>
      </div>

      {/* Ornamentos */}
      <div className="absolute top-4 right-4 h-10 w-10 animate-pulse rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 blur-sm"></div>
      <div className="absolute bottom-4 left-4 h-6 w-6 animate-pulse rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20 blur-sm delay-500"></div>
    </div>
  );
}
