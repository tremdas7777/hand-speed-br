/**
 * Marca da loja.
 * PREENCHA `cnpj` e `whatsapp` com os dados da sua empresa antes de vender.
 */
export const brand = {
  name: "HAND SPEED",
  /** Endereço oficial da loja. PROVISÓRIO: troque pelo domínio próprio quando ele existir. */
  siteUrl: "https://hand-speed-br.vercel.app",
  /** Linha pequena embaixo do nome no logo. */
  logoTagline: "Desafio de reflexo",
  productName: "Hand Speed — Desafio do Bastão",
  /** Nome genérico que aparece na fatura do cliente (gateways Pix e cartão). */
  gatewayName: "HAND SPEED",
  tagline: "Caiu? Pegou!",
  taglineShort: "O jogo de reflexo da família",
  manufacturer: "HAND SPEED",
  manufacturerTagline: "Desafio de reflexo",
  /** Cidade da loja (entregas por motoboy). Vazio = não mostra. */
  city: "" as string,
  cnpj: "64.756.111/0001-05",
  /** Ex.: "@sualoja". Vazio = não mostra. */
  instagram: "" as string,
  whatsapp: {
    /**
     * Número inicial em E.164 (55 + DDD + número), sem símbolos. Depois de trocado no
     * admin (Configurações da loja → Botão de WhatsApp), vale o do admin. Vazio = oculto.
     */
    phoneE164: "5585958549956",
    /** Mensagem pronta do link. O número atende várias lojas, então ela diz de qual o cliente veio. */
    message: "Olá! Vim pelo site da HAND SPEED e quero saber mais sobre o jogo do bastão.",
  },
  /** Prazo de entrega mostrado na loja (o mesmo do frete grátis no checkout). */
  prazoEntrega: "7 a 10 dias úteis",
  /** Garantia de devolução do dinheiro, em dias contados da entrega. */
  garantiaDias: 30,
  colors: {
    primary: "#ffd21f",
    primaryDark: "#e0b300",
    primaryDeep: "#0b1640",
    onPrimary: "#0b1640",
    surfaceTint: "#f4f8ff",
  },
} as const;
