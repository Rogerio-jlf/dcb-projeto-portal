export default function TextoLogin() {
  return (
    <div className="hidden md:flex items-center justify-center fixed left-0 top-0 h-full w-1/2 z-10 p-8">
      <div className="text-white max-w-md transition-all duration-1000 ease-out">
        <div className="text-7xl font-bold text-right mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
          DESDE 1978
        </div>
        <div className="text-3xl text-right font-extralight italic opacity-90 animate-fade-in">
          Servindo em <strong className="font-bold text-emerald-300">Alto Nível</strong> a
        </div>
        <div className="text-3xl text-right font-extralight italic opacity-90 animate-fade-in-delayed">
          <span className="text-cyan-300">comunidade médico hospitalar</span>
        </div>
        <div className="mt-8 flex justify-end">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
