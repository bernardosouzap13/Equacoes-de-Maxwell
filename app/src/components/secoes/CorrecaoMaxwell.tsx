import { lazy } from 'react'
import { Secao } from '../interface/Secao'
import { Formula } from '../interface/Formula'
import { Destaque } from '../interface/Destaque'
import { Deducao } from '../interface/Deducao'
import { CarregarAoVer } from '../interface/CarregarAoVer'
import { Revelar } from '../interface/Revelar'
import { tex } from '../../funcoes/tema'
import { EPSILON_0 } from '../../funcoes/fisica'
import { formatarNumero } from '../../funcoes/formatacao'

const GraficoCampo = lazy(() => import('../simulacoes/GraficoCampo'))

const passos = [
  {
    titulo: 'Gauss numa das placas',
    texto: 'A carga acumulada na placa e o fluxo elétrico entre as placas estão amarrados pela lei de Gauss.',
    formula: `q = \\varepsilon_0\\, ${tex.e('\\Phi_E')}`,
  },
  {
    titulo: 'Derivando no tempo',
    texto: 'A taxa com que a carga chega à placa é justamente a corrente no fio.',
    formula: `${tex.corrente('i')} = \\dfrac{dq}{dt} = \\varepsilon_0 \\dfrac{d${tex.e('\\Phi_E')}}{dt}`,
  },
  {
    titulo: 'Um nome para o novo termo',
    texto: 'Entre as placas, o fluxo elétrico variável "faz o papel" da corrente que não consegue passar.',
    formula: `${tex.desloc('i_D')} \\equiv \\varepsilon_0 \\dfrac{d${tex.e('\\Phi_E')}}{dt}`,
  },
]

const EXEMPLO = { area: 0.2, em: 8.0e5, periodo: 4.0e-6 }
const omega = (2 * Math.PI) / EXEMPLO.periodo
const amplitudeCorrente = EPSILON_0 * EXEMPLO.area * EXEMPLO.em * omega

