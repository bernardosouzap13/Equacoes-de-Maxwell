const SOBRESCRITO: Record<string, string> = {
  '-': '⁻',
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
}

const paraSobrescrito = (n: number) =>
  String(n)
    .split('')
    .map((c) => SOBRESCRITO[c] ?? c)
    .join('')

export function formatarNumero(valor: number, digitos = 3): string {
  return Number(valor.toPrecision(digitos)).toLocaleString('pt-BR', {
    maximumFractionDigits: 10,
  })
}

export function formatarCientifico(valor: number, digitos = 3): string {
  if (valor === 0) return '0'
  if (!Number.isFinite(valor)) return 'fora da escala'
  const expoente = Math.floor(Math.log10(Math.abs(valor)))
  if (expoente >= -2 && expoente <= 3) return formatarNumero(valor, digitos)
  const mantissa = valor / 10 ** expoente
  return `${formatarNumero(mantissa, digitos)} × 10${paraSobrescrito(expoente)}`
}

export function formatarTesla(valor: number, digitos = 3): string {
  const unidades: [number, string][] = [
    [1, 'T'],
    [1e-3, 'mT'],
    [1e-6, 'µT'],
    [1e-9, 'nT'],
    [1e-12, 'pT'],
  ]
  const absoluto = Math.abs(valor)
  for (const [fator, unidade] of unidades) {
    if (absoluto >= fator) return `${formatarNumero(valor / fator, digitos)} ${unidade}`
  }
  return `${formatarCientifico(valor, digitos)} T`
}

export function formatarHertz(valor: number): string {
  const unidades: [number, string][] = [
    [1e9, 'GHz'],
    [1e6, 'MHz'],
    [1e3, 'kHz'],
    [1, 'Hz'],
  ]
  for (const [fator, unidade] of unidades) {
    if (valor >= fator) return `${formatarNumero(valor / fator, 3)} ${unidade}`
  }
  return `${formatarNumero(valor, 3)} Hz`
}
