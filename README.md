# Carpediem Homes · Calculadora de investimento

Calculadora comparativa de quatro imóveis à venda em João Pessoa, com aquisição via carta de consórcio. Permite ao investidor simular o cashflow mensal, cobertura da parcela e payback de cada operação, além de adicionar imóveis customizados para comparação.

## Stack

- React 18
- Vite 5
- Noto Sans via Google Fonts
- Zero dependências externas além do React

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

O build fica em `dist/`.

## Deploy no Vercel

### Opção 1 — via GitHub (recomendado)

1. Crie um repositório novo no GitHub (pode ser privado).
2. Neste diretório, rode:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin git@github.com:samuelgondimcdh/carpediem-calculadora.git
   git push -u origin main
   ```
   (ajuste a URL do remote pro repositório que você criou)
3. Acesse [vercel.com/new](https://vercel.com/new), importe o repositório.
4. O Vercel detecta Vite automaticamente. Pode manter todas as configurações padrão e clicar em **Deploy**.
5. Em ~30 segundos tem uma URL `*.vercel.app` pronta para compartilhar.

### Opção 2 — via Vercel CLI

```bash
npm i -g vercel
vercel
```

Responde as perguntas do CLI e o deploy é feito direto do terminal, sem precisar de repositório.

## Domínio customizado

No dashboard do Vercel, em **Settings → Domains**, adicione um subdomínio próprio (ex.: `calculadora.carpediemhomes.com.br`). O Vercel gera os registros DNS que você aponta no seu provedor (Registro.br, Cloudflare, etc).

## Estrutura

```
carpediem-calculadora/
├── index.html              → entrada HTML
├── package.json            → dependências
├── vite.config.js          → config do bundler
├── vercel.json             → config do deploy
├── .gitignore
└── src/
    ├── main.jsx            → entry point React
    └── Calculadora.jsx     → componente principal (toda a lógica está aqui)
```

## Notas

- Toda a lógica de cálculo está em `src/Calculadora.jsx`. Para ajustar os imóveis iniciais, preços, receitas ou defaults de custos, edite o array `IMOVEIS_INICIAIS` no topo do arquivo.
- A paleta de cores fica centralizada no objeto `C` no mesmo arquivo — trocar cores é mudança de uma linha cada.
- Não há backend nem persistência: todos os estados vivem em memória na sessão do usuário. Se no futuro for necessário salvar cenários, a integração natural seria via Supabase.
