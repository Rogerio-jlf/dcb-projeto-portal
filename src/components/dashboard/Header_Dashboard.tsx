"use client";

export function HeaderDashboard() {
  return (
    <>
      {/* TÍTULO DESKTOP */}
      <div className="hidden h-full w-full items-center justify-center tracking-wider md:flex">
        <h2 className="bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 bg-clip-text text-5xl font-bold text-transparent">
          Dashboard
        </h2>
      </div>

      {/* TÍTULO MOBILE */}
      <div className="rounded-md bg-emerald-600 p-4 tracking-widest shadow-md shadow-gray-300 transition-colors duration-300 md:hidden dark:bg-emerald-700 dark:shadow-black">
        <h2 className="text-left text-2xl font-bold text-white italic">
          Dashboard
        </h2>
      </div>
    </>
  );
}
