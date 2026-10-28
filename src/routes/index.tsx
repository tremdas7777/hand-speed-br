import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Flame, Smile, Trophy, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import {
  Display,
  Eyebrow,
  FaqList,
  FinalCta,
  LimeLink,
  TextLink,
  Ticker,
} from "@/components/br/ui";
import { Barra, Bastao } from "@/components/br/KitSections";
import { brand } from "@/lib/brand";
import { brl, FREE_SHIPPING_LABEL, getBundle, FREE_SHIPPING_PHRASE } from "@/lib/bundles";
import { FAQ_HOME, KIT_HANDLE } from "@/lib/hand-speed";
import { seo, storeJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      path: "/",
      title: `Jogo de pegar o bastão para toda a família | ${brand.name}`,
      description: `Hand Speed: a barra solta 6 bastões de espuma sem aviso e você pega antes de cair. 3 velocidades, controle remoto e bateria USB-C. 1, 2 ou 3 jogos com ${FREE_SHIPPING_PHRASE}.`,
      imageAlt: `${brand.name}: jogo de reflexo para a família`,
      jsonLd: storeJsonLd(),
    }),
  component: Home,
});

const VANTAGENS = [
  { n: "01", Icon: Smile, title: "Crianças", text: "Treinam o reflexo brincando, longe da tela." },
  {
    n: "02",
    Icon: Trophy,
    title: "Adultos",
    text: "Na velocidade máxima, quase ninguém pega os 6.",
  },
  { n: "03", Icon: Users, title: "Avós, tios e amigos", text: "Ninguém fica de fora da roda." },
];

function Hero({ from }: { from: number }) {
  return (
    <section className="band-sky relative overflow-hidden border-b-[2.5px] border-[var(--edge)]">
      {/* Bastões caindo no fundo (enfeite). */}
      <Bastao className="absolute -left-3 top-10 hidden rotate-[-18deg] md:block" />
      <Bastao className="absolute bottom-8 left-[44%] hidden rotate-[24deg] scale-75 lg:block" />
      <div className="container-edge relative grid items-center gap-9 pb-12 pt-6 md:grid-cols-[1.05fr_1fr] md:gap-12 md:py-16 lg:gap-16">
        {/* Celular: foto em cima, texto embaixo. Computador: texto à esquerda, foto à direita. */}
        <div className="relative md:order-2">
          <div className="sticker rotate-[1.5deg] overflow-hidden bg-white">
            <img
              src="/produtos/reflexo-limpa.webp"
              alt="Menino tentando pegar o bastão que caiu da barra do Hand Speed na sala"
              width={1200}
              height={1200}
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover object-[50%_30%] md:aspect-[5/6]"
            />
          </div>
          <span className="absolute -bottom-5 -left-1 grid h-[92px] w-[92px] -rotate-12 place-items-center rounded-full border-[3px] border-[var(--edge)] bg-[var(--orange)] text-center font-display text-[17px] leading-[1.05] text-white shadow-[4px_4px_0_var(--edge)] md:-left-6 md:h-28 md:w-28 md:text-[21px]">
            Caiu?
            <br />
            Pegou!
          </span>
        </div>
        <div className="reveal md:order-1">
          <p className="inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-[var(--edge)] bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--ink)] shadow-[3px_3px_0_var(--edge)]">
            <Flame className="h-3.5 w-3.5 text-[var(--orange)]" strokeWidth={2.6} />O desafio de
            reflexo que viralizou
          </p>
          <Display
            as="h1"
            top={
              <>
                <span className="sr-only">Jogo de pegar o bastão para toda a família: </span>
                Pegue antes
                <br />
                de cair no
              </>
            }
            em="chão"
            br={false}
            className="mt-5 text-[44px] sm:text-[54px] md:text-[72px]"
          />
          <p className="mt-5 max-w-[340px] text-[15.5px] leading-relaxed text-[var(--ink)]">
            Seis bastões, nenhum aviso. Crianças, pais e avós no mesmo desafio.
          </p>
          <LimeLink to="/produto" className="mt-8 w-full max-w-[330px]">
            Ver o Hand Speed
          </LimeLink>
          <p className="mt-4 text-[12px] font-semibold text-[var(--ink)]">
            A partir de {brl(from)} <span className="mx-1.5 text-[var(--blue)]">•</span>{" "}
            {FREE_SHIPPING_LABEL}
          </p>
        </div>
      </div>
    </section>
  );
}

