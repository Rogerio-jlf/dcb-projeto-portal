"use client";

export default function CheckboxLogin() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          className="h-4 w-4 text-emerald-400 focus:ring-emerald-400 border-white/20 rounded bg-white/5 transition-all duration-200"
        />
        <label
          htmlFor="remember"
          className="ml-2 block text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          Lembrar-me
        </label>
      </div>

      <button
        type="button"
        className="text-sm text-white/70 hover:text-emerald-300 transition-colors duration-200 hover:underline"
      >
        Esqueceu a senha?
      </button>
    </div>
  );
}