export function CorrecaoMaxwell() {
  return (
    <Secao
      id="a-correcao"
      numero={3}
      sobretitulo="A correção de Maxwell"
      titulo={
        <>
          A <span className="text-desloc">corrente de deslocamento</span>
        </>
      }
      introducao="Maxwell propôs que um campo elétrico variando no tempo produz campo magnético exatamente como uma corrente produziria. Para descobrir quanto, basta olhar de novo para o capacitor."
    >
      <ol className="grid gap-4 md:grid-cols-3">
        {passos.map((p, i) => (
          <Revelar key={p.titulo} atraso={i * 0.08}>
            <li className="painel flex h-full flex-col p-5">
              <span className="font-codigo text-xs text-tinta-400">Passo {i + 1}</span>
              <h3 className="mt-1 text-lg font-semibold">{p.titulo}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-tinta-300">{p.texto}</p>
              <Formula tex={p.formula} destaque className="mt-4" />
            </li>
          </Revelar>
        ))}
      </ol>

      <Revelar>
        <div className="painel relative overflow-hidden p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: 'radial-gradient(60% 80% at 50% 0%, var(--color-primaria), transparent)' }}
          />
          <p className="relative text-center text-sm tracking-wide text-tinta-400 uppercase">Lei de Ampère-Maxwell</p>
          <Formula
            destaque
            className="relative mt-4 text-xl sm:text-2xl"
            tex={`\\oint_C ${tex.b('\\vec{B}')}\\cdot d\\vec{l} = \\mu_0\\,${tex.corrente('i')} + ${tex.desloc('\\mu_0 \\varepsilon_0 \\dfrac{d\\Phi_E}{dt}')}`}
          />
          <p className="relative mx-auto mt-6 max-w-2xl text-center leading-relaxed text-tinta-300">
            Agora a superfície bojuda também "vê" uma corrente: a de deslocamento. Como{' '}
            <span className="text-desloc">i_D = i</span>, as duas superfícies dão o mesmo resultado e a contradição
            desaparece.
          </p>
        </div>
      </Revelar>

      <div className="grid gap-4 md:grid-cols-2">
        <Destaque tipo="nota" titulo="Confira a unidade">
          <Formula tex="\varepsilon_0\,\frac{d\Phi_E}{dt}\;\to\;\frac{\text{C}^2}{\text{N}\cdot\text{m}^2}\cdot\frac{\text{N}\cdot\text{m}^2}{\text{C}\cdot\text{s}} = \frac{\text{C}}{\text{s}} = \text{A}" />
          <p className="mt-2">
            O termo tem unidade de corrente, mas <strong>não é</strong> carga se movendo. É por isso que o nome
            &quot;corrente de deslocamento&quot; é histórico e meio enganoso.
          </p>
        </Destaque>
        <Destaque tipo="ideia" titulo="O sinal importa">
          Na lei de Faraday há um sinal de menos; aqui, o termo novo é positivo. Se o fluxo elétrico aumenta, o B
          induzido circula no sentido da regra da mão direita. Na próxima seção sobre a luz, essa diferença de sinais
          será essencial.
        </Destaque>
      </div>

      <Deducao titulo="Um segundo argumento: a conservação da carga">
        <p className="text-tinta-300">
          O capacitor não é um caso isolado. A lei de Ampère original é incompatível com a conservação da carga
          sempre que a carga se acumula em algum lugar. Na forma diferencial, a lei original diz:
        </p>
        <Formula destaque tex={`\\nabla \\times ${tex.b('\\vec{B}')} = \\mu_0 \\vec{J}`} />
        <p className="text-tinta-300">
          O divergente de um rotacional é sempre zero. Aplicando o divergente dos dois lados:
        </p>
        <Formula destaque tex={`0 = \\nabla \\cdot (\\nabla \\times ${tex.b('\\vec{B}')}) = \\mu_0\\, \\nabla \\cdot \\vec{J} \\quad\\Rightarrow\\quad \\nabla \\cdot \\vec{J} = 0`} />
        <p className="text-tinta-300">
          Mas a equação da continuidade, que expressa a conservação local da carga, diz que{' '}
          <Formula tex="\nabla \cdot \vec{J} = -\partial \rho / \partial t" />. Logo, a lei original só vale quando a
          densidade de carga não muda, ou seja, em situações estáticas. Agora some o termo de Maxwell e use a lei de
          Gauss, <Formula tex={`\\nabla\\cdot${tex.e('\\vec{E}')} = \\rho/\\varepsilon_0`} />:
        </p>
        <Formula
          destaque
          tex={`\\nabla \\cdot \\vec{J} + \\varepsilon_0 \\frac{\\partial}{\\partial t}(\\nabla \\cdot ${tex.e('\\vec{E}')}) = \\nabla \\cdot \\vec{J} + \\frac{\\partial \\rho}{\\partial t} = 0 \\;\\checkmark`}
        />
        <p className="text-tinta-300">
          O termo novo é exatamente o que faltava para a teoria respeitar a conservação da carga. O capacitor é só o
          exemplo mais fácil de visualizar desse problema geral.
        </p>
      </Deducao>

      <div>
        <Revelar>
          <h3 className="text-2xl font-semibold">O campo magnético entre as placas</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-tinta-300">
            Para placas circulares de raio R, com campo elétrico uniforme entre elas, a lei de Ampère-Maxwell
            numa circunferência de raio r centrada no eixo dá:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="painel p-4">
              <p className="text-sm text-tinta-400">dentro (r ≤ R)</p>
              <Formula destaque tex={`${tex.b('B')} = \\dfrac{\\mu_0 \\varepsilon_0\\, r}{2} \\dfrac{d${tex.e('E')}}{dt}`} />
            </div>
            <div className="painel p-4">
              <p className="text-sm text-tinta-400">fora (r ≥ R)</p>
              <Formula destaque tex={`${tex.b('B')} = \\dfrac{\\mu_0 \\varepsilon_0\\, R^2}{2r} \\dfrac{d${tex.e('E')}}{dt}`} />
            </div>
          </div>
        </Revelar>
        <div className="mt-6">
          <CarregarAoVer alturaMinima="32rem" rotulo="gráfico do campo magnético">
            <GraficoCampo />
          </CarregarAoVer>
        </div>
      </div>

      <Revelar>
        <article className="painel p-6">
          <p className="font-codigo text-xs tracking-widest text-campo-e uppercase">Exemplo resolvido</p>
          <h3 className="mt-2 text-xl font-semibold">Corrente de deslocamento de um campo oscilante</h3>
          <p className="mt-3 leading-relaxed text-tinta-300">
            Uma área A = 0,20 m² no plano xy é atravessada por um campo{' '}
            <Formula tex={`${tex.e('\\vec{E}')} = E_m \\cos(\\omega t)\\,\\hat{k}`} />, com E<sub>m</sub> = 8,00 × 10⁵
            N/C e período T = 4,0 µs. Qual é a corrente de deslocamento e quando ela se anula?
          </p>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            <Formula
              destaque
              tex={`${tex.desloc('i_D')} = \\varepsilon_0 A \\frac{dE}{dt} = -\\varepsilon_0 A E_m \\omega \\sin(\\omega t)`}
            />
            <Formula destaque tex="\omega = \frac{2\pi}{T} \approx 1{,}57\times10^{6}\ \text{rad/s}" />
          </div>
          <p className="mt-4 leading-relaxed text-tinta-300">
            A amplitude é ε₀ A E<sub>m</sub> ω ≈{' '}
            <strong className="text-desloc">{formatarNumero(amplitudeCorrente, 3)} A</strong>. A corrente se anula quando{' '}
            <Formula tex="\sin(\omega t) = 0" />, ou seja, em t = nT/2 = 0, 2 µs, 4 µs… Esses são justamente os
            instantes em que o campo passa pelos seus valores máximos: o que importa é a <em>variação</em> de E, não
            o seu valor.
          </p>
        </article>
      </Revelar>
    </Secao>
  )
}
