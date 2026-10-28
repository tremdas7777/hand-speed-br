import { brand } from "@/lib/brand";
import { FREE_SHIPPING_LABEL } from "@/lib/bundles";

const garantia = `Garantia de ${brand.garantiaDias} dias ou seu dinheiro de volta`;

/** Faixa do topo: três avisos no computador; no celular eles correm em fila. */
export function AnnouncementBar() {
  const mobile = [FREE_SHIPPING_LABEL, "Menos tela. Mais jogo.", garantia];
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {mobile.map((m) => (
        <li key={m} className="flex items-center px-5">
          <span className="mr-5 text-[var(--blue)]">✦</span>
          {m}
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="navy text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink)]"
      role="region"
      aria-label="Avisos da loja"
    >
      <div className="container-edge hidden h-8 items-center justify-between md:flex">
        <span>{FREE_SHIPPING_LABEL}</span>
        <span>
          Menos tela. <span className="text-[var(--blue)]">Mais jogo.</span>
        </span>
        <span>{garantia}</span>
      </div>
      <div className="overflow-hidden py-2 md:hidden">
        <div className="marquee">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
