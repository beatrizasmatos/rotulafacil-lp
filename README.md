# Rótula Fácil : landing page

Página de venda do **Rótula Fácil Desktop**.


![Prévia da landing page](docs/preview.png)

Seções: topo com banner do produto, faixa de acesso vitalício, do programa ao
seu produto (com vídeo), galeria de telas reais, planos com checkout e
comparativo da precificação (com vídeo), instalação e suporte e chamada final.

## Estrutura

```
rotulafacil-desktop/
├── desktop/
│   ├── index.html      # Página completa (HTML + CSS + JS, sem dependências)
│   ├── img/
│   │   ├── banner-notebook-embalagens.webp  # Banner do topo (fundo transparente)
│   │   ├── do-programa-ao-produto.webp      # Sequência tela, etiqueta e embalagem
│   │   ├── og-rotulafacil.jpg               # Imagem de compartilhamento
│   │   └── telas/                           # Prints reais da galeria
│   └── video/          # Vídeos horizontal e vertical (MP4) e capas
├── scripts/
│   ├── build.mjs       # Valida a página e gera dist/
│   └── serve.mjs       # Servidor da prévia local
├── docs/
│   └── preview.png     # Captura da página inteira (usada neste README)
├── package.json
├── .editorconfig
├── .gitignore
└── README.md
```

## Como rodar

```bash
npm run dev       # prévia em http://localhost:4173/
npm run build     # valida e gera dist/
```

Para publicar, envie o conteúdo de `dist/` para a pasta `/desktop/` do servidor.

## Acessibilidade e desempenho

- Layout responsivo (desktop, tablet e celular), com menu fixo no desktop e botão fixo no celular.
- Galeria acessível por teclado (setas), com arrastar no celular e ampliação das telas.
- Vídeos sem som que tocam só quando aparecem na tela, com botões de pausa e de som.
- Imagens em WebP e conteúdo abaixo da dobra com `loading="lazy"`.
- Foco visível em todos os elementos clicáveis e textos alternativos nas imagens.
- Animações e reprodução automática desativadas para quem usa "reduzir movimento" no sistema.

---
