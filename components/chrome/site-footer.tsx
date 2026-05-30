import Image from "next/image";
import { withBasePath } from "@/lib/stack-state";

export function SiteFooter() {
  const videoSrc = withBasePath("/media/agentic-warfare-chess.mp4");
  const posterSrc = withBasePath("/media/agentic-warfare-chess-poster.png");

  return (
    <footer className="relative isolate overflow-hidden border-t bg-black text-white">
      <div className="relative h-48 sm:h-56 lg:h-64">
        <Image
          src={posterSrc}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
        />
        <video
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
        <div className="relative flex h-full items-end">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5">
            <span className="text-xs uppercase tracking-[0.18em] text-white/70">Thunderforge</span>
            <a
              href="https://github.com/justin-graham/scale-jpp"
              className="text-sm font-medium text-white underline underline-offset-4 hover:text-white/80"
            >
              GitHub repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
