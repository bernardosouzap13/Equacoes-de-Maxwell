export type LinkSecao = {
  id: string
  curto: string
  rotulo: string
}

export const secoes: LinkSecao[] = [
  { id: 'o-que-se-sabia', curto: 'Antes', rotulo: 'O que já se sabia' },
  { id: 'o-problema', curto: 'O problema', rotulo: 'O problema na lei de Ampère' },
  { id: 'a-correcao', curto: 'A correção', rotulo: 'A correção de Maxwell' },
  { id: 'por-que-ninguem-viu', curto: 'Por que não se via', rotulo: 'Por que ninguém tinha visto' },
  { id: 'as-quatro-equacoes', curto: '4 equações', rotulo: 'As quatro equações' },
  { id: 'a-luz', curto: 'A luz', rotulo: 'Da síntese à luz' },
  { id: 'alem', curto: 'Além', rotulo: 'Indo além' },
  { id: 'teste-se', curto: 'Quiz', rotulo: 'Teste-se' },
]
