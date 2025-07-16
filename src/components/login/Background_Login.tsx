import Image from "next/image";

export default function BackgroundLogin() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0">
        <Image
          src="/image.png"
          alt="Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          style={{ objectFit: "cover" }}
          className="w-full h-full object-cover object-center brightness-90"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-black/40"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
}
