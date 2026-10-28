import { productLabel, withVariantPrice, type Bundle } from "@/lib/bundles";
import { brand } from "@/lib/brand";

/** Upsell pós-compra (Pix e cartão): mais 1 unidade igual à comprada, com desconto. */
export const UPSELL_DISCOUNT = 0.5;

/** Nome do produto enviado ao gateway na cobrança de upsell no cartão. */
export const UPSELL_GATEWAY_NAME = brand.gatewayName;

/**
 * O produto como foi comprado: nome e preço da variação do pedido (ex.: 3 jogos),
 * achada pelo nome salvo no pedido. Sem variação reconhecida, fica o produto base.
 */
export function boughtBundle(base: Bundle, itemName: string | undefined): Bundle {
  const v = itemName
    ? base.variants?.find((x) => productLabel(base, x.values) === itemName)
    : undefined;
  return v ? { ...withVariantPrice(base, v.values), name: productLabel(base, v.values) } : base;
}

export const upsellPrice = (bundle: Bundle) =>
  Math.round(bundle.price * (1 - UPSELL_DISCOUNT) * 100) / 100;

/**
 * Pacotes de pilhas da base (Beam). O Hand Speed tem bateria interna, então a etapa das pilhas não
 * é mostrada (o pós-compra começa nas ofertas); os ids ficam para o servidor reconhecer o formato.
 */
export const BATTERY_PACKS = [
  { id: "pilhas2", jogadores: 2, price: 49.9 },
  { id: "pilhas4", jogadores: 4, price: 89.9 },
  { id: "pilhas8", jogadores: 8, price: 159.9 },
] as const;
export type BatteryPackId = (typeof BATTERY_PACKS)[number]["id"];
export const BATTERY_GATEWAY_NAME = "Pilhas recarregáveis com carregador";

export const batteryPack = (id: string) => BATTERY_PACKS.find((b) => b.id === id);
export const batteryLabel = (b: (typeof BATTERY_PACKS)[number]) =>
  `${b.jogadores * 6} pilhas AAA recarregáveis + carregador (${b.jogadores} jogadores)`;

/** Pacote de pilhas do tamanho do kit comprado (pelo nome da variação, ex.: "… 8 jogadores"). */
export function batteryPackFor(bundleName: string | undefined): BatteryPackId {
  const n = Number(bundleName?.match(/(\d+)\s*jogadores/i)?.[1]);
  return (BATTERY_PACKS.find((b) => b.jogadores === n) ?? BATTERY_PACKS[1]).id;
}

/** Ofertas do pós-compra (kit/seguro, depois envio expresso; as pilhas não aparecem nesta loja). */
export const UPSELL_PRODUCTS = [
  "pilhas2",
  "pilhas4",
  "pilhas8",
  "kit",
  "seguro",
  "expresso",
] as const;
export type UpsellProduct = (typeof UPSELL_PRODUCTS)[number];

/**
 * Etapas do pós-compra, cada uma com página e cobrança próprias: pilhas → ofertas (kit e/ou
 * seguro) → envio expresso.
 */
export type UpsellStep = "pilhas" | "ofertas" | "expresso";
export function upsellStepOf(products: readonly string[]): UpsellStep {
  if (products.includes("expresso")) return "expresso";
  if (products.some((p) => batteryPack(p))) return "pilhas";
  return "ofertas";
}

/** Seguro de entrega (pós-compra): reenvio ou reembolso em caso de extravio ou dano no transporte. */
export const SHIPPING_INSURANCE = {
  name: "Seguro de entrega",
  fullName: "Seguro de entrega — reenvio ou reembolso",
  /** Nome enviado ao gateway. */
  gatewayName: "Seguro de entrega",
  price: 29.9,
} as const;

/** Envio expresso: página própria depois da tela de ofertas (cobrança separada). */
export const EXPRESS_SHIPPING = {
  name: "Envio expresso",
  /** Nome enviado ao gateway. */
  gatewayName: "Envio expresso",
  price: 19.9,
} as const;

/**
 * O que o cliente escolheu na tela pós-compra, numa cobrança só (preços do servidor).
 * Itens repetidos ou desconhecidos são ignorados; a ordem segue UPSELL_PRODUCTS.
 */
export function upsellSelection(bundle: Bundle, chosen: readonly string[]) {
  const products = UPSELL_PRODUCTS.filter((p) => chosen.includes(p));
  const items = products.map((p) => {
    if (p === "kit")
      return {
        product: p,
        title: UPSELL_GATEWAY_NAME,
        price: upsellPrice(bundle),
        label: `Mais 1 unidade 50% OFF - ${bundle.name}`,
      };
    const b = batteryPack(p);
    if (b)
      return { product: p, title: BATTERY_GATEWAY_NAME, price: b.price, label: batteryLabel(b) };
    const o = p === "seguro" ? SHIPPING_INSURANCE : EXPRESS_SHIPPING;
    return { product: p, title: o.gatewayName, price: o.price, label: o.name };
  });
  const total = Math.round(items.reduce((s, i) => s + i.price * 100, 0)) / 100;
  return { products, items, total, label: items.map((i) => i.label).join(" + ") };
}
