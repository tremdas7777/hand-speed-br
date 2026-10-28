import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";
import { PolicyPage } from "@/components/site/PolicyPage";
import { brand } from "@/lib/brand";
import { brl } from "@/lib/bundles";
import { ORDER_BUMPS } from "@/lib/order-bump";

const opcoes = ORDER_BUMPS.filter((b) => b.group === "garantia");

export const Route = createFileRoute("/garantia-estendida")({
  head: () => ({
    meta: [
      { title: `Garantia estendida | ${brand.name}` },
      { name: "description", content: `Condições da garantia estendida de 12 ou 24 meses da ${brand.name}.` },
      { property: "og:title", content: "Garantia estendida" },
      { property: "og:url", content: absUrl("/garantia-estendida") },
    ],
    links: [{ rel: "canonical", href: absUrl("/garantia-estendida") }],
  }),
  component: () => (
    <PolicyPage
      title="Garantia estendida"
      intro={`Opcional no checkout: ${opcoes.map((o) => `${o.optionLabel} por ${brl(o.price)}`).join(" ou ")}.`}
    >
      <h2>O que é</h2>
      <p>
        É uma garantia da {brand.name}, contratada no checkout junto com o pedido. Ela soma à garantia legal de 90
        dias do Código de Defesa do Consumidor e à garantia de {brand.garantiaDias} dias da loja, e vale pelo prazo
        escolhido (12 ou 24 meses), contado a partir da entrega do pedido.
      </p>
      <h2>O que cobre</h2>
      <p>
        Defeito de funcionamento da barra ou do controle remoto do jogo comprado: não ligar, não soltar os
        bastões, não carregar a bateria, botões ou aviso por voz que pararam de funcionar.
      </p>
      <h2>Como usar</h2>
      <p>
        Chame a gente no WhatsApp com o número do pedido e um vídeo curto mostrando o defeito. Confirmado o defeito,
        enviamos uma peça nova igual (ou equivalente, se o modelo tiver saído de linha), com o frete por nossa conta.
        A peça com defeito não precisa ser devolvida, a menos que a gente peça.
      </p>
      <h2>O que não cobre</h2>
      <p>
        Quebra por queda, pancada ou mau uso; contato com água; desgaste natural da bateria; desgaste estético (riscos,
        adesivos); perda ou roubo; peças abertas ou consertadas por terceiros.
      </p>
      <h2>Outras condições</h2>
      <p>
        A garantia fica ligada ao pedido e ao CPF de quem comprou. Se o pedido for cancelado ou devolvido, o valor
        da garantia é devolvido junto.
      </p>
    </PolicyPage>
  ),
});
