"use client";

export default function CheckboxLogin() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember"
          name="remember"
          type="checkbox"
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
