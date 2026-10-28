import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, PhoneOff, RefreshCw, Users } from "lucide-react";
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
import { Barra } from "@/components/br/KitSections";
import { brand } from "@/lib/brand";
import { brl, FREE_SHIPPING_LABEL, getBundle, FREE_SHIPPING_PHRASE } from "@/lib/bundles";
import { FAQ_HOME, KIT_HANDLE } from "@/lib/hand-speed";
import { seo, storeJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      path: "/",
      title: `Jogo de pegar o bastão para crianças e família | ${brand.name}`,
      description: `Hand Speed: a barra solta 6 bastões de espuma sem aviso e você pega antes de cair. 3 velocidades, controle remoto e bateria USB-C. 1, 2 ou 3 jogos com ${FREE_SHIPPING_PHRASE}.`,
      imageAlt: `${brand.name}: jogo de reflexo para a família`,
      jsonLd: storeJsonLd(),
    }),
  component: Home,
});

const VANTAGENS = [
  {
    n: "01",
    Icon: PhoneOff,
    title: "Uma pausa do celular.",
    text: "A sala vira arena.",
  },
  { n: "02", Icon: Users, title: "Todo mundo joga.", text: "Do pequeno de 3 anos ao avô." },
  {
    n: "03",
    Icon: RefreshCw,
    title: "A revanche vem sozinha.",
    text: "Ninguém para no primeiro bastão.",
  },
];

function Hero({ from }: { from: number }) {
  return (
    <section className="relative overflow-hidden">
      {/* Celular: foto em cima, texto embaixo. Computador: foto ocupando o fundo, texto à esquerda. */}
      <div className="relative md:absolute md:inset-0">
        <img
          src="/produtos/reflexo-limpa.webp"
          alt="Menino tentando pegar o bastão que caiu da barra do Hand Speed na sala"
          width={1200}
          height={1200}
          fetchPriority="high"
          className="aspect-[4/3] w-full object-cover object-[50%_30%] md:absolute md:inset-0 md:aspect-auto md:h-full md:object-[70%_35%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgb(var(--fade-rgb))] to-transparent md:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(var(--fade-rgb)/0.97)_0%,rgb(var(--fade-rgb)/0.9)_26%,rgb(var(--fade-rgb)/0.45)_46%,rgb(var(--fade-rgb)/0)_64%)] md:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-[rgb(var(--fade-rgb)/0.85)] to-transparent md:block" />
      </div>
      <div className="container-edge relative -mt-10 pb-12 md:mt-0 md:flex md:min-h-[640px] md:items-center md:py-20">
        <div className="max-w-[560px] reveal">
          <Eyebrow dot>O desafio de reflexo que viralizou</Eyebrow>
          <Display
            as="h1"
            top={
              <>
                <span className="sr-only">Jogo de pegar o bastão para crianças e família: </span>
                Pegue antes
                <br />
                de cair no
              </>
            }
            em="chão"
            br={false}
            className="mt-4 text-[64px] sm:text-[78px] md:text-[96px]"
          />
          <p className="mt-6 max-w-[320px] text-[15px] leading-relaxed text-[var(--slate)]">
            Seis bastões, nenhum aviso. O jogo que junta a família toda na sala.
          </p>
          <LimeLink to="/produto" className="mt-8 w-full max-w-[330px]">
            Ver o Hand Speed
          </LimeLink>
          <p className="mt-3 text-[12px] text-[var(--slate)]">
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
          <Eyebrow>O melhor do jogo é com quem você joga.</Eyebrow>
          <Display
            top="Menos “já vou.”"
            em="Mais “mais uma!”"
            className="mt-4 text-[52px] md:text-[76px]"
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
    <section className="band-sky border-y border-[var(--line)]">
      <div className="container-edge grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(11,22,64,0.55)]">
          <img
            src="/produtos/natal-limpa.webp"
            alt="Duas crianças rindo e tentando pegar os bastões do Hand Speed perto da árvore de Natal"
            width={1200}
            height={960}
            loading="lazy"
            className="aspect-[5/4] w-full object-cover"
          />
          <span className="absolute left-4 top-4 -rotate-3 bg-[var(--lime)] px-3 py-2 font-display text-[19px] font-extrabold uppercase leading-[0.95] text-[var(--on-lime)] shadow-md md:text-[24px]">
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
            className="mt-4 text-[52px] md:text-[72px]"
          />
          <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[var(--slate)]">
            Um presente de aniversário ou de Natal que tira todo mundo do sofá: irmãos, primos,
            pais e avós.
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
          <p className="mt-3 text-[11.5px] text-[var(--slate)]">A partir de 3 anos.</p>
        </div>
      </div>
    </section>
  );
}

function Desafio() {
  return (
    <section className="container-edge grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
      <div className="md:order-2">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgba(11,22,64,0.55)]">
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
        <Display top="Seis bastões." em="Zero aviso." className="mt-4 text-[52px] md:text-[72px]" />
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
    </section>
  );
}

function Perguntas() {
  return (
    <section className="container-edge grid gap-10 pb-6 pt-4 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-10">
      <div>
        <Eyebrow>Respostas rápidas. Depois, jogo.</Eyebrow>
        <Display top="Antes de" em="começar." className="mt-4 text-[52px] md:text-[72px]" />
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
      <Ticker items={["3+ anos", "3 velocidades", "Controle remoto", "1 / 2 / 3 jogos"]} />
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
