# Rótula Fácil : landing page

Landing page de lançamento e captação do **Rótula Fácil Desktop**.


![Prévia da landing page](docs/preview.png)

Seções: topo com colagem do produto, novidades da versão, vitrine interativa
dos recursos (abas), público, licença sem mensalidade e chamada final.

## Estrutura

```
rotulafacil-desktop/
├── desktop/
│   ├── index.html      # Página completa (HTML + CSS + JS, sem dependências)
│   └── img/            # Capturas do sistema usadas na página
│       ├── notebook.png      # Notebook com fundo transparente
│       ├── rotulo.png        # Rótulo com tabela nutricional
│       ├── cdbar.png         # Código de barras
│       ├── cardapio.png      # QR Code
│       └── precificacao.png  # Painel de precificação
├── docs/
│   └── preview.png         # Captura da página inteira (usada neste README)
├── .editorconfig
├── .gitignore
└── README.md
```


## Acessibilidade e desempenho

- Layout responsivo (desktop, tablet e celular), com botão fixo no celular.
- Vitrine em abas acessível por teclado (setas), com troca automática que pausa ao passar o mouse.
- Imagens abaixo da dobra com `loading="lazy"`.
- Foco visível em todos os elementos clicáveis e textos alternativos nas imagens.
- Animações desativadas para quem usa "reduzir movimento" no sistema.

---

Desenvolvido por [nixdevcode.com](https://nixdevcode.com)