function MaisUma() {
  return (
    <section className="container-edge py-16 md:py-24">
      <div className="md:flex md:items-end md:justify-between md:gap-10">
        <div>
          <Eyebrow>Um jogo para todas as idades.</Eyebrow>
          <Display
            top="Menos “já vou.”"
            em="Mais “mais uma!”"
            className="mt-4 text-[38px] md:text-[56px]"
          />
        </div>
        <p className="mt-5 text-[14.5px] leading-relaxed text-[var(--slate)] md:mt-0 md:text-right">
          Uma competição amigável.
          <br />E muita risada junto.
        </p>
      </div>
      <ul className="mt-10 grid gap-3 md:grid-cols-3 md:gap-5">
        {VANTAGENS.map(({ n, Icon, title, text }, i) => (
          <li
            key={n}
            className={`card-soft relative flex items-center gap-5 overflow-hidden px-6 py-6 ${
              i === 1
                ? "!bg-[linear-gradient(135deg,var(--card-bg),var(--tint-lime))]"
                : "!bg-[linear-gradient(135deg,var(--card-bg),var(--tint-blue))]"
            }`}
          >
            <Icon className="h-6 w-6 shrink-0 text-[var(--blue)]" strokeWidth={1.6} />
            <div>
              <p className="text-[15px] font-bold text-[var(--ink)]">{title}</p>
              <p className="mt-1 text-[12.5px] text-[var(--slate)]">{text}</p>
            </div>
            <span className="pointer-events-none absolute -bottom-3 right-4 font-display text-[72px] font-extrabold leading-none text-[var(--blue)]/[0.07]">
              {n}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Presente() {
  return (
    <section className="navy speed-lines border-y-[2.5px] border-[var(--edge)]">
      <div className="container-edge grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="sticker relative -rotate-1 overflow-hidden border-[#ffd21f] shadow-[7px_7px_0_#ffd21f]">
          <img
            src="/produtos/natal-limpa.webp"
            alt="Duas crianças rindo e tentando pegar os bastões do Hand Speed perto da árvore de Natal"
            width={1200}
            height={960}
            loading="lazy"
            className="aspect-[5/4] w-full object-cover"
          />
          <span className="absolute left-4 top-4 -rotate-3 rounded-lg border-[2.5px] border-[#0b1640] bg-[#ffd21f] px-3 py-2 font-display text-[19px] uppercase leading-[1] text-[#0b1640] shadow-[3px_3px_0_#0b1640] md:text-[24px]">
            <span className="block font-sans text-[10px] font-bold tracking-[0.12em]">
              Presente do ano
            </span>
            para a família
          </span>
        </div>
        <div>
          <Eyebrow>Embrulhe um motivo para brincar.</Eyebrow>
          <Display
            top="Dê de presente"
            em="tempo juntos"
            className="mt-4 text-[38px] md:text-[54px]"
          />
          <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[var(--slate)]">
            Um presente de aniversário, de Natal ou de amigo secreto que tira todo mundo do sofá:
            irmãos, primos, pais e avós.
          </p>
          <ul className="mt-6 space-y-3 text-[13.5px] text-[var(--ink)]">
            {[
              "Um jogo para dividir",
              "Um motivo para reunir todo mundo",
              "Bateria recarregável: nada de gastar com pilha",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--lime)] text-[var(--on-lime)]">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.6} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <LimeLink to="/produto" hash="escolha-o-kit" className="mt-8 w-full max-w-[330px]">
            Escolher a quantidade
          </LimeLink>
          <p className="mt-3 text-[11.5px] text-[var(--slate)]">
            Para crianças a partir de 3 anos e adultos.
          </p>
        </div>
      </div>
    </section>
  );
}

function Desafio() {
  return (
    <section className="band-sky border-b-[2.5px] border-[var(--edge)]">
      <div className="container-edge grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="md:order-2">
          <div className="sticker relative rotate-1 overflow-hidden bg-white">
            <img
              src="/produtos/principal.webp"
              alt="Hand Speed: barra amarela com 6 bastões azuis, controle remoto, cordão, gancho, cabo USB-C e a caixa"
              width={1200}
              height={1200}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
        <div>
          <Eyebrow>Conheça o Hand Speed.</Eyebrow>
          <Display
            top="Seis bastões."
            em="Zero aviso."
            className="mt-4 text-[38px] md:text-[54px]"
          />
          <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-[var(--slate)]">
            A barra solta um bastão de cada vez, quando ninguém espera. Sua mão tem que chegar antes
            do chão.
          </p>
          <Barra cai={[4]} className="mt-8 max-w-[280px]" />
          <dl className="mt-12 flex gap-10">
            {[
              ["6", "Bastões de espuma"],
              ["3", "Velocidades"],
              ["1–6", "Bastão no controle"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-[44px] font-extrabold leading-none text-[var(--blue)]">
                  {v}
                </dt>
                <dd className="mt-1 text-[11.5px] text-[var(--slate)]">{l}</dd>
              </div>
            ))}
          </dl>
          <TextLink to="/produto" className="mt-9 w-full max-w-[260px]">
            Ver os detalhes
          </TextLink>
        </div>
      </div>
    </section>
  );
}

function Perguntas() {
  return (
    <section className="container-edge grid gap-10 pb-6 pt-4 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-10">
      <div>
        <Eyebrow>Respostas rápidas. Depois, jogo.</Eyebrow>
        <Display top="Antes de" em="começar." className="mt-4 text-[38px] md:text-[54px]" />
        <TextLink to="/produto" hash="perguntas" className="mt-8 w-full max-w-[260px]">
          Ver todos os detalhes
        </TextLink>
      </div>
      <FaqList items={FAQ_HOME} />
    </section>
  );
}

function Home() {
  const kit = getBundle(KIT_HANDLE);
  return (
    <SiteLayout>
      <Hero from={kit.price} />
      <Ticker
        items={["Para toda a família", "3 velocidades", "Controle remoto", "1 / 2 / 3 jogos"]}
      />
      <MaisUma />
      <Presente />
      <Desafio />
      <Perguntas />
      <FinalCta
        eyebrow="Um jogo. Muitas revanches."
        top="Seu próximo"
        em="“só mais uma.”"
        cta="Escolher meu jogo"
        note={`${FREE_SHIPPING_LABEL} · Garantia de ${brand.garantiaDias} dias`}
      />
    </SiteLayout>
  );
}
