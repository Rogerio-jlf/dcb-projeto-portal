export default function TextoLogin() {
  return (
    <div className="fixed top-0 left-0 z-10 hidden h-full w-1/2 items-center justify-center p-8 md:flex">
      <div className="max-w-md text-white transition-all duration-1000 ease-out">
        <div className="mb-4 animate-pulse bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-right text-7xl font-bold text-transparent">
          DESDE 1978
        </div>
        <div className="animate-fade-in text-right text-3xl font-extralight italic opacity-90">
          Servindo em{" "}
          <strong className="font-bold text-emerald-300">Alto Nível</strong> a
        </div>
        <div className="animate-fade-in-delayed text-right text-3xl font-extralight italic opacity-90">
          <span className="text-cyan-300">comunidade médico hospitalar</span>
        </div>
        <div className="mt-8 flex justify-end">
          <div className="h-1 w-32 animate-pulse rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-cyan-400"></div>
        </div>
      </div>
    </div>
  );
}
