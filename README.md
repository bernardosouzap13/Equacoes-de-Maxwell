# O termo que faltava · Equações de Maxwell

Página interativa que explica como a corrente de deslocamento corrigiu a lei de Ampère, completou as
quatro equações de Maxwell e mostrou que a luz é uma onda eletromagnética.

Trabalho de **Fundamentos de Eletromagnetismo**.

**Site publicado:** https://equacoes-de-maxwell.vercel.app

---

## Como rodar no seu computador

### 1. Pré-requisitos

| Programa | Versão | Como conferir |
|---|---|---|
| [Node.js](https://nodejs.org) | 22 ou mais recente (mínimo 20.19) | `node -v` |
| npm | vem junto com o Node | `npm -v` |
| [Git](https://git-scm.com) | qualquer versão recente | `git --version` |

Se algum comando acima não funcionar, instale o programa pelo link e abra o terminal de novo.

### 2. Baixar o projeto

```bash
git clone https://github.com/bernardosouzap13/Equacoes-de-Maxwell.git
cd Equacoes-de-Maxwell
```

Também dá para baixar o .zip pelo botão **Code → Download ZIP** no GitHub e extrair a pasta.

### 3. Entrar na pasta do site

O código do site fica dentro da pasta `app`:

```bash
cd app
```

### 4. Instalar as dependências

```bash
npm install
```

Esse passo só precisa ser feito na primeira vez (ou quando o `package.json` mudar). Ele cria a pasta
`node_modules`.

### 5. Rodar

```bash
npm run dev
```

O terminal vai mostrar um endereço parecido com este:

```
  ➜  Local:   http://localhost:5173/
```

Abra esse endereço no navegador. Qualquer alteração salva nos arquivos aparece na hora, sem precisar
recarregar. Para parar o servidor, aperte **Ctrl + C** no terminal.

---

## Outros comandos

Todos são executados dentro da pasta `app`.

| Comando | O que faz |
|---|---|
| `npm run dev` | roda o site em modo de desenvolvimento |
| `npm run build` | gera a versão final, otimizada, na pasta `dist` |
| `npm run preview` | abre a versão final localmente, para testar antes de publicar |
| `npm run lint` | procura problemas no código |

## Problemas comuns

| Problema | Solução |
|---|---|
| `npm` ou `node` "não é reconhecido" | o Node.js não está instalado ou o terminal foi aberto antes da instalação |
| erro dizendo que a versão do Node é antiga | atualize o Node.js para a versão 22 ou mais recente |
| `npm run dev` diz que não encontrou o `package.json` | você está fora da pasta `app`; rode `cd app` |
| a porta 5173 já está em uso | o Vite usa a próxima porta livre sozinho; veja o endereço no terminal |

---

## Publicação

O site está hospedado na [Vercel](https://vercel.com), ligada a este repositório. Todo `git push` na
branch `main` gera uma nova versão automaticamente em https://equacoes-de-maxwell.vercel.app.

## Tecnologias

React, TypeScript, Vite, Tailwind CSS, Motion, KaTeX e React Router.

## Estrutura

```
app/
├── public/              arquivos estáticos
├── src/
│   ├── components/
│   │   ├── interface/   peças reutilizáveis (fórmula, seção, controles)
│   │   ├── layout/      cabeçalho e rodapé
│   │   ├── secoes/      uma seção da página por arquivo
│   │   └── simulacoes/  simulações interativas
│   ├── dados/           seções da página e perguntas do quiz
│   ├── funcoes/         física, formatação de números e cores
│   ├── pages/           páginas (Inicio e NaoEncontrada)
│   ├── providers/       configurações globais
│   ├── App.tsx          rotas
│   └── main.tsx         ponto de entrada
├── package.json
└── vercel.json          configuração da hospedagem
```

## Referências

- Apostila da disciplina, Aula 42: As Equações de Maxwell.
- HALLIDAY, D.; RESNICK, R.; WALKER, J. *Fundamentos de Física*, v. 3.
- YOUNG, H. D.; FREEDMAN, R. A. *Física III* (Sears & Zemansky).
- GRIFFITHS, D. J. *Introduction to Electrodynamics*, cap. 7.
- FEYNMAN, R. P. *The Feynman Lectures on Physics*, v. II, cap. 18.
- MAXWELL, J. C. *A Dynamical Theory of the Electromagnetic Field*, 1865.
