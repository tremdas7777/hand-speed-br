import { useState } from "react";
import { ArrowUpRight, BatteryCharging, Feather, Gift, Hand, Smile, Users } from "lucide-react";
import { Display, Eyebrow, LimeLink, TextLink } from "@/components/br/ui";
import { MODOS, NA_CAIXA } from "@/lib/hand-speed";
import { cn } from "@/lib/utils";

const shadow = "shadow-[0_30px_60px_-34px_rgba(11,22,64,0.5)]";

/** Desenho da barra amarela com os 6 bastões azuis; os de `cai` aparecem mais baixos (caindo). */
export function Barra({ cai = [], className }: { cai?: readonly number[]; className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      <div className="h-4 rounded-full bg-[#ffd21f] shadow-[inset_0_-3px_0_#d9a800]" />
      <div className="mt-0.5 flex justify-between px-[4%]">
        {[1, 2, 3, 4, 5, 6].map((k) => (
          <span
            key={k}
            className={cn(
              "block h-20 w-[9%] rounded-b-md border-b-[6px] border-[#ffd21f] bg-[#2f6ff0] transition-transform duration-500",
              cai.includes(k) && "translate-y-6",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function MesmaSala() {
  return (
    <section className="container-edge py-16 md:py-24">
      <Eyebrow>O desafio que viralizou</Eyebrow>
      <Display top="Caiu?" em="Pegou!" className="mt-4 text-[52px] md:text-[76px]" />
      <p className="mt-4 max-w-xl text-[14.5px] text-[var(--slate)]">
        Seis bastões, nenhum aviso. A barra solta um de cada vez e você tem que pegar antes de
        chegar no chão.
      </p>
      <img
        src="/produtos/reflexo-limpa.webp"
        alt="Menino tentando pegar o bastão que caiu da barra do Hand Speed na sala"
        width={1200}
        height={1200}
        loading="lazy"
        className={`mt-8 aspect-[4/3] w-full rounded-2xl object-cover object-[50%_35%] md:aspect-[16/9] ${shadow}`}
      />
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          [Hand, "Reflexo de verdade", "Treina a atenção e a coordenação entre a mão e o olho."],
          [Users, "Pais contra filhos", "Todo mundo joga, do pequeno de 3 anos ao avô."],
          [Smile, "Risada garantida", "O bastão que escapa por um triz vira assunto da noite."],
        ].map(([Icon, t, d]) => {
          const I = Icon as typeof Hand;
          return (
            <li key={t as string} className="flex gap-4">
              <I className="mt-0.5 h-5 w-5 shrink-0 text-[var(--blue)]" strokeWidth={2.2} />
              <div>
                <p className="text-[14px] font-bold text-[var(--ink)]">{t as string}</p>
                <p className="mt-1 text-[13px] text-[var(--slate)]">{d as string}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Modos() {
  const [i, setI] = useState(0);
  const m = MODOS[i]!;
  return (
    <section className="band-sky border-y border-[var(--line)]">
      <div className="container-edge py-16 md:py-24">
        <Eyebrow>Quatro jeitos de jogar</Eyebrow>
        <Display top="Qual vai ser" em="o desafio de hoje?" className="mt-4 text-[52px] md:text-[76px]" />
        <p className="mt-4 text-[14.5px] text-[var(--slate)]">
          Troque o modo e a velocidade a cada rodada.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div role="tablist" aria-label="Jeitos de jogar" className="space-y-3">
            {MODOS.map((x, n) => (
              <button
                key={x.n}
                type="button"
                role="tab"
                aria-selected={n === i}
                onClick={() => setI(n)}
                className={cn(
                  "flex h-[62px] w-full items-center gap-5 rounded-xl border px-5 text-left transition",
                  n === i
                    ? "border-[var(--blue)] bg-[linear-gradient(90deg,var(--tint-blue),var(--tint-lime))] shadow-[inset_3px_0_0_var(--blue)]"
                    : "border-[var(--line)] bg-[var(--card-bg)] hover:border-[var(--blue)]/40",
                )}
              >
                <span className="text-[10px] font-bold text-[var(--slate)]">{x.n}</span>
                <span
                  className={cn(
                    "flex-1 font-display text-[24px] font-extrabold uppercase",
                    n === i ? "text-[var(--blue)]" : "text-[var(--ink)]",
                  )}
                >
                  {x.name}
                </span>
                <ArrowUpRight className="h-4 w-4 text-[var(--blue)]" strokeWidth={2.4} />
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            className="card-soft relative overflow-hidden !bg-[linear-gradient(160deg,var(--card-bg),var(--tint-blue))] p-6 md:p-7"
          >
            <span className="pointer-events-none absolute -right-6 -top-6 grid h-36 w-36 place-items-center rounded-full border border-[var(--blue)]/10">
              <span className="grid h-24 w-24 place-items-center rounded-full border border-[var(--blue)]/10 font-display text-[32px] font-extrabold text-[var(--blue)]/15">
                {m.n}
              </span>
            </span>
            <p className="eyebrow">Pegue antes do chão</p>
            <p className="mt-3 font-display text-[44px] font-extrabold uppercase leading-none text-[var(--ink)]">
              {m.name}
            </p>
            <p className="mt-3 max-w-xs text-[13.5px] text-[var(--slate)]">{m.text}</p>
            <div className={cn("mt-7 grid gap-4", m.cai.length > 1 ? "grid-cols-2" : "max-w-[260px]")}>
              {m.cai.length > 1 ? (
                <>
                  <Barra cai={[m.cai[0]!]} />
                  <Barra cai={[m.cai[1]!]} />
                </>
              ) : (
                <Barra cai={m.cai} />
              )}
            </div>
            <p className="mt-10 text-[10.5px] text-[var(--slate)]">
              3 velocidades · Controle remoto · Aviso por voz
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Controle() {
  return (
    <section className="container-edge grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
      <img
        src="/produtos/controle.webp"
        alt="Botões de ligar e de velocidade na barra e o controle remoto do Hand Speed"
        width={1200}
        height={1200}
        loading="lazy"
        className={`aspect-square w-full rounded-2xl bg-white object-cover ${shadow}`}
      />
      <div>
        <Eyebrow>Controle remoto incluso</Eyebrow>
        <Display top="Você comanda" em="a rodada" className="mt-4 text-[52px] md:text-[72px]" />
        <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-[var(--slate)]">
          Um adulto segura o controle enquanto a criança joga. Ou o contrário, para a revanche.
        </p>
        <ul className="mt-7 space-y-4">
          {[
            ["⏻", "Liga e desliga", "Também pelo botão da própria barra"],
            ["≡", "Troca a velocidade", "3 níveis, do mais lento ao mais rápido"],
            ["?", "Queda aleatória", "A barra escolhe o bastão sozinha"],
            ["1–6", "Bastão escolhido", "Você decide qual dos 6 cai"],
          ].map(([n, t, d]) => (
            <li key={t} className="flex items-center gap-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[var(--blue)]/40 font-display text-[16px] font-extrabold text-[var(--blue)]">
                {n}
              </span>
              <span>
                <span className="block text-[14px] font-bold text-[var(--ink)]">{t}</span>
                <span className="text-[12px] text-[var(--slate)]">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Seguro() {
  return (
    <section className="band-sky border-y border-[var(--line)]">
      <div className="container-edge grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="md:order-2">
          <img
            src="/produtos/espuma.webp"
            alt="Bastões de espuma EVA macia com pontas arredondadas"
            width={1200}
            height={1200}
            loading="lazy"
            className={`aspect-square w-full rounded-2xl object-cover ${shadow}`}
          />
        </div>
        <div>
          <Eyebrow>Feito para criança jogar</Eyebrow>
          <Display top="Macio na mão," em="firme na barra" className="mt-4 text-[52px] md:text-[72px]" />
          <ul className="mt-8 space-y-5">
            {[
              [Feather, "Espuma EVA macia", "Bastões leves, com pontas arredondadas."],
              [BatteryCharging, "Bateria interna", "Sem pilha: carrega pelo cabo USB-C que vem na caixa."],
              [Gift, "A partir de 3 anos", "Na velocidade mais lenta; adultos jogam nas rápidas."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Feather;
              return (
                <li key={t as string} className="flex gap-4">
                  <I className="mt-0.5 h-5 w-5 shrink-0 text-[var(--blue)]" strokeWidth={2.2} />
                  <div>
                    <p className="text-[14px] font-bold text-[var(--ink)]">{t as string}</p>
                    <p className="mt-1 text-[13px] text-[var(--slate)]">{d as string}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <TextLink to="/produto" hash="escolha-o-kit" className="mt-9 w-full max-w-[300px]">
            Escolher a quantidade
          </TextLink>
        </div>
      </div>
    </section>
  );
}

export function ComoJogar() {
  const passos = [
    { t: "Pendure", d: "Com o cordão ou o gancho adesivo, num lugar com espaço livre embaixo." },
    { t: "Escolha o modo", d: "Queda aleatória ou bastão escolhido, em uma das 3 velocidades." },
    { t: "Pegue!", d: "Mão aberta embaixo da barra. Quem pegar mais bastões, ganha." },
  ];
  return (
    <section id="como-jogar" className="container-edge scroll-mt-28 py-16 md:py-24">
      <Eyebrow>Fácil de começar</Eyebrow>
      <Display top="Da caixa para" em="a primeira rodada" className="mt-4 text-[52px] md:text-[76px]" />
      <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
        {passos.map((p, n) => (
          <li
            key={p.t}
            className="card-soft relative overflow-hidden !bg-[linear-gradient(160deg,var(--card-bg),var(--tint-blue))] p-6 after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-[linear-gradient(90deg,#2f6ff0,var(--lime))]"
          >
            <p className="font-display text-[56px] font-extrabold leading-none text-[var(--blue)]">0{n + 1}</p>
            <p className="mt-5 font-display text-[26px] font-extrabold uppercase text-[var(--ink)]">{p.t}</p>
            <p className="mt-2 text-[13.5px] text-[var(--slate)]">{p.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NaCaixa() {
  return (
    <section className="band-sky border-y border-[var(--line)]">
      <div className="container-edge grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <Eyebrow>O que vem em cada jogo</Eyebrow>
          <Display top="Tudo pronto" em="para jogar" className="mt-4 text-[52px] md:text-[72px]" />
          <ul className="mt-7 space-y-5">
            {NA_CAIXA.map((i) => (
              <li key={i.t} className="flex items-center gap-5">
                <span className="w-10 font-display text-[30px] font-extrabold italic leading-none text-[var(--blue)]">
                  {i.n}
                </span>
                <span>
                  <span className="block text-[14px] font-bold text-[var(--ink)]">{i.t}</span>
                  <span className="text-[12px] text-[var(--slate)]">{i.d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[11px] text-[var(--slate)]">
            Levando 2 ou 3 jogos, cada um vem completo, com a caixa dele.
          </p>
          <LimeLink to="/produto" hash="escolha-o-kit" className="mt-7 w-full max-w-[300px]">
            Escolher a quantidade
          </LimeLink>
        </div>
        <img
          src="/produtos/medidas.webp"
          alt="Barra de 38 cm, 6 bastões de 20 cm, controle remoto, cordão, gancho adesivo e cabo USB-C"
          width={1200}
          height={1200}
          loading="lazy"
          className={`aspect-square w-full rounded-2xl bg-white object-cover ${shadow}`}
        />
      </div>
    </section>
  );
}
