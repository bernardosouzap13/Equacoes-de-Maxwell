import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Secao } from '../interface/Secao'
import { Formula } from '../interface/Formula'
import { ControleSegmentado } from '../interface/ControleSegmentado'
import { Revelar } from '../interface/Revelar'
import { Destaque } from '../interface/Destaque'
import { tex } from '../../funcoes/tema'

type Forma = 'integral' | 'diferencial'

const E = tex.e('\\vec{E}')
const B = tex.b('\\vec{B}')

const equacoes = [
  {
    nome: 'Lei de Gauss',
    integral: `\\oint_S ${E}\\cdot d\\vec{A} = \\dfrac{Q_{\\text{int}}}{\\varepsilon_0}`,
    diferencial: `\\nabla\\cdot ${E} = \\dfrac{\\rho}{\\varepsilon_0}`,
    significado: 'Cargas são fontes (ou sumidouros) de campo elétrico.',
    teorema: 'divergência',
  },
  {
    nome: 'Gauss para o magnetismo',
    integral: `\\oint_S ${B}\\cdot d\\vec{A} = 0`,
    diferencial: `\\nabla\\cdot ${B} = 0`,
    significado: 'Não existem monopolos magnéticos: as linhas de B são sempre fechadas.',
    teorema: 'divergência',
  },
  {
    nome: 'Lei de Faraday',
    integral: `\\oint_C ${E}\\cdot d\\vec{l} = -\\dfrac{d\\Phi_B}{dt}`,
    diferencial: `\\nabla\\times ${E} = -\\dfrac{\\partial ${B}}{\\partial t}`,
    significado: 'Campo magnético variável gera campo elétrico circulante.',
    teorema: 'Stokes',
  },
  {
    nome: 'Lei de Ampère-Maxwell',
    integral: `\\oint_C ${B}\\cdot d\\vec{l} = \\mu_0\\, ${tex.corrente('i')} + ${tex.desloc('\\mu_0\\varepsilon_0 \\dfrac{d\\Phi_E}{dt}')}`,
    diferencial: `\\nabla\\times ${B} = \\mu_0 ${tex.corrente('\\vec{J}')} + ${tex.desloc('\\mu_0\\varepsilon_0 \\dfrac{\\partial \\vec{E}}{\\partial t}')}`,
    significado: 'Correntes e campo elétrico variável geram campo magnético circulante.',
    teorema: 'Stokes',
  },
]

export function QuatroEquacoes() {
  const [forma, setForma] = useState<Forma>('integral')

  return (
    <Secao
      id="as-quatro-equacoes"
      numero={5}
      sobretitulo="A síntese"
      titulo="As quatro equações de Maxwell"
      introducao="Com o termo novo, as quatro leis formam um sistema fechado e consistente. Elas descrevem tudo o que campos elétricos e magnéticos podem fazer, de um ímã de geladeira a uma antena de celular."
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <ControleSegmentado<Forma>
          rotulo="Forma das equações"
          valor={forma}
          aoMudar={setForma}
          className="w-full sm:w-80"
          opcoes={[
            { valor: 'integral', rotulo: 'Integral' },
            { valor: 'diferencial', rotulo: 'Diferencial' },
          ]}
        />
        <p className="max-w-sm text-sm text-tinta-400">
          {forma === 'integral'
            ? 'Forma integral: fala de superfícies e curvas inteiras. Boa para problemas com simetria.'
            : 'Forma diferencial: vale em cada ponto do espaço. É a forma usada para deduzir a onda.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {equacoes.map((eq, i) => (
          <Revelar key={eq.nome} atraso={i * 0.06}>
            <article className="painel flex h-full flex-col p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold">{eq.nome}</h3>
                <span className="font-codigo text-xs text-tinta-400">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="relative my-6 grid min-h-20 place-items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={forma}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    <Formula destaque tex={forma === 'integral' ? eq.integral : eq.diferencial} />
                  </m.div>
                </AnimatePresence>
              </div>
              <p className="flex-1 leading-relaxed text-tinta-300">{eq.significado}</p>
              <p className="mt-4 text-xs text-tinta-400">
                Ponte entre as formas: teorema {eq.teorema === 'Stokes' ? 'de Stokes' : 'da divergência'}
              </p>
            </article>
          </Revelar>
        ))}
      </div>

      <Revelar>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="painel p-5">
            <h3 className="font-semibold">Teorema da divergência</h3>
            <Formula destaque className="mt-3" tex="\oint_S \vec{F}\cdot d\vec{A} = \int_V (\nabla\cdot\vec{F})\, dV" />
            <p className="mt-3 text-sm leading-relaxed text-tinta-300">
              Transforma o fluxo por uma superfície fechada na soma das &quot;fontes&quot; dentro do volume. Liga as
              duas leis de Gauss às suas formas diferenciais.
            </p>
          </div>
          <div className="painel p-5">
            <h3 className="font-semibold">Teorema de Stokes</h3>
            <Formula destaque className="mt-3" tex="\oint_C \vec{F}\cdot d\vec{l} = \int_S (\nabla\times\vec{F})\cdot d\vec{A}" />
            <p className="mt-3 text-sm leading-relaxed text-tinta-300">
              Transforma a circulação numa curva na soma dos &quot;redemoinhos&quot; na superfície. Liga Faraday e
              Ampère-Maxwell às suas formas diferenciais.
            </p>
          </div>
        </div>
      </Revelar>

      <Destaque tipo="nota" titulo="Curiosidade histórica">
        Maxwell não escreveu &quot;quatro equações&quot;. Seu artigo de 1865 tinha cerca de vinte equações em
        componentes. A forma compacta com divergente e rotacional que usamos hoje foi organizada por Oliver Heaviside
        por volta de 1884.
      </Destaque>
    </Secao>
  )
}
