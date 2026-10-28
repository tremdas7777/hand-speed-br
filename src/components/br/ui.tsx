import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Título da marca: 1ª parte em azul-marinho, `em` em azul (na linha de baixo, se `br`). */
export function Display({
  top,
  em,
  after,
  br = true,
  as: Tag = "h2",
  className,
}: {
  top: ReactNode;
  em?: ReactNode;
  after?: ReactNode;
  br?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag className={cn("display text-balance", className)}>
      {top}
      {em && (
        <>
          {br ? <br /> : " "}
          <em>{em}</em>
        </>
      )}
      {after}
    </Tag>
  );
}

export function Eyebrow({
  children,
  dot,
  className,
}: {
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-2", className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-[var(--lime-deep)]" />}
      {children}
    </p>
  );
}

/** Faixa com os destaques separados por ✦. `big` = versão grande (página do kit). */
export function Ticker({ items, big }: { items: readonly string[]; big?: boolean }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className={cn("flex items-center", big ? "px-8" : "px-7")}>
          <span className={cn("text-[var(--blue)]", big ? "mr-16 text-sm" : "mr-14 text-[10px]")}>
            ✦
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className={cn(
        "navy overflow-hidden border-y-[2.5px] border-[var(--edge)] text-[var(--ink)]",
        big
          ? "py-5 font-display text-[22px] uppercase tracking-[0.02em] md:text-[26px]"
          : "py-4 text-[10px] font-bold uppercase tracking-[0.16em]",
      )}
    >
      <div className="marquee [animation-duration:30s]">
        {row(false)}
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}

const ctaBase = "btn-lime h-[52px] px-5 md:h-14 md:px-6";

/** Botão verde-limão com seta. */
export function LimeLink({
  to,
  hash,
  children,
  className,
}: {
  to: "/" | "/produto";
  hash?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} hash={hash} className={cn(ctaBase, className)}>
      {children}
      <ArrowUpRight className="h-5 w-5 shrink-0" strokeWidth={2.4} />
    </Link>
  );
}

export function LimeButton({
  onClick,
  children,
  className,
  disabled,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(ctaBase, "disabled:opacity-60", className)}
    >
      {children}
    </button>
  );
}

/** Link azul sublinhado com seta ("VER O KIT ↗"). */
export function TextLink({
  to,
  hash,
  children,
  className,
}: {
  to: "/" | "/produto";
  hash?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} hash={hash} className={cn("text-link", className)}>
      {children}
      <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
    </Link>
  );
}

/** Perguntas em sanfona (cada uma abre e fecha). */
export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="border-t border-[var(--line)]">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-[var(--line)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[14.5px] font-bold text-[var(--ink)] [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus
              className="h-4 w-4 shrink-0 text-[var(--blue)] transition group-open:rotate-45"
              strokeWidth={2.6}
            />
          </summary>
          <p className="-mt-1 pb-5 pr-8 text-[14px] leading-relaxed text-[var(--slate)]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Chamada final num cartão amarelo de adesivo. */
export function FinalCta({
  eyebrow,
  top,
  em,
  cta,
  note,
}: {
  eyebrow: string;
  top: ReactNode;
  em: ReactNode;
  cta: string;
  note: string;
}) {
  return (
    <section className="container-edge py-14 md:py-20">
      <div className="band-sky relative overflow-hidden rounded-[1.5rem] border-[3px] border-[var(--edge)] px-6 py-14 text-center shadow-[8px_8px_0_var(--edge)] md:py-20">
        <div className="relative">
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
          <Display top={top} em={em} className="mx-auto mt-4 text-[34px] md:text-[54px]" />
          <LimeLink
            to="/produto"
            hash="escolha-o-kit"
            className="mx-auto mt-8 w-full max-w-[290px]"
          >
            {cta}
          </LimeLink>
          <p className="mt-4 text-[12px] text-[var(--slate)]">{note}</p>
        </div>
      </div>
    </section>
  );
}
