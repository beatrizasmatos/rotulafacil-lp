# Rótula Fácil Desktop: página de venda

Página de venda do **Rótula Fácil Desktop**, publicada em
[rotulafacil.com.br/desktop](https://rotulafacil.com.br/desktop).

A página apresenta o programa, mostra as telas reais e leva o visitante direto
ao checkout da Hotmart nos dois planos. Preços, recursos, requisitos e links
seguem o site oficial ([rotulafacil.com.br](https://www.rotulafacil.com.br)).

![Prévia da página](docs/preview.png)

Seções, na ordem:

1. **Topo** (laranja): título, botão "Ver planos" (`#planos`), link "Veja como funciona" (`#como-funciona`) e banner com notebook e embalagens.
2. **Faixa de acesso vitalício**: paga uma vez, sem mensalidade.
3. **Do programa ao seu produto** (`#como-funciona`): sequência tela → etiqueta → embalagem, com mockups identificados como ilustrativos, e o vídeo vertical ao lado dos passos.
4. **Telas de verdade** (`#demonstracao`): galeria com os prints reais do programa, miniaturas, setas, arrastar no celular e "Ampliar".
5. **Planos** (`#planos`): vídeo horizontal ao lado do título, os dois planos com checkout e o comparativo do módulo de precificação (`#precificacao`).
6. **Instalação e suporte** (`#instalacao`): requisitos, vídeo de instalação e contatos.
7. **Chamada final**: volta para os planos.

## Estrutura

```
rotulafacil-desktop/
├── desktop/                 # Código-fonte da página
│   ├── index.html           # Página completa (HTML + CSS + JS, sem dependências)
│   └── img/
│       ├── banner-notebook-embalagens.webp   # Topo (fundo transparente)
│       ├── do-programa-ao-produto.webp       # Sequência tela/etiqueta/embalagem
│       ├── og-rotulafacil.jpg                # Imagem de compartilhamento (1200x630)
│       └── telas/                            # Prints reais do programa
│   └── video/                                # Vídeos MP4 (H.264, início rápido) e capas
├── scripts/
│   ├── build.mjs            # Valida a página e gera dist/
│   └── serve.mjs            # Servidor local para a prévia
├── docs/preview.png
└── package.json
```

## Prévia local e build

Precisa de Node 18 ou mais recente. Não há dependências para instalar.

```bash
npm run dev       # prévia direto de desktop/  → http://localhost:4173/
npm run build     # valida e gera dist/
npm run preview   # prévia da pasta dist/       → http://localhost:4173/
```

O build falha se encontrar: imagem ou arquivo local inexistente, âncora sem
destino, link sem HTTPS, imagem sem `alt`/`width`/`height`, id duplicado, ou link
de checkout diferente dos dois oficiais da Hotmart.

## Publicação

Rode `npm run build` e envie o **conteúdo de `dist/`** para a pasta `/desktop/`
do servidor, de forma que a página fique em `https://rotulafacil.com.br/desktop/`.

## Como editar

| O que mudar | Onde |
|---|---|
| Preços e parcelas | Seção `#planos` em `desktop/index.html` (e "a partir de" no topo e no botão fixo do celular) |
| Links de checkout | Botões com `pay.hotmart.com` (atualize também a lista `allowed` em `scripts/build.mjs`) |
| Cores | Variáveis no início do `<style>` (`--orange`, `--orange-ink`, `--surface`…) |
| Prints | Arquivos em `desktop/img/telas/` (mantenha os nomes ou ajuste `src` e `data-src`) |

## Rastreamento de campanhas

Os parâmetros da URL (`utm_source`, `utm_campaign`, `gclid`, `fbclid` etc.) são
repassados para todos os links com a classe `js-out`: checkout da Hotmart e site
oficial.

Exemplo: `rotulafacil.com.br/desktop/?utm_source=instagram` faz o botão de compra
apontar para `pay.hotmart.com/T106672136R?off=4urbivo6&utm_source=instagram`.

## Acessibilidade e desempenho

- Vídeos tocam sem som e em loop só quando aparecem na tela, com botões de pausa e de som; com "reduzir movimento" ligado, só tocam ao apertar o play.

- Responsivo (desktop, tablet e celular), com botão fixo "Ver planos" no celular.
- Prints largos com rolagem lateral no celular e visualização em tamanho real (`<dialog>`, fecha com Esc).
- Contraste de 4,5:1 ou mais em textos e botões; o texto branco sobre o laranja fica entre 4,3 e 4,9:1 por causa da textura de pontos (títulos grandes bem acima do mínimo de 3:1). Foco visível em todos os elementos clicáveis.
- Imagens em WebP com `width`/`height` (sem pulo de layout) e `loading="lazy"` abaixo da dobra.
- Animações desativadas para quem usa "reduzir movimento".

---

Desenvolvido por [nixdevcode.com](https://nixdevcode.com)
