import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";
import { SiteLayout } from "@/components/site/Layout";
import { brand } from "@/lib/brand";
import { CARD_MAX_INSTALLMENTS } from "@/lib/payment-pricing";
import { FREE_SHIPPING_LABEL, FREE_SHIPPING_PHRASE } from "@/lib/bundles";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: `Sobre a ${brand.name}` },
      {
        name: "description",
        content: `A ${brand.name} vende o jogo do bastão para jogar em casa com a família. Menos tela, mais jogo, com ${FREE_SHIPPING_PHRASE} e garantia de ${brand.garantiaDias} dias.`,
      },
      { property: "og:title", content: `Sobre a ${brand.name}` },
      { property: "og:description", content: `${brand.tagline}. Envio para todo o Brasil.` },
      { property: "og:url", content: absUrl("/sobre") },
    ],
    links: [{ rel: "canonical", href: absUrl("/sobre") }],
  }),
  component: Page,
});

const VALUES = [
  ["Sem tela", "Um jogo que tira todo mundo do sofá e junta a família na mesma sala."],
  ["Envio rastreado", `${FREE_SHIPPING_LABEL}, com código de rastreio por e-mail.`],
  [
    `Garantia de ${brand.garantiaDias} dias`,
    "Não gostou? Devolvemos o seu dinheiro dentro do prazo.",
  ],
  ["Pagamento", `Pix ou cartão em até ${CARD_MAX_INSTALLMENTS}x, em site com certificado SSL.`],
] as const;

function Page() {
  return (
    <SiteLayout>
      <section className="container-edge grid items-center gap-10 py-14 md:grid-cols-2 md:py-24 lg:gap-16">
        <div>
          <p className="eyebrow">Sobre a marca</p>
          <h1 className="display mt-3 text-[38px] md:text-[64px]">
            Menos tela. <em>Mais jogo.</em>
          </h1>
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-[var(--ink)]">
            A {brand.name} nasceu de uma ideia simples: trocar um pouco do tempo no celular por uma
            disputa em família. O nosso jogo solta os bastões sem aviso, faz todo mundo rir e cabe
            na sala de casa.
          </p>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-[var(--ink)]">
            Vendemos para todo o Brasil
            {brand.city ? ` e entregamos por motoboy em ${brand.city} e região` : ""}. Dúvida sobre
            o jogo, o prazo ou a garantia? Fale com a gente pela{" "}
            <Link to="/contato" className="underline underline-offset-2">
              página de contato
            </Link>
            .
          </p>
        </div>
        <img
          src="/produtos/natal-limpa.webp"
          alt="Duas crianças rindo e tentando pegar os bastões do Hand Speed"
          className="aspect-[4/5] max-h-[620px] w-full rounded-2xl bg-[var(--tile)] object-cover object-[50%_50%]"
        />
      </section>
      <section className="border-t border-[var(--line)]">
        <div className="container-edge grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(([t, d]) => (
            <div key={t} className="border-t-2 border-[var(--blue)] pt-4">
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.1em]">{t}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink)]">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
