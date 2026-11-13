import { useState } from 'react'
import { Deslizante } from '../interface/Deslizante'
import { C_LUZ, CAMPO_TERRA, EPSILON_0, MU_0 } from '../../funcoes/fisica'
import { formatarCientifico, formatarHertz, formatarNumero, formatarTesla } from '../../funcoes/formatacao'

const E0 = 1e5
const RAIO = 0.05
const LOG_MIN = -14
const LOG_MAX = -2

const atalhos = [
  { rotulo: 'Rede elétrica', f: 60 },
  { rotulo: 'Rádio AM', f: 1e6 },
  { rotulo: 'Rádio FM', f: 1e8 },
  { rotulo: 'Wi-Fi', f: 2.4e9 },
]

const paraPorcentagem = (b: number) =>
  Math.min(100, Math.max(0, ((Math.log10(b) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100))

export default function EstimativaFrequencia() {
  const [logF, setLogF] = useState(Math.log10(60))
  const f = 10 ** logF
  const campo = MU_0 * EPSILON_0 * (RAIO / 2) * 2 * Math.PI * f * E0
  const razao = CAMPO_TERRA / campo
  const comprimentoOnda = C_LUZ / f
  const deixaDeValer = comprimentoOnda < 20 * RAIO

  return (
    <div className="painel p-4 sm:p-6">
      <p className="text-sm leading-relaxed text-tinta-300">
        Placas de raio 5 cm, campo elétrico oscilando com amplitude de 10⁵ V/m (bem forte). Qual é o campo
        magnético induzido na borda?
      </p>

      <div className="mt-5">
        <Deslizante
          rotulo="Frequência da oscilação"
          valor={logF}
          min={0}
          max={10}
          passo={0.02}
          aoMudar={setLogF}
          textoValor={formatarHertz(f)}
          cor="var(--color-campo-e)"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {atalhos.map((a) => (
            <button
              key={a.rotulo}
              type="button"
              onClick={() => setLogF(Math.log10(a.f))}
              className="min-h-11 rounded-full border border-tinta-700 px-4 text-sm text-tinta-300 transition-colors hover:border-tinta-400 hover:text-tinta-50"
            >
              {a.rotulo} · {formatarHertz(a.f)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8" aria-live="polite">
        <div className="relative h-12 rounded-xl border border-tinta-700 bg-tinta-950">
          <div
            className="absolute inset-y-0 left-0 rounded-xl bg-gradient-to-r from-campo-b/30 to-campo-b transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${paraPorcentagem(campo)}%` }}
          />
          <div
            className="absolute inset-y-[-6px] w-0.5 bg-tinta-50"
            style={{ left: `${paraPorcentagem(CAMPO_TERRA)}%` }}
            aria-hidden="true"
          />
          <span
            className="absolute -top-6 -translate-x-1/2 text-xs whitespace-nowrap text-tinta-200"
            style={{ left: `${paraPorcentagem(CAMPO_TERRA)}%` }}
          >
            campo da Terra
          </span>
        </div>
        <div className="mt-1 flex justify-between font-codigo text-xs text-tinta-400">
          <span>10⁻¹⁴ T</span>
          <span>escala logarítmica</span>
          <span>10⁻² T</span>
        </div>

        <dl className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-tinta-700 bg-tinta-950 p-4">
            <dt className="text-xs text-tinta-400">B induzido</dt>
            <dd className="mt-1 font-codigo text-lg text-campo-b tabular-nums">{formatarTesla(campo)}</dd>
          </div>
          <div className="rounded-xl border border-tinta-700 bg-tinta-950 p-4">
            <dt className="text-xs text-tinta-400">Comparado à Terra (≈ 50 µT)</dt>
            <dd className="mt-1 font-codigo text-lg text-tinta-50 tabular-nums">
              {razao >= 1 ? `${formatarCientifico(razao, 2)}× menor` : `${formatarNumero(1 / razao, 2)}× maior`}
            </dd>
          </div>
          <div className="rounded-xl border border-tinta-700 bg-tinta-950 p-4">
            <dt className="text-xs text-tinta-400">Comprimento de onda λ = c/f</dt>
            <dd className="mt-1 font-codigo text-lg text-tinta-50 tabular-nums">
              {comprimentoOnda >= 1000
                ? `${formatarCientifico(comprimentoOnda / 1000, 2)} km`
                : `${formatarCientifico(comprimentoOnda, 2)} m`}
            </dd>
          </div>
        </dl>

        {deixaDeValer && (
          <p className="mt-4 rounded-xl border border-campo-e/40 bg-campo-e/10 p-4 text-sm leading-relaxed text-tinta-200">
            Aqui o comprimento de onda já é comparável ao tamanho das placas. A conta &quot;quase estática&quot; deixa
            de valer: os campos não ficam mais presos ao capacitor e passam a se propagar como onda. É exatamente o
            regime em que Hertz detectou as ondas eletromagnéticas.
          </p>
        )}
      </div>
    </div>
  )
}
