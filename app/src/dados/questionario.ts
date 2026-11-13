export type Pergunta = {
  pergunta: string
  opcoes: string[]
  resposta: number
  explicacao: string
}

export const perguntas: Pergunta[] = [
  {
    pergunta:
      'Num capacitor sendo carregado, não há cargas atravessando o espaço entre as placas. O que produz campo magnético nessa região?',
    opcoes: [
      'Nada: entre as placas o campo magnético é zero.',
      'O campo elétrico entre as placas, por estar variando no tempo.',
      'Cargas que "vazam" de uma placa para a outra.',
      'O campo magnético da Terra.',
    ],
    resposta: 1,
    explicacao:
      'O fluxo elétrico entre as placas cresce enquanto o capacitor carrega. Esse fluxo variável é a corrente de deslocamento, e ela gera B exatamente como uma corrente comum.',
  },
  {
    pergunta: 'Qual é a unidade de ε₀ · dΦ_E/dt?',
    opcoes: ['Volt', 'Tesla', 'Ampère', 'Coulomb'],
    resposta: 2,
    explicacao:
      'ε₀ tem unidade C²/(N·m²) e Φ_E tem N·m²/C. O produto dividido por segundo dá C/s, ou seja, ampère. Por isso o termo se chama "corrente".',
  },
  {
    pergunta: 'Por que a lei de Ampère original é incompatível com a conservação da carga?',
    opcoes: [
      'Porque ela não tem constantes físicas.',
      'Porque ela implica ∇·J = 0 sempre, o que é falso quando a carga se acumula em algum ponto.',
      'Porque ela só vale para ímãs permanentes.',
      'Porque ela ignora a lei de Coulomb.',
    ],
    resposta: 1,
    explicacao:
      'O divergente de um rotacional é zero, então ∇×B = μ₀J força ∇·J = 0. A equação da continuidade exige ∇·J = −∂ρ/∂t. O termo de Maxwell corrige exatamente essa diferença.',
  },
  {
    pergunta: 'Por que o efeito da corrente de deslocamento era difícil de observar no século XIX?',
    opcoes: [
      'Porque ele só existe no vácuo absoluto.',
      'Porque ele vem multiplicado por μ₀ε₀ = 1/c², um número muito pequeno, e só fica grande com variações muito rápidas.',
      'Porque ele foi proibido pela lei de Lenz.',
      'Porque os campos elétricos da época eram fracos demais para existirem.',
    ],
    resposta: 1,
    explicacao:
      'Com variações lentas, o termo é minúsculo e fica escondido atrás do campo das correntes nos fios. Só em altas frequências, como nos experimentos de Hertz, o efeito aparece claramente.',
  },
  {
    pergunta: 'O que aconteceria com as ondas eletromagnéticas sem a corrente de deslocamento?',
    opcoes: [
      'Seriam mais lentas.',
      'Seriam iguais, só com outra cor.',
      'Não existiriam: E variável não geraria B, e o ciclo que sustenta a onda se quebraria.',
      'Só existiriam dentro de fios.',
    ],
    resposta: 2,
    explicacao:
      'A onda depende de E e B gerarem um ao outro. Faraday cuida de "B variável gera E". Sem o termo de Maxwell, falta o caminho de volta, e a equação de onda vira ∇²E = 0.',
  },
  {
    pergunta: 'O que a lei de Gauss para o magnetismo, ∮B·dA = 0, nos diz?',
    opcoes: [
      'Que campos magnéticos não existem dentro de superfícies fechadas.',
      'Que não existem monopolos magnéticos isolados: as linhas de B são sempre fechadas.',
      'Que o campo magnético é sempre nulo.',
      'Que a carga elétrica total do universo é zero.',
    ],
    resposta: 1,
    explicacao:
      'Todo fluxo magnético que entra numa superfície fechada também sai. Isso equivale a dizer que não há "cargas magnéticas" onde as linhas começam ou terminam.',
  },
]
