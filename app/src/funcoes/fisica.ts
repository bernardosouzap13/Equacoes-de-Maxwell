export const EPSILON_0 = 8.8541878128e-12
export const MU_0 = 1.25663706212e-6
export const C_LUZ = 299_792_458
export const CAMPO_TERRA = 5e-5

export function velocidadeOnda(mu: number, epsilon: number): number {
  return 1 / Math.sqrt(mu * epsilon)
}

export function campoEntrePlacas(r: number, raio: number, taxaE: number): number {
  const k = MU_0 * EPSILON_0 * taxaE
  if (r <= raio) return (k * r) / 2
  return (k * raio * raio) / (2 * r)
}

export function correnteDeslocamento(area: number, taxaE: number): number {
  return EPSILON_0 * area * taxaE
}

export function circulacao(correnteEnvolvida: number): number {
  return MU_0 * correnteEnvolvida
}
