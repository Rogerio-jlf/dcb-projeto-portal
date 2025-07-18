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
          className="h-full w-full object-cover object-center brightness-90"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-black/40"></div>
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-emerald-500/15 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-500/15 blur-3xl delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-purple-500/10 blur-2xl delay-500"></div>
      </div>
    </div>
  );
}
