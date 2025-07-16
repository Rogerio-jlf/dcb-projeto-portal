"use client";

import Image from "next/image";

export default function Headerlogin() {
  return (
    <div className="relative bg-gradient-to-r from-emerald-600/20 via-cyan-600/20 to-purple-600/20 backdrop-blur-sm pt-8 pb-4 px-6">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-t-3xl"></div>

      <div className="relative z-10 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center shadow-xl shadow-black">
          <Image
            src="/favicon_dcb.png"
            alt="Logo"
            width={64}
            height={64}
            className="w-20 h-20 object-cover"
          />
        </div>
        <h2 className="text-white text-5xl font-bold font-orbitron tracking-wider mb-1">DCB</h2>
        <p className="text-white text-xl font-semibold tracking-wider">
          Distribuidora Cirúrgica Brasileira
        </p>
      </div>

      {/* Ornamentos */}
      <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-sm animate-pulse delay-500"></div>
    </div>
  );
}
