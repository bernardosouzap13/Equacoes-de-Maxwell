import { useState } from 'react'
import { Deslizante } from '../interface/Deslizante'
import { campoEntrePlacas, correnteDeslocamento } from '../../funcoes/fisica'
import { formatarCientifico, formatarNumero, formatarTesla } from '../../funcoes/formatacao'

const LARGURA = 640
const ALTURA = 320
const MARGEM = { esquerda: 62, direita: 20, topo: 30, base: 52 }
const LARGURA_UTIL = LARGURA - MARGEM.esquerda - MARGEM.direita
const ALTURA_UTIL = ALTURA - MARGEM.topo - MARGEM.base
const ALCANCE = 3

const CURVA = Array.from({ length: 151 }, (_, k) => {
  const rr = (k / 150) * ALCANCE
  const b = rr <= 1 ? rr : 1 / rr
  const px = MARGEM.esquerda + (rr / ALCANCE) * LARGURA_UTIL
  const py = MARGEM.topo + ALTURA_UTIL - b * ALTURA_UTIL * 0.9
  return `${k === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`
}).join(' ')

export default function GraficoCampo() {
  const [raioCm, setRaioCm] = useState(5)
  const [expoenteTaxa, setExpoenteTaxa] = useState(13)
  const [sonda, setSonda] = useState(1)

  const raio = raioCm / 100
  const taxaE = 10 ** expoenteTaxa
  const campoMaximo = campoEntrePlacas(raio, raio, taxaE)
  const correnteD = correnteDeslocamento(Math.PI * raio * raio, taxaE)
  const campoSonda = campoEntrePlacas(sonda * raio, raio, taxaE)

  const [fatorUnidade, nomeUnidade] = campoMaximo >= 1e-6 ? [1e-6, 'µT'] : [1e-9, 'nT']

  const x = (rSobreR: number) => MARGEM.esquerda + (rSobreR / ALCANCE) * LARGURA_UTIL
  const y = (b: number) => MARGEM.topo + ALTURA_UTIL - (b / campoMaximo) * ALTURA_UTIL * 0.9

  return (
    <div className="painel overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_20rem]">
        <figure className="border-b border-tinta-700/70 p-4 sm:p-6 lg:border-r lg:border-b-0">
          <svg
            viewBox={`0 0 ${LARGURA} ${ALTURA}`}
            className="h-auto w-full"
            role="img"
            aria-label={`Gráfico do campo magnético em função da distância ao eixo. Cresce linearmente até a borda das placas, onde vale ${formatarTesla(campoMaximo)}, e depois cai com 1 sobre r.`}
          >
            <rect
              x={x(0)}
              y={MARGEM.topo}
              width={x(1) - x(0)}
              height={ALTURA_UTIL}
              fill="var(--color-desloc)"
              fillOpacity="0.08"
            />
            <text x={(x(0) + x(1)) / 2} y={MARGEM.topo + 16} fill="var(--color-desloc)" fontSize="15" textAnchor="middle">
              entre as placas
            </text>
            <text x={(x(1) + x(3)) / 2} y={MARGEM.topo + 16} fill="var(--color-tinta-400)" fontSize="15" textAnchor="middle">
              fora: como um fio com corrente i_D
            </text>

            <line
              x1={MARGEM.esquerda}
              y1={MARGEM.topo + ALTURA_UTIL}
              x2={LARGURA - MARGEM.direita}
              y2={MARGEM.topo + ALTURA_UTIL}
              stroke="var(--color-tinta-600)"
            />
            <line
              x1={MARGEM.esquerda}
              y1={MARGEM.topo}
              x2={MARGEM.esquerda}
              y2={MARGEM.topo + ALTURA_UTIL}
              stroke="var(--color-tinta-600)"
            />
            {[0, 1, 2, 3].map((k) => (
              <g key={k}>
                <line
                  x1={x(k)}
                  y1={MARGEM.topo + ALTURA_UTIL}
                  x2={x(k)}
                  y2={MARGEM.topo + ALTURA_UTIL + 5}
                  stroke="var(--color-tinta-600)"
                />
                <text x={x(k)} y={MARGEM.topo + ALTURA_UTIL + 20} fill="var(--color-tinta-400)" fontSize="15" textAnchor="middle">
                  {formatarNumero(k * raioCm, 3)}
                </text>
              </g>
            ))}
            <text x={LARGURA - MARGEM.direita} y={ALTURA - 6} fill="var(--color-tinta-400)" fontSize="15" textAnchor="end">
              r (cm)
            </text>
            {[0, 0.5, 1].map((f) => (
              <g key={f}>
                <line
                  x1={MARGEM.esquerda}
                  y1={y(f * campoMaximo)}
                  x2={LARGURA - MARGEM.direita}
                  y2={y(f * campoMaximo)}
                  stroke="var(--color-tinta-700)"
                  strokeDasharray="3 5"
                />
                <text x={MARGEM.esquerda - 8} y={y(f * campoMaximo) + 4} fill="var(--color-tinta-400)" fontSize="14" textAnchor="end">
                  {formatarNumero((f * campoMaximo) / fatorUnidade, 2)}
                </text>
              </g>
            ))}
            <text x={MARGEM.esquerda - 8} y={MARGEM.topo - 8} fill="var(--color-tinta-400)" fontSize="15" textAnchor="end">
              B ({nomeUnidade})
            </text>

            <path d={CURVA} fill="none" stroke="var(--color-campo-b)" strokeWidth="2.5" />

            <line
              x1={x(sonda)}
              y1={MARGEM.topo}
              x2={x(sonda)}
              y2={MARGEM.topo + ALTURA_UTIL}
              stroke="var(--color-tinta-400)"
              strokeDasharray="2 4"
            />
            <circle cx={x(sonda)} cy={y(campoSonda)} r="6" fill="var(--color-campo-b)" stroke="var(--color-tinta-950)" strokeWidth="2" />
          </svg>
          <figcaption className="mt-2 text-sm text-tinta-400">
            Dentro das placas, B cresce com r porque a curva envolve cada vez mais fluxo elétrico. Fora delas, o fluxo
            envolvido não aumenta mais e B cai com 1/r.
          </figcaption>
        </figure>

        <div className="space-y-5 p-4 sm:p-6">
          <Deslizante
            rotulo="Raio das placas R"
            valor={raioCm}
            min={2}
            max={10}
            passo={0.5}
            aoMudar={setRaioCm}
            textoValor={`${formatarNumero(raioCm)} cm`}
            cor="var(--color-tinta-300)"
          />
          <Deslizante
            rotulo="Taxa dE/dt"
            valor={expoenteTaxa}
            min={11}
            max={14}
            passo={0.1}
            aoMudar={setExpoenteTaxa}
            textoValor={`${formatarCientifico(taxaE, 2)} V/(m·s)`}
            cor="var(--color-campo-e)"
          />
          <Deslizante
            rotulo="Ponto de medição r"
            valor={sonda}
            min={0}
            max={3}
            passo={0.05}
            aoMudar={setSonda}
            textoValor={`${formatarNumero(sonda * raioCm, 3)} cm`}
            cor="var(--color-campo-b)"
          />
          <dl className="space-y-2 rounded-xl border border-tinta-700 bg-tinta-950 p-4 font-codigo text-sm" aria-live="polite">
            <div className="flex justify-between gap-3">
              <dt className="text-tinta-400">B no ponto</dt>
              <dd className="text-campo-b tabular-nums">{formatarTesla(campoSonda)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-tinta-400">B na borda (r = R)</dt>
              <dd className="text-tinta-50 tabular-nums">{formatarTesla(campoMaximo)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-tinta-400">i_D total</dt>
              <dd className="text-desloc tabular-nums">{formatarCientifico(correnteD, 3)} A</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
