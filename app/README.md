# O termo que faltava · Equações de Maxwell

Página interativa sobre a corrente de deslocamento, as quatro equações de Maxwell e a origem da luz.
Trabalho de Fundamentos de Eletromagnetismo.

Site: https://equacoes-de-maxwell.vercel.app

## Como rodar

```bash
npm install
npm run dev
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | gera a versão de produção em `dist/` |
| `npm run preview` | serve a versão de produção localmente |
| `npm run lint` | verifica o código com o ESLint |

## Tecnologias

React, TypeScript, Vite, Tailwind CSS, Motion, KaTeX e React Router.

## Estrutura

```
src/
├── components/
│   ├── interface/    peças reutilizáveis (fórmula, seção, controles)
│   ├── layout/       cabeçalho e rodapé
│   ├── secoes/       uma seção da página por arquivo
│   └── simulacoes/   simulações interativas
├── dados/            seções da página e perguntas do quiz
├── funcoes/          física, formatação de números e cores
├── pages/            páginas (Inicio e NaoEncontrada)
├── providers/        configurações globais
└── App.tsx           rotas
```
