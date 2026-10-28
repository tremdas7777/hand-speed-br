import { Truck } from "lucide-react";
import { FREE_SHIPPING_MIN, isFreeShippingEligible } from "@/lib/bundles";
import { cn } from "@/lib/utils";
import { brl } from "./parts";

/** Barra "faltam R$ X para frete grátis". `subtotal` = só os kits (embrulho e garantia não contam). */
export function FreeShippingProgress({
  subtotal,
  hint,
  upgrade,
  className,
}: {
  subtotal: number;
  /** Opção que já sai com frete grátis (ex.: "3 jogos"): troca o "faltam R$ X" por ela, sem barra. */
  hint?: string | null;
  /** Troca o pedido para a opção `hint` com um clique (só na etapa do frete). */
  upgrade?: { extra: number; onClick: () => void } | undefined;
  className?: string;
}) {
  const eligible = isFreeShippingEligible(subtotal);
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_MIN) * 100));
  const showHint = !eligible && !!hint;

  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 text-[13px]",
        eligible ? "border-[var(--ck-ok)] bg-[var(--ck-badge)]/40" : "border-amber-300 bg-amber-50",
        className,
      )}
    >
      <p className="flex items-center gap-2">
        <Truck
          className={cn("h-4 w-4 shrink-0", eligible ? "text-[var(--ck-ok)]" : "text-amber-600")}
        />
        {eligible ? (
          <span>
            Parabéns! Você ganhou <b className="text-[var(--ck-ok)]">FRETE GRÁTIS</b>
          </span>
        ) : showHint ? (
          <span>
            O kit de <b>{hint}</b> já sai com <b>FRETE GRÁTIS</b>
          </span>
        ) : (
          <span>
            Faltam <b>{brl(FREE_SHIPPING_MIN - subtotal)}</b> em kits para você ganhar{" "}
            <b>FRETE GRÁTIS</b>
          </span>
        )}
      </p>
      {showHint && upgrade && (
        <div className="mt-3 space-y-2">
          <p className="text-[12.5px] text-amber-950">
            Por mais <b>{brl(upgrade.extra)}</b> você leva o kit de {hint} e não paga frete.
          </p>
          <button
            type="button"
            onClick={upgrade.onClick}
            className="w-full rounded-md bg-[var(--ck-ok)] px-4 py-2.5 text-[13.5px] font-bold text-white transition-opacity hover:opacity-90"
          >
            Trocar para {hint}
          </button>
        </div>
      )}
      {!showHint && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              eligible ? "bg-[var(--ck-ok)]" : "bg-amber-500",
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}
