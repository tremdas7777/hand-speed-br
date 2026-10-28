import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Gallery } from "@/components/br/Gallery";
import { Display, Eyebrow, FaqList, FinalCta, Ticker } from "@/components/br/ui";
import {
  ComoJogar,
  Controle,
  MesmaSala,
  Modos,
  NaCaixa,
  Seguro,
} from "@/components/br/KitSections";
import { usePayInfo } from "@/hooks/usePayInfo";
import { brand } from "@/lib/brand";
import { metaTrack } from "@/lib/meta-pixel";
import { trackCheckoutClick } from "@/lib/analytics";
import { markCartCheckout } from "@/lib/cart";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import {
  brl,
  discountPct,
  encodeVariant,
  bundleShippingLabel,
  FREE_SHIPPING_LABEL,
  getBundle,
  installment,
  productLabel,
  withVariantPrice,
  type Bundle,
} from "@/lib/bundles";
import { FAQ_KIT, jogosDe, NA_CAIXA, OFERTA_PADRAO, OFERTA_USO } from "@/lib/hand-speed";
import { productJsonLd, productPath, seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produto")({
  validateSearch: planSearchSchema,
  loaderDeps: ({ search }) => ({ plano: search.plano }),
  // Só repassa o id: o catálogo é carregado na raiz (pode vir do banco).
  loader: ({ deps }) => ({ plano: deps.plano ?? null }),
  head: ({ loaderData }) => {
    const p = getBundle(bundleIdFromSearch({ plano: loaderData?.plano ?? undefined }));
    return seo({
      path: productPath(p),
      title: `${p.name}: jogo de reflexo para toda a família | ${brand.name}`,
      description: `${p.name}: a barra solta 6 bastões de espuma e você pega antes de cair. 3 velocidades e controle remoto. 1, 2 ou 3 jogos a partir de ${brl(p.price)}. ${FREE_SHIPPING_LABEL}.`,
      image: p.img,
      imageAlt: p.name,
      type: "product",
      jsonLd: productJsonLd(p),
    });
  },
  component: Page,
});

/** Uma opção de quantidade ("2 jogos"), com o preço da variação. */
type Opcao = { label: string; jogos: number; priced: Bundle };

function opcoes(p: Bundle): Opcao[] {
  const values = p.options[0]?.values ?? [];
  return values.map((label) => ({
    label,
    jogos: jogosDe(label),
    priced: withVariantPrice(p, [label]),
  }));
}

