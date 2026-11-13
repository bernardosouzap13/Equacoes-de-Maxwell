import { useState } from 'react'
import { Deslizante } from '../interface/Deslizante'
import { C_LUZ, EPSILON_0, MU_0, velocidadeOnda } from '../../funcoes/fisica'
import { formatarCientifico, formatarNumero } from '../../funcoes/formatacao'

const textoFator = (log2: number) => {
  const fator = 2 ** log2
  return fator === 1 ? 'valor real' : `${formatarNumero(fator, 3)} × o real`
}

export default function VelocidadeLuz() {
  const [logEpsilon, setLogEpsilon] = useState(0)
  const [logMu, setLogMu] = useState(0)
  const epsilon = EPSILON_0 * 2 ** logEpsilon
  const mu = MU_0 * 2 ** logMu
  const v = velocidadeOnda(mu, epsilon)
  const n = C_LUZ / v
  const noVacuo = logEpsilon === 0 && logMu === 0

  return (
    <div className="painel grid overflow-hidden lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-5 border-b border-tinta-700/70 p-4 sm:p-6 lg:border-r lg:border-b-0">
        <Deslizante
          rotulo="Permissividade ε"
          valor={logEpsilon}
          min={-2}
          max={2}
          passo={0.1}
          aoMudar={setLogEpsilon}
          textoValor={textoFator(logEpsilon)}
          cor="var(--color-campo-e)"
        />
        <Deslizante
          rotulo="Permeabilidade μ"
          valor={logMu}
          min={-2}
          max={2}
          passo={0.1}
          aoMudar={setLogMu}
          textoValor={textoFator(logMu)}
          cor="var(--color-campo-b)"
        />
        <button
          type="button"
          onClick={() => {
            setLogEpsilon(0)
            setLogMu(0)
          }}
          disabled={noVacuo}
          className="min-h-11 rounded-lg border border-tinta-700 px-4 text-sm text-tinta-300 transition-colors hover:text-tinta-50 disabled:opacity-40"
        >
          Voltar ao vácuo
        </button>
      </div>

      <div className="flex flex-col justify-center p-4 sm:p-6" aria-live="polite">
        <p className="text-sm text-tinta-400">Velocidade da onda, v = 1/√(με)</p>
        <p className="mt-2 font-titulo text-4xl font-semibold text-tinta-50 tabular-nums sm:text-5xl">
          {noVacuo ? formatarNumero(C_LUZ, 9) : formatarCientifico(v, 4)}
          <span className="ml-2 text-lg font-normal text-tinta-400">m/s</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-tinta-300">
          {noVacuo
            ? 'Com os valores medidos de ε₀ e μ₀, sai exatamente a velocidade da luz.'
            : n > 1
              ? `A onda fica ${formatarNumero(n, 3)} vezes mais lenta. É o que acontece dentro de materiais como água e vidro: o índice de refração é n = √(εᵣμᵣ).`
              : `A onda ficaria ${formatarNumero(1 / n, 3)} vezes mais rápida que a luz no vácuo, algo que nenhum material comum faz.`}
        </p>
      </div>
    </div>
  )
}
