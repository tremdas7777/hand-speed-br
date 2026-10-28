/**
 * Formato do catálogo como vem do banco (tabelas collections / products / product_variants).
 * A loja monta os produtos da vitrine (src/lib/bundles.ts) a partir disto; o importador CSV
 * do admin grava neste mesmo formato.
 */

export type CatalogCollection = {
  slug: string;
  name: string;
  description: string;
  image: string | null;
  sort: number;
};

export type CatalogVariant = {
  /** Valores na ordem das opções do produto (ex.: ["Preto", "42"]). */
  values: string[];
  sku: string | null;
  price: number;
  compareAtPrice: number | null;
  /** null = sem controle de estoque (sempre disponível). */
  stock: number | null;
  image: string | null;
};

export type CatalogProduct = {
  handle: string;
  title: string;
  /** Texto da descrição (parágrafos separados por linha em branco). */
  description: string;
  productType: string | null;
  vendor: string | null;
  tags: string[];
  /** Coleções (slugs); a primeira é a principal. */
  collections: string[];
  options: { name: string; values: string[] }[];
  variants: CatalogVariant[];
  images: string[];
  sort: number;
};

export type CatalogData = {
  collections: CatalogCollection[];
  products: CatalogProduct[];
  /** "db" = veio do banco; "seed" = catálogo inicial do código (banco vazio ou desligado). */
  source: "db" | "seed";
  /** Muda quando o catálogo muda (evita remontar a vitrine à toa). */
  version?: string;
};

/**
 * Catálogo inicial: o Hand Speed (jogo de pegar o bastão), vendido em 1, 2 ou 3 unidades.
 * Preços: R$ 67 (1 jogo), R$ 97 (2) e R$ 127 (3), os mesmos da Beam. O "de" (riscado) é
 * PROVISÓRIO: R$ 99,90 por jogo — confirme antes de vender.
 */
export const KIT_HANDLE = "hand-speed";
export const QTD_OPTION = "Quantidade";

const POR_JOGO_CHEIO = 99.9;

export const OFERTAS = [
  { jogos: 1, price: 67 },
  { jogos: 2, price: 97 },
  { jogos: 3, price: 127 },
] as const;

/** "1 jogo", "2 jogos" (o nome da variação). */
export const ofertaLabel = (n: number) => `${n} ${n === 1 ? "jogo" : "jogos"}`;

/** Lê "2 jogos" → 2 (1 se não achar o número). */
export const jogosDe = (label: string | undefined) =>
  Number(label?.match(/(\d+)\s*jogos?/i)?.[1]) || 1;

const r2 = (n: number) => Math.round(n * 100) / 100;

export const SEED_COLLECTIONS: CatalogCollection[] = [
  {
    slug: "jogos-de-reflexo",
    name: "Jogos de reflexo",
    description: "Desafios de reflexo para jogar em casa, com a família e os amigos",
    image: "/produtos/principal.webp",
    sort: 0,
  },
];

export const SEED_PRODUCTS: CatalogProduct[] = [
  {
    handle: KIT_HANDLE,
    title: "Hand Speed — Desafio do Bastão",
    description: [
      "O desafio de reflexo que viralizou: a barra solta os 6 bastões de espuma sem aviso e você tem que pegar antes de cair no chão. Quem pegar mais, ganha.",
      "São 3 velocidades e aviso por voz. Pelo controle remoto dá para ligar a queda aleatória ou escolher qual bastão cai. A bateria é interna e carrega pelo cabo USB-C que vem na caixa.",
      "Pendure com o cordão ou com o gancho adesivo. Os bastões são de espuma EVA macia, com pontas arredondadas. A partir de 3 anos.",
    ].join("\n\n"),
    productType: "Jogo de reflexo",
    vendor: "HAND SPEED",
    tags: ["reflexo", "jogo-em-familia"],
    collections: ["jogos-de-reflexo"],
    options: [{ name: QTD_OPTION, values: OFERTAS.map((o) => ofertaLabel(o.jogos)) }],
    variants: OFERTAS.map((o) => ({
      values: [ofertaLabel(o.jogos)],
      sku: `HS-BASTAO-${o.jogos}`,
      price: o.price,
      compareAtPrice: r2(o.jogos * POR_JOGO_CHEIO),
      stock: null,
      image: null,
    })),
    images: [
      "/produtos/principal.webp",
      "/produtos/reflexo.webp",
      "/produtos/controle.webp",
      "/produtos/espuma.webp",
      "/produtos/natal.webp",
      "/produtos/medidas.webp",
    ],
    sort: 0,
  },
];

export const SEED_CATALOG: CatalogData = {
  collections: SEED_COLLECTIONS,
  products: SEED_PRODUCTS,
  source: "seed",
};
