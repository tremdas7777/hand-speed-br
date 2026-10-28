# HAND SPEED

Loja do Hand Speed, o "desafio do bastão": uma barra solta 6 bastões de espuma sem aviso e o
jogador pega antes de cair. Base: a loja BEAM RIVALS BR (checkout próprio Pix + cartão, painel
/admin, rastreio e integrações).

## O que tem na loja

- **Início** (`src/routes/index.tsx`).
- **Produto** (`src/routes/produto.tsx` + `src/components/br/KitSections.tsx`): galeria, escolha
  da quantidade (1, 2 ou 3 jogos), modos de jogo, controle remoto, segurança, como jogar, o que
  vem na caixa e dúvidas.
- **Textos do produto** (`src/lib/hand-speed.ts`): modos, itens da caixa, perguntas frequentes.
- **Preços** (`src/lib/catalog-data.ts`, lista `OFERTAS`): R$ 67 / R$ 97 / R$ 127 (1/2/3 jogos);
  o preço "de" (R$ 99,90 por jogo) é provisório. Com o banco ligado, dá para mudar pelo `/admin`.
- **Pós-compra**: sem a etapa das pilhas (o jogo tem bateria interna). Depois do pagamento vêm as
  ofertas (mais 1 unidade com 50% OFF e seguro de entrega) e o envio expresso.
- **Fotos** (`public/produtos/`): as do fornecedor, refeitas em português.
