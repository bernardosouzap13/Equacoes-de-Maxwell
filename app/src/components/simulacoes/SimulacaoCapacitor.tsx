import { useState } from 'react'
import { ControleSegmentado } from '../interface/ControleSegmentado'
import { Deslizante } from '../interface/Deslizante'
import { circulacao } from '../../funcoes/fisica'
import { formatarCientifico, formatarNumero } from '../../funcoes/formatacao'

type Superficie = 'plana' | 'bojuda'
type Lei = 'ampere' | 'maxwell'

const TOPO_PLACA = 110
const BASE_PLACA = 250
const LINHAS_CAMPO = [125, 152, 180, 208, 235]

const CAMINHO_BOJUDA =
  'M170,70 C300,30 420,40 420,180 C420,320 300,330 170,290 A16,110 0 0 1 170,70 Z'

export default function SimulacaoCapacitor() {
  const [superficie, setSuperficie] = useState<Superficie>('plana')
  const [lei, setLei] = useState<Lei>('ampere')
  const [corrente, setCorrente] = useState(2)

  const comMaxwell = lei === 'maxwell'
  const pelaPlana = corrente
  const pelaBojuda = comMaxwell ? corrente : 0
  const consistente = pelaPlana === pelaBojuda
  const pelaSelecionada = superficie === 'plana' ? pelaPlana : pelaBojuda
  const duracaoFluxo = 2.4 / corrente

  return (
    <div className="painel overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1fr_20rem]">
        <figure className="border-b border-tinta-700/70 p-4 sm:p-6 lg:border-r lg:border-b-0">
          <svg
            viewBox="100 25 600 300"
            className="h-auto w-full"
            role="img"
            aria-label={`Capacitor sendo carregado por uma corrente de ${corrente} ampères. Curva de Ampère em volta do fio, com superfície ${superficie}.`}
          >
            <defs>
              <marker id="seta-capacitor" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--color-campo-e)" />
              </marker>
            </defs>

            <path
              d={CAMINHO_BOJUDA}
              fill={comMaxwell ? 'var(--color-desloc)' : 'var(--color-tinta-600)'}
              fillOpacity={superficie === 'bojuda' ? 0.28 : 0.05}
              stroke={
                superficie === 'bojuda'
                  ? comMaxwell
                    ? 'var(--color-desloc)'
                    : 'var(--color-tinta-400)'
                  : 'var(--color-tinta-700)'
              }
              strokeDasharray={superficie === 'bojuda' ? undefined : '4 6'}
              strokeWidth="1.5"
              className="transition-all duration-500 motion-reduce:transition-none"
            />

            <line x1="0" y1="180" x2="330" y2="180" stroke="var(--color-tinta-600)" strokeWidth="6" />
            <line x1="470" y1="180" x2="800" y2="180" stroke="var(--color-tinta-600)" strokeWidth="6" />
            {[
              [0, 330],
              [470, 800],
            ].map(([x1, x2]) => (
              <line
                key={x1}
                x1={x1}
                y1="180"
                x2={x2}
                y2="180"
                stroke="var(--color-corrente)"
                strokeWidth="3"
                strokeDasharray="6 18"
                strokeLinecap="round"
                style={{ animation: `fluxo-corrente ${duracaoFluxo}s linear infinite` }}
              />
            ))}
            <text x="112" y="160" fill="var(--color-corrente)" fontSize="24" fontStyle="italic">
              i →
            </text>
            <text x="620" y="160" fill="var(--color-corrente)" fontSize="24" fontStyle="italic">
              i →
            </text>

            <rect x="330" y={TOPO_PLACA} width="10" height={BASE_PLACA - TOPO_PLACA} rx="2" fill="var(--color-tinta-300)" />
            <rect x="460" y={TOPO_PLACA} width="10" height={BASE_PLACA - TOPO_PLACA} rx="2" fill="var(--color-tinta-300)" />
            {LINHAS_CAMPO.filter((y) => y !== 180).map((y) => (
              <g key={y}>
                <text x="316" y={y + 5} fill="var(--color-carga-pos)" fontSize="20" textAnchor="middle">
                  +
                </text>
                <text x="484" y={y + 5} fill="var(--color-carga-neg)" fontSize="20" textAnchor="middle">
                  −
                </text>
              </g>
            ))}

            {LINHAS_CAMPO.map((y) => (
              <line
                key={y}
                x1="346"
                y1={y}
                x2="452"
                y2={y}
                stroke="var(--color-campo-e)"
                strokeWidth={1.2 + corrente * 0.35}
                strokeOpacity={0.45 + corrente * 0.1}
                markerEnd="url(#seta-capacitor)"
              />
            ))}
            <text x="400" y={BASE_PLACA + 34} fill="var(--color-campo-e)" fontSize="20" textAnchor="middle">
              E aumentando
            </text>

            <ellipse
              cx="170"
              cy="180"
              rx="16"
              ry="110"
              fill="var(--color-corrente)"
              fillOpacity={superficie === 'plana' ? 0.22 : 0}
              className="transition-all duration-500 motion-reduce:transition-none"
            />
            <ellipse cx="170" cy="180" rx="16" ry="110" fill="none" stroke="var(--color-tinta-50)" strokeWidth="2" strokeDasharray="7 5" />
            <text x="132" y="62" fill="var(--color-tinta-50)" fontSize="24" fontStyle="italic">
              C
            </text>
            {superficie === 'plana' && <circle cx="170" cy="180" r="9" fill="var(--color-corrente)" fillOpacity="0.9" />}
          </svg>
          <figcaption className="mt-3 text-sm leading-relaxed text-tinta-400">
            <strong className="font-medium text-tinta-200">
              {superficie === 'plana' ? 'S₁: plana, cortada pelo fio.' : 'S₂: bojuda, passa entre as placas.'}
            </strong>{' '}
            A curva <em>C</em> é a mesma nos dois casos. Só muda a superfície que ela limita.
          </figcaption>
        </figure>

        <div className="space-y-6 p-4 sm:p-6">
          <ControleSegmentado<Superficie>
            rotulo="Superfície limitada por C"
            valor={superficie}
            aoMudar={setSuperficie}
            opcoes={[
              { valor: 'plana', rotulo: 'Plana (S₁)' },
              { valor: 'bojuda', rotulo: 'Bojuda (S₂)' },
            ]}
          />
          <ControleSegmentado<Lei>
            rotulo="Lei usada"
            valor={lei}
            aoMudar={setLei}
            opcoes={[
              { valor: 'ampere', rotulo: 'Ampère' },
              { valor: 'maxwell', rotulo: 'Ampère-Maxwell' },
            ]}
          />
          <Deslizante
            rotulo="Corrente no fio"
            valor={corrente}
            min={0.5}
            max={5}
            passo={0.5}
            aoMudar={setCorrente}
            textoValor={`${formatarNumero(corrente)} A`}
            cor="var(--color-corrente)"
          />

          <div className="rounded-xl border border-tinta-700 bg-tinta-950 p-4" aria-live="polite">
            <p className="text-xs tracking-wide text-tinta-400 uppercase">∮ B · dl calculado por cada superfície</p>
            <dl className="mt-3 space-y-2 font-codigo text-sm">
              {(
                [
                  ['plana', 'S₁', pelaPlana],
                  ['bojuda', 'S₂', pelaBojuda],
                ] as const
              ).map(([chave, nome, atravessa]) => (
                <div
                  key={chave}
                  className={`flex justify-between gap-3 rounded-lg px-2 py-1 ${
                    superficie === chave ? 'bg-tinta-800 text-tinta-50' : 'text-tinta-300'
                  }`}
                >
                  <dt>{nome}</dt>
                  <dd className="tabular-nums">
                    {atravessa === 0 ? '0' : `${formatarCientifico(circulacao(atravessa))} T·m`}
                  </dd>
                </div>
              ))}
            </dl>
            <p className={`mt-4 text-sm font-medium ${consistente ? 'text-certo' : 'text-errado'}`}>
              {consistente
                ? 'Consistente: as duas superfícies concordam.'
                : 'Contradição: a mesma curva dá dois resultados!'}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-tinta-300">
            {superficie === 'plana'
              ? `O fio atravessa S₁, então ela "vê" a corrente de ${formatarNumero(corrente)} A.`
              : comMaxwell
                ? `Nenhuma carga atravessa S₂, mas o fluxo de E por ela cresce. Esse crescimento conta como uma corrente de deslocamento de ${formatarNumero(pelaSelecionada)} A.`
                : 'Nenhuma carga atravessa S₂. Pela lei de Ampère original, a circulação de B deveria ser zero.'}
          </p>
        </div>
      </div>
    </div>
  )
}
