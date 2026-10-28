import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import type { OrderBumpItem } from "@/lib/order-bump";
import { cn } from "@/lib/utils";
import { brl } from "./parts";

/** Surge (aparece e sobe) quando o cliente rola até o elemento. Sem suporte, já fica visível. */
function useReveal(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(!enabled);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === "undefined") return setShown(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);
  return { ref, shown };
}

/** Oferta adicional (order bump) logo acima do botão de finalizar. */
export function OrderBump({
  bump,
  checked,
  onChange,
  reveal = false,
}: {
  bump: OrderBumpItem;
  checked: boolean;
  onChange: (v: boolean) => void;
  /** Surge com animação quando o cliente rola até ele (usado do segundo bump em diante). */
  reveal?: boolean;
}) {
  const { ref, shown } = useReveal(reveal);
  const off = bump.compareAt ? Math.round((1 - bump.price / bump.compareAt) * 100) : 0;
  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-lg border-2 border-dashed transition-[border-color,background-color,opacity,translate] duration-700 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        checked
          ? "border-[var(--ck-ok)] bg-[var(--ck-ok)]/[0.04]"
          : "border-amber-400 bg-amber-50/60",
      )}
    >
      <div className="bg-amber-400 px-4 py-1.5 text-center text-[12px] font-bold uppercase tracking-wide text-amber-950">
        Oferta exclusiva — só aparece nesta tela
      </div>

      <div className="p-4">
        <p className="text-[14px] font-semibold leading-snug">{bump.question}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{bump.body}</p>

        <div className="mt-4 flex gap-4">
          <img
            src={bump.img}
            alt={bump.fullName}
            width={88}
            height={88}
            loading="lazy"
            className="h-[88px] w-[88px] shrink-0 rounded-md border border-border bg-white object-contain"
          />
          <ul className="space-y-1.5 text-[12.5px] leading-snug">
            {bump.benefits.map((b) => (
              <li key={b} className="flex gap-1.5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ck-ok)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {bump.compareAt && (
            <span className="text-[13px] text-muted-foreground line-through">
              {brl(bump.compareAt)}
            </span>
          )}
          <span className="text-[20px] font-bold text-[var(--ck-ok)]">{brl(bump.price)}</span>
          {off > 0 && (
            <span className="rounded bg-[var(--ck-badge)] px-1.5 py-0.5 text-[11px] font-bold text-[var(--ck-ok)]">
              {off}% OFF
            </span>
          )}
          <span className="w-full text-[12px] text-muted-foreground">
            {bump.note ?? "Vai na mesma caixa do seu pedido — sem frete extra."}
          </span>
        </div>

        <label
          className={cn(
            "mt-4 flex cursor-pointer items-center gap-3 rounded-md border-2 px-3 py-3 transition-colors",
            checked
              ? "border-[var(--ck-ok)] bg-white"
              : "border-amber-400 bg-white animate-pulse [animation-duration:2.5s]",
          )}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-5 w-5 shrink-0 accent-[var(--ck-ok)]"
          />
          <span className="text-[13.5px] font-semibold leading-snug">
            {checked
              ? `Adicionado! ${bump.name} incluído no seu pedido.`
              : `${bump.cta} ${brl(bump.price)}`}
          </span>
        </label>
      </div>
    </div>
  );
}

/** Oferta com opções do mesmo grupo (ex.: garantia de 12 ou 24 meses): no máximo uma marcada. */
export function OrderBumpChoice({
  options,
  selected,
  onChange,
  reveal = false,
}: {
  options: readonly OrderBumpItem[];
  /** Id marcado, ou null. */
  selected: string | null;
  /** Id escolhido; null desmarca (clique de novo na opção marcada). */
  onChange: (id: string | null) => void;
  reveal?: boolean;
}) {
  const { ref, shown } = useReveal(reveal);
  const first = options[0];
  if (!first) return null;
  const chosen = options.find((o) => o.id === selected);
  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-lg border-2 border-dashed transition-[border-color,background-color,opacity,translate] duration-700 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        chosen
          ? "border-[var(--ck-ok)] bg-[var(--ck-ok)]/[0.04]"
          : "border-amber-400 bg-amber-50/60",
      )}
    >
      <div className="p-4">
        <p className="text-[14px] font-semibold leading-snug">{first.question}</p>

        <div className="mt-3 flex gap-4">
          <img
            src={first.img}
            alt={first.name}
            width={72}
            height={72}
            loading="lazy"
            className="h-[72px] w-[72px] shrink-0 rounded-md border border-border bg-white object-contain"
          />
          <ul className="space-y-1.5 text-[12.5px] leading-snug">
            {first.benefits.map((b) => (
              <li key={b} className="flex gap-1.5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ck-ok)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 space-y-2">
          {options.map((o) => {
            const on = o.id === selected;
            return (
              <label
                key={o.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md border-2 bg-white px-3 py-3 transition-colors",
                  on ? "border-[var(--ck-ok)]" : "border-amber-400",
                )}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={(e) => onChange(e.target.checked ? o.id : null)}
                  className="h-5 w-5 shrink-0 accent-[var(--ck-ok)]"
                />
                <span className="min-w-0 flex-1 text-[13.5px] font-semibold leading-snug">
                  {o.optionLabel ?? o.name}
                  {o.optionSub && (
                    <span className="block text-[11.5px] font-normal text-muted-foreground">
                      {o.optionSub}
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-[14px] font-bold text-[var(--ck-ok)]">+ {brl(o.price)}</span>
              </label>
            );
          })}
        </div>

        <p className="mt-3 text-[12px] text-muted-foreground">
          {chosen ? `Adicionado! ${chosen.name} incluída no seu pedido. ` : `${first.note ?? ""} `}
          {first.termsHref && (
            <a
              href={first.termsHref}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[var(--ck-blue)] underline"
            >
              Ver condições
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
