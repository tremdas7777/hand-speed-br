import { brand } from "@/lib/brand";
import { brl, FREE_SHIPPING_LABEL, FREE_SHIPPING_MIN, STANDARD_SHIPPING } from "@/lib/bundles";
import { jogosDe, KIT_HANDLE, OFERTAS, ofertaLabel, QTD_OPTION } from "@/lib/catalog-data";

export { jogosDe, KIT_HANDLE, OFERTAS, ofertaLabel, QTD_OPTION };

/** Oferta mais vendida (vem marcada na página do produto): 2 jogos, para o duelo lado a lado. */
export const OFERTA_PADRAO = 2;

/** Para que serve cada quantidade (linha pequena embaixo do nome da oferta). */
export const OFERTA_USO: Record<number, string> = {
  1: "Para treinar o reflexo em casa",
  2: "Duelo lado a lado: quem pega mais?",
  3: "Para presentear mais de uma criança",
};

/** O que vem na caixa de cada jogo (foto medidas.webp). */
export const NA_CAIXA = [
  { n: "1×", t: "Barra que solta os bastões", d: "38 cm, com bateria interna" },
  { n: "6×", t: "Bastões de espuma EVA", d: "20 cm, macios e com pontas arredondadas" },
  { n: "1×", t: "Controle remoto", d: "Velocidade, queda aleatória e bastão escolhido" },
  { n: "1×", t: "Cordão e gancho adesivo", d: "Para pendurar onde quiser" },
  { n: "1×", t: "Cabo USB-C", d: "Para carregar a bateria" },
] as const;

/** Jeitos de jogar (seção "Modos" da página do produto). `cai` = quais bastões aparecem caindo. */
export const MODOS = [
  {
    n: "01",
    name: "Queda aleatória",
    text: "A barra escolhe o bastão e ninguém sabe qual vai cair. Pegou antes do chão, ponto seu.",
    cai: [3],
  },
  {
    n: "02",
    name: "Bastão escolhido",
    text: "Pelo controle, alguém escolhe qual dos 6 cai (botões de 1 a 6). Ótimo para treinar ou pregar peça.",
    cai: [5],
  },
  {
    n: "03",
    name: "3 velocidades",
    text: "Comece na mais lenta com os pequenos e suba quando todo mundo pegar o jeito.",
    cai: [1],
  },
  {
    n: "04",
    name: "Duelo",
    text: "Com 2 jogos lado a lado, duas pessoas disputam ao mesmo tempo. Quem pegar mais, ganha.",
    cai: [2, 4],
  },
] as const;

/** Perguntas da página do produto e de /faq. */
export const FAQ_KIT: readonly { q: string; a: string }[] = [
  {
    q: "O que vem na caixa?",
    a: "Cada jogo vem com a barra, 6 bastões de espuma, o controle remoto, o cordão, o gancho adesivo e o cabo USB-C. Você escolhe 1, 2 ou 3 jogos.",
  },
  {
    q: "Como funciona o jogo?",
    a: "Pendure a barra, ligue e fique embaixo com a mão aberta. A barra solta os bastões um de cada vez, sem aviso, e você tem que pegar antes de cair no chão. Conte quantos pegou e passe a vez.",
  },
  {
    q: "Para que serve o controle remoto?",
    a: "Com ele você liga e desliga, troca a velocidade, liga a queda aleatória ou escolhe qual dos 6 bastões cai, pelos botões de 1 a 6. Assim um adulto comanda enquanto a criança joga. A barra também tem os botões de ligar e de velocidade.",
  },
  {
    q: "Precisa de pilha?",
    a: "A barra não usa pilha: a bateria é interna e recarrega pelo cabo USB-C que vem na caixa.",
  },
  {
    q: "Para qual idade é?",
    a: "A partir de 3 anos, começando pela velocidade mais lenta. Adultos jogam junto nas velocidades mais rápidas, então pais, avós e irmãos entram na disputa.",
  },
  {
    q: "Onde eu penduro?",
    a: "Pelo cordão, num puxador, numa porta ou num suporte, ou pelo gancho adesivo na parede. Deixe um espaço livre embaixo e longe de objetos que quebram.",
  },
  {
    q: "Os bastões machucam?",
    a: "Os bastões são de espuma EVA macia, com pontas arredondadas. Mesmo assim, crianças pequenas devem jogar com um adulto por perto.",
  },
  {
    q: "Por que levar 2 ou 3 jogos?",
    a: "Com 2 jogos dá para pendurar um ao lado do outro e disputar ao mesmo tempo: quem pegar mais bastões, ganha. Os 3 jogos são para quem vai presentear mais de uma criança, como irmãos, primos ou afilhados.",
  },
  {
    q: "Quando meu pedido chega?",
    a: `${FREE_SHIPPING_LABEL}${FREE_SHIPPING_MIN > 0 ? `; abaixo disso, o Frete Padrão custa ${brl(STANDARD_SHIPPING.price)} e chega em ${STANDARD_SHIPPING.days} dias úteis` : ""}. No frete grátis, o prazo médio é de ${brand.prazoEntrega} depois da confirmação do pagamento. Você recebe o código de rastreio por e-mail quando o pedido sai. O prazo é uma estimativa, não uma data garantida.`,
  },
  {
    q: "Como funciona a garantia?",
    a: `Você tem ${brand.garantiaDias} dias a partir da entrega para pedir a devolução do dinheiro. Fale com a gente dentro desse prazo para começar. As regras completas estão na página de garantia e devoluções.`,
  },
];

/** As 4 da home. */
export const FAQ_HOME = [FAQ_KIT[1]!, FAQ_KIT[4]!, FAQ_KIT[3]!, FAQ_KIT[8]!];
