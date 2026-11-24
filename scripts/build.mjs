// Build da landing: valida o HTML e copia desktop/ para dist/ (pasta que vai para o servidor).
import { readFileSync, rmSync, cpSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'desktop', OUT = 'dist';
const html = readFileSync(join(SRC, 'index.html'), 'utf8');
const errors = [];

// 1. Arquivos locais referenciados (src, href, data-src, preload) existem
const refs = [...html.matchAll(/(?:src|href|data-src|poster)="([^"#:]+?)"/g)].map(m => m[1]).filter(r => !r.startsWith('//'));
for (const r of new Set(refs)) if (!existsSync(join(SRC, r))) errors.push(`Arquivo não encontrado: ${r}`);

// 2. Todo link interno (#id) aponta para um id existente
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(id)) errors.push(`Âncora sem destino: #${id}`);

// 3. Nenhum link externo sem HTTPS
for (const [, u] of html.matchAll(/href="(http:\/\/[^"]+)"/g)) errors.push(`Link sem HTTPS: ${u}`);

// 4. Imagens com alt, largura e altura (evita layout pulando)
for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
  if (tag.includes('id="viewerImg"')) continue;
  if (!/\salt="/.test(tag)) errors.push(`Imagem sem alt: ${tag.slice(0, 80)}`);
  if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) errors.push(`Imagem sem width/height: ${tag.slice(0, 80)}`);
}

// 5. Checkout só nos links oficiais da Hotmart
const checkout = [...html.matchAll(/href="(https:\/\/pay\.hotmart\.com\/[^"]+)"/g)].map(m => m[1]);
const allowed = ['https://pay.hotmart.com/T106672136R?off=cejydsw5', 'https://pay.hotmart.com/T106672136R?off=4urbivo6'];
for (const u of checkout) if (!allowed.includes(u)) errors.push(`Checkout desconhecido: ${u}`);
if (checkout.length < 2) errors.push('Faltam links de checkout dos dois planos');

// 6. ids duplicados
const allIds = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
allIds.filter((v, i) => allIds.indexOf(v) !== i).forEach(d => errors.push(`id duplicado: ${d}`));

if (errors.length) { console.error('✗ Build falhou:\n  ' + errors.join('\n  ')); process.exit(1); }

rmSync(OUT, { recursive: true, force: true });
cpSync(SRC, OUT, { recursive: true });

const size = dir => readdirSync(dir, { withFileTypes: true }).reduce((t, e) => t + (e.isDirectory() ? size(join(dir, e.name)) : statSync(join(dir, e.name)).size), 0);
console.log(`✓ Build ok: ${refs.length} referências locais, ${ids.size} ids, ${checkout.length} links de checkout`);
console.log(`✓ dist/ gerado (${(size(OUT) / 1024).toFixed(0)} KB). Envie o conteúdo de dist/ para /desktop/ no servidor.`);
