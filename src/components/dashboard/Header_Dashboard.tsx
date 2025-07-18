"use client";

export function HeaderDashboard() {
  return (
    <>
      {/* TÍTULO DESKTOP */}
      <div className="hidden md:flex items-center justify-center w-full h-full tracking-wider">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 bg-clip-text text-transparent">
          Dashboard
        </h2>
      </div>

      {/* TÍTULO MOBILE */}
      <div className="md:hidden bg-emerald-700 p-4 rounded-md shadow-md shadow-black tracking-widest">
        <h2 className="text-2xl italic font-bold text-white text-left">Dashboard</h2>
      </div>
    </>
  );
}
