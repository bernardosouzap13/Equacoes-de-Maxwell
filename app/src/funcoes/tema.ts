export const coresCampo = {
  e: '#c2410c',
  b: '#0369a1',
  desloc: '#a16207',
  corrente: '#15803d',
  tinta50: '#14130f',
  tinta400: '#66645a',
  tinta600: '#c9c5b3',
} as const

export const tex = {
  e: (s: string) => `\\textcolor{${coresCampo.e}}{${s}}`,
  b: (s: string) => `\\textcolor{${coresCampo.b}}{${s}}`,
  desloc: (s: string) => `\\textcolor{${coresCampo.desloc}}{${s}}`,
  corrente: (s: string) => `\\textcolor{${coresCampo.corrente}}{${s}}`,
}
