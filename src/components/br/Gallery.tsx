import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Galeria do kit: foto grande com setas e contador, miniaturas embaixo. No celular, arrasta. */
export function Gallery({ images, alt, chip }: { images: readonly string[]; alt: string; chip: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => setI(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (n: number) => {
    const el = ref.current;
    if (!el) return;
    const next = (n + images.length) % images.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    setI(next);
  };

  return (
    <div>
      <div className="sticker relative overflow-hidden bg-white">
        <div
          ref={ref}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, n) => (
            <img
              key={src}
              src={src}
              alt={n === 0 ? alt : `${alt}: foto ${n + 1}`}
              width={1200}
              height={1200}
              loading={n === 0 ? "eager" : "lazy"}
              fetchPriority={n === 0 ? "high" : undefined}
              className="aspect-square w-full shrink-0 snap-center object-cover"
            />
          ))}
        </div>
        <span className="absolute left-3 top-3 flex -rotate-2 items-center gap-2 rounded-full border-2 border-[var(--edge)] bg-[var(--lime)] px-3 py-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-[var(--on-lime)] shadow-[2px_2px_0_var(--edge)]">
          {chip}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          aria-label="Foto anterior"
          onClick={() => go(i - 1)}
          className="grid h-11 w-11 place-items-center rounded-full border-2 border-[var(--edge)] bg-white text-[var(--ink)] shadow-[2px_2px_0_var(--edge)] transition hover:bg-[var(--lime)]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
        </button>
        <p className="text-[12px] font-bold text-[var(--ink)]">
          {i + 1} <span className="mx-1 text-[var(--slate)]">/</span>{" "}
          <span className="text-[var(--slate)]">{images.length}</span>
        </p>
        <button
          type="button"
          aria-label="Próxima foto"
          onClick={() => go(i + 1)}
          className="grid h-11 w-11 place-items-center rounded-full border-2 border-[var(--edge)] bg-white text-[var(--ink)] shadow-[2px_2px_0_var(--edge)] transition hover:bg-[var(--lime)]"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>

      <div className="mt-4 hidden gap-2.5 md:flex">
        {images.map((src, n) => (
          <button
            key={src}
            type="button"
            aria-label={`Ver foto ${n + 1}`}
            onClick={() => go(n)}
            className={cn(
              "h-16 w-16 overflow-hidden rounded-lg border-2 transition",
              n === i ? "border-[var(--blue)]" : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-2 text-[11.5px] text-[var(--slate)]">
        <span className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#ffd21f]" />
          <span className="h-2 w-2 rounded-full bg-[#2f6ff0]" />
        </span>
        Na foto: 1 jogo completo
      </p>
    </div>
  );
}
