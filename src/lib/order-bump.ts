import { brand } from "@/lib/brand";

/**
 * Order bumps do checkout ("leve junto"): itens SEM variação (não pedem tamanho/cor), como
 * meias, cuecas em kit fechado ou acessórios. Preços usados no servidor — o cliente só exibe.
 *
 * Lista vazia = o checkout não mostra a oferta. Exemplo de item:
 * {
 *   id: "meias3",
 *   name: "Kit 3 pares de meias",
 *   fullName: "Kit 3 pares de meias cano médio",
 *   gatewayName: `${brand.gatewayName} Meias`,
 *   price: 29.9,
 *   compareAt: 49.9,
 *   img: "/produtos/meias.webp",
 *   question: "Que tal levar as meias junto?",
 *   body: "Três pares de meias cano médio, no mesmo pacote do seu pedido.",
 *   benefits: ["3 pares", "Vai na mesma caixa, sem frete extra"],
 *   cta: "Sim! Quero as meias por +",
 * }
 */
export type BumpId = string;

export type OrderBumpItem = {
  id: BumpId;
  name: string;
  fullName: string;
  /** Nome genérico enviado ao gateway (fatura). */
  gatewayName: string;
  price: number;
  /** Preço "de" (riscado). Sem ele, a oferta mostra só o preço. */
  compareAt?: number;
  img: string;
  /** Texto de venda da oferta. */
  question: string;
  body: string;
  benefits: readonly string[];
  /** Texto do botão; o preço vai no fim ("Sim! Quero por + R$ 29,90"). */
  cta: string;
  /** Linha abaixo do preço. Sem ela: "Vai na mesma caixa do seu pedido — sem frete extra." */
  note?: string;
  /** Bumps do mesmo grupo viram um card só com opções; o cliente leva no máximo um deles. */
  group?: string;
  /** Texto da opção dentro do card do grupo (ex.: "12 meses"). */
  optionLabel?: string;
  /** Linha pequena abaixo da opção (ex.: "R$ 1,24/mês"). */
  optionSub?: string;
  /** Página com as condições, linkada no card. */
  termsHref?: string;
};

export const ORDER_BUMPS: readonly OrderBumpItem[] = [
  {
    id: "presente",
    name: "Embrulho de presente",
    fullName: "Embrulho de presente com cartão",
    gatewayName: `${brand.gatewayName} Embrulho`,
    price: 9.9,
    img: "/produtos/embrulho-presente.webp",
    question: "Vai dar de presente? A gente embrulha pra você!",
    body: "Seu jogo chega embrulhado em papel de presente, com laço e um cartãozinho para a dedicatória. É só entregar.",
    benefits: [
      "Papel de presente e laço",
      "Cartão para escrever a dedicatória",
      "Chega pronto para entregar",
    ],
    cta: "Sim! Quero embrulhado para presente por +",
    note: "Seu pedido chega embrulhado — sem frete extra.",
  },
  ...([12, 24] as const).map((meses) => ({
    id: `garantia${meses}`,
    name: `Garantia estendida ${meses} meses`,
    fullName: `Garantia estendida de ${meses} meses`,
    gatewayName: `${brand.gatewayName} Garantia`,
    price: meses === 12 ? 14.9 : 22.9,
    img: "/produtos/garantia-estendida.svg",
    question: "Proteja seu jogo por mais tempo",
    body: "Se a barra ou o controle parar de funcionar, a gente manda uma peça nova, com frete por nossa conta.",
    benefits: [
      "Troca da peça com defeito, sem custo",
      "Frete da troca por nossa conta",
      "Atendimento pelo WhatsApp",
    ],
    cta: "Sim! Quero a garantia estendida por +",
    note: "Vale a partir da entrega do pedido.",
    group: "garantia",
    optionLabel: `${meses} meses`,
    optionSub: `R$ ${((meses === 12 ? 14.9 : 22.9) / meses).toFixed(2).replace(".", ",")}/mês`,
    termsHref: "/garantia-estendida",
  })),
];

/** Nome da loja na fatura dos bumps (use em `gatewayName`). */
export const BUMP_GATEWAY_PREFIX = brand.gatewayName;

/**
 * Bumps escolhidos, na ordem do checkout (ids repetidos ou desconhecidos são ignorados).
 * De cada grupo vale só um: o primeiro que o cliente mandou.
 */
export const getBumps = (ids: readonly string[]) => {
  const grupos = new Set<string>();
  const out: OrderBumpItem[] = [];
  for (const id of ids) {
    const b = ORDER_BUMPS.find((x) => x.id === id);
    if (!b || out.includes(b) || (b.group && grupos.has(b.group))) continue;
    if (b.group) grupos.add(b.group);
    out.push(b);
  }
  return ORDER_BUMPS.filter((b) => out.includes(b));
};

/** Bumps sem grupo e grupos (um card por grupo), na ordem da lista. */
export const bumpCards = (items: readonly OrderBumpItem[]) => {
  const cards: (OrderBumpItem | OrderBumpItem[])[] = [];
  for (const b of items) {
    if (!b.group) cards.push(b);
    else {
      const g = cards.find((c): c is OrderBumpItem[] => Array.isArray(c) && c[0]?.group === b.group);
      if (g) g.push(b);
      else cards.push([b]);
    }
  }
  return cards;
};

/** Soma dos bumps escolhidos, em reais. */
export const bumpsTotal = (ids: readonly string[]) =>
  Math.round(getBumps(ids).reduce((s, b) => s + b.price * 100, 0)) / 100;