function SquadCard({
  o,
  on,
  best,
  onPick,
}: {
  o: Opcao;
  on: boolean;
  best: boolean;
  onPick: () => void;
}) {
  const off = discountPct(o.priced);
  const economia = o.priced.compareAtPrice ? o.priced.compareAtPrice - o.priced.price : 0;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      onClick={onPick}
      className={cn(
        "relative flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left transition md:px-5",
        on
          ? "border-[var(--edge)] bg-[var(--tint-lime)] shadow-[4px_4px_0_var(--edge)]"
          : "border-[var(--edge)]/25 bg-white hover:border-[var(--edge)]",
      )}
    >
      {best && (
        <span className="absolute -top-3.5 right-4 rotate-2 rounded-md border-2 border-[var(--edge)] bg-[var(--orange)] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-white shadow-[2px_2px_0_var(--edge)]">
          ✦ Mais vendido
        </span>
      )}
      <span
        className={cn(
          "grid h-5 w-5 shrink-0 place-items-center rounded-full border-2",
          on ? "border-[var(--edge)]" : "border-[var(--input)]",
        )}
      >
        {on && <span className="h-2.5 w-2.5 rounded-full bg-[var(--edge)]" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-bold text-[var(--ink)]">{o.label}</span>
          {off > 0 && (
            <span className="rounded border border-[var(--edge)] bg-[var(--lime)] px-1.5 py-0.5 text-[9.5px] font-extrabold text-[var(--on-lime)]">
              −{off}% OFF
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[11.5px] text-[var(--slate)]">
          {OFERTA_USO[o.jogos] ?? `${o.jogos} jogos completos`}
        </span>
        {economia > 0 && (
          <span className="mt-0.5 block text-[11px] font-semibold text-[var(--save)]">
            Você economiza {brl(economia)}
          </span>
        )}
      </span>
      <span className="text-right">
        {o.priced.compareAtPrice && (
          <span className="block text-[11px] text-[var(--slate)] line-through">
            {brl(o.priced.compareAtPrice)}
          </span>
        )}
        <span className="block font-display text-[26px] font-extrabold leading-none text-[var(--ink)]">
          {brl(o.priced.price)}
        </span>
        <span className="mt-1 block text-[10.5px] text-[var(--slate)]">
          {brl(Math.round((o.priced.price / o.jogos) * 100) / 100)} / jogo
        </span>
      </span>
    </button>
  );
}

function Page() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const pay = usePayInfo();
  const p = getBundle(bundleIdFromSearch(search));
  const lista = opcoes(p);
  const inicial =
    lista.find((o) => o.label === search.variante) ??
    lista.find((o) => o.jogos === OFERTA_PADRAO) ??
    lista[0];
  const [escolha, setEscolha] = useState(inicial?.label);
  const atual = lista.find((o) => o.label === escolha) ?? inicial;
  const priced = atual?.priced ?? p;
  const values = atual ? [atual.label] : [];

  useEffect(() => {
    metaTrack("ViewContent", { value: priced.price, contentName: p.name });
  }, [p.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const variante = values.length ? { variante: encodeVariant(values) } : {};
  const buy = () => {
    markCartCheckout(false);
    trackCheckoutClick({
      source: "product_page",
      bundleId: p.id,
      bundleName: productLabel(p, values).slice(0, 80),
      value: priced.price,
    });
    navigate({ to: "/checkout", search: { plano: p.id, ...variante } });
  };

  const pixPrice = pay.pixOff ? Math.round(priced.price * (1 - pay.pixOff) * 100) / 100 : 0;

  return (
    <SiteLayout>
      <section>
        <div className="container-edge grid gap-8 py-6 md:grid-cols-[1fr_1fr] md:gap-12 md:py-10 lg:gap-16">
          <div className="md:sticky md:top-[calc(var(--site-chrome-h,7rem)+1.5rem)] md:self-start">
            <Gallery images={p.images} alt={p.name} chip="O desafio do bastão" />
          </div>

          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[var(--slate)]">
              {brand.name}
            </p>
            <Display
              as="h1"
              top={
                <>
                  <span className="sr-only">Hand Speed: </span>Desafio do
                </>
              }
              em="Bastão"
              className="mt-2 text-[36px] md:text-[48px]"
            />
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-[var(--slate)]">
              A barra solta os 6 bastões sem aviso e você pega antes de cair. Crianças, pais e avós
              no mesmo desafio: quem pegar mais, ganha.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["Crianças e adultos", "3 velocidades", "Controle remoto", "Bateria USB-C"].map(
                (t) => (
                  <li
                    key={t}
                    className="rounded-md border border-[var(--line)] bg-[var(--card-bg)] px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-[0.1em] text-[var(--ink)]"
                  >
                    {t}
                  </li>
                ),
              )}
            </ul>

            <div id="escolha-o-kit" className="mt-7 scroll-mt-32">
              <div className="mb-3 flex items-end justify-between gap-3">
                <p className="text-[15px] font-bold text-[var(--ink)]">Escolha a quantidade</p>
                <p className="text-[11px] text-[var(--slate)]">Cada jogo vem completo</p>
              </div>
              <div role="radiogroup" aria-label="Quantidade de jogos" className="space-y-3.5">
                {lista.map((o) => (
                  <SquadCard
                    key={o.label}
                    o={o}
                    on={o.label === atual?.label}
                    best={o.jogos === OFERTA_PADRAO}
                    onPick={() => setEscolha(o.label)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border-2 border-dashed border-[var(--edge)]/40 bg-white">
              <p className="flex items-center gap-2 px-4 pt-3 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[var(--ink)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--lime-deep)]" /> Vem em cada
                caixa ✦
              </p>
              <ul className="grid grid-cols-1 gap-x-4 gap-y-2 px-4 pb-4 pt-3 sm:grid-cols-2">
                {NA_CAIXA.map((i) => (
                  <li
                    key={i.t}
                    className="flex items-center gap-2.5 text-[12.5px] text-[var(--ink)]"
                  >
                    <span className="w-6 shrink-0 font-display text-[16px] font-extrabold italic text-[var(--blue)]">
                      {i.n}
                    </span>
                    {i.t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={buy}
                className="btn-buy h-[70px] w-full text-[18px] md:text-[19px]"
              >
                Comprar agora
              </button>
              {(pixPrice > 0 || pay.card) && (
                <p className="mt-2.5 text-center text-[12px] text-[var(--slate)]">
                  {pixPrice > 0 && (
                    <>
                      <b className="text-[var(--ink)]">{brl(pixPrice)}</b> no Pix (
                      {Math.round(pay.pixOff * 100)}% OFF)
                    </>
                  )}
                  {pixPrice > 0 && pay.card && " ou "}
                  {pay.card && (
                    <>
                      {pay.installments}x de {installment(priced.price, pay.installments)} no cartão
                    </>
                  )}
                </p>
              )}
              <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[12px] text-[var(--ink)]">
                <Check className="h-3.5 w-3.5 text-[var(--lime)]" strokeWidth={3} />
                {bundleShippingLabel(priced)}
              </p>
              <p className="mt-2 text-center text-[11.5px] text-[var(--slate)]">
                Prazo médio de entrega: {brand.prazoEntrega}
              </p>
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--line)] pt-5 text-[10.5px] leading-tight text-[var(--slate)]">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[var(--blue)]" strokeWidth={1.6} />
                Pagamento seguro
              </li>
              <li className="flex items-center gap-2">
                <Truck className="h-5 w-5 shrink-0 text-[var(--blue)]" strokeWidth={1.6} />
                {FREE_SHIPPING_LABEL}
              </li>
              <li className="flex items-center gap-2">
                <Undo2 className="h-5 w-5 shrink-0 text-[var(--blue)]" strokeWidth={1.6} />
                Garantia de {brand.garantiaDias} dias
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Ticker
        big
        items={["Caiu? Pegou!", "3 velocidades", "Controle remoto", "Diversão sem tela"]}
      />
      <MesmaSala />
      <Modos />
      <Controle />
      <Seguro />
      <ComoJogar />
      <NaCaixa />

      <section
        id="perguntas"
        className="container-edge grid scroll-mt-28 gap-10 py-16 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-24"
      >
        <div>
          <Eyebrow>Antes do primeiro bastão cair</Eyebrow>
          <Display
            top="Suas dúvidas"
            em="respondidas"
            className="mt-4 text-[38px] md:text-[54px]"
          />
          <p className="mt-5 text-[13.5px] text-[var(--slate)]">Precisa de outra ajuda?</p>
          <Link
            to="/contato"
            className="mt-1 inline-block border-b border-[var(--blue)] text-[13.5px] font-semibold text-[var(--blue)]"
          >
            Fale com a gente ↗
          </Link>
        </div>
        <FaqList items={FAQ_KIT} />
      </section>

      <FinalCta
        eyebrow="Pais contra filhos, irmão contra irmão"
        top="Quem pega"
        em="mais bastões?"
        cta="Quero o meu"
        note={`${FREE_SHIPPING_LABEL} · Garantia de ${brand.garantiaDias} dias`}
      />
    </SiteLayout>
  );
}
