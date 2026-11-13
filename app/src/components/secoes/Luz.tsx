import { lazy } from 'react'
import { Secao } from '../interface/Secao'
import { Formula } from '../interface/Formula'
import { Deducao } from '../interface/Deducao'
import { CarregarAoVer } from '../interface/CarregarAoVer'
import { Revelar } from '../interface/Revelar'
import { Destaque } from '../interface/Destaque'
import { tex } from '../../funcoes/tema'

const LaboratorioOnda = lazy(() => import('../simulacoes/LaboratorioOnda'))
const VelocidadeLuz = lazy(() => import('../simulacoes/VelocidadeLuz'))

const E = tex.e('\\vec{E}')
const B = tex.b('\\vec{B}')

export function Luz() {
  return (
    <Secao
      id="a-luz"
      numero={6}
      sobretitulo="A consequência"
      titulo={
        <>
          Da síntese à{' '}<span className="bg-[linear-gradient(transparent_58%,var(--color-primaria)_58%,var(--color-primaria)_92%,transparent_92%)] px-1">luz</span>
        </>
      }
      introducao="Longe de cargas e correntes, sobram só os dois termos que ligam os campos entre si. Um alimenta o outro, e o resultado é uma perturbação que viaja sozinha pelo espaço vazio."
    >
      <Revelar>
        <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div className="painel p-5 text-center">
            <p className="text-sm text-tinta-400">Faraday</p>
            <Formula destaque className="mt-2" tex={`\\nabla\\times ${E} = -\\dfrac{\\partial ${B}}{\\partial t}`} />
            <p className="mt-2 text-sm text-tinta-300">B variável → gera E</p>
          </div>
          <p aria-hidden="true" className="text-center font-codigo text-2xl text-tinta-400">
            ⇄
          </p>
          <div className="painel p-5 text-center">
            <p className="text-sm text-tinta-400">Ampère-Maxwell (no vácuo)</p>
            <Formula
              destaque
              className="mt-2"
              tex={`\\nabla\\times ${B} = ${tex.desloc('\\mu_0\\varepsilon_0 \\dfrac{\\partial \\vec{E}}{\\partial t}')}`}
            />
            <p className="mt-2 text-sm text-tinta-300">E variável → gera B</p>
          </div>
        </div>
      </Revelar>

      <CarregarAoVer alturaMinima="30rem" rotulo="animação da onda">
        <LaboratorioOnda />
      </CarregarAoVer>

      <Deducao titulo="Dedução da equação de onda">
        <p className="text-tinta-300">
          No vácuo, <Formula tex={`\\nabla\\cdot${E} = 0`} />. Aplicamos o rotacional na lei de Faraday e usamos a
          identidade <Formula tex="\nabla\times(\nabla\times\vec{F}) = \nabla(\nabla\cdot\vec{F}) - \nabla^2\vec{F}" />:
        </p>
        <Formula destaque tex={`\\nabla\\times(\\nabla\\times ${E}) = \\nabla(\\nabla\\cdot ${E}) - \\nabla^2 ${E} = -\\nabla^2 ${E}`} />
        <p className="text-tinta-300">Pelo outro lado, trocando a ordem das derivadas e usando Ampère-Maxwell:</p>
        <Formula
          destaque
          tex={`\\nabla\\times(\\nabla\\times ${E}) = -\\frac{\\partial}{\\partial t}(\\nabla\\times ${B}) = -${tex.desloc('\\mu_0\\varepsilon_0')}\\frac{\\partial^2 ${E}}{\\partial t^2}`}
        />
        <p className="text-tinta-300">Igualando as duas expressões:</p>
        <Formula destaque className="text-lg" tex={`\\nabla^2 ${E} = \\mu_0\\varepsilon_0 \\frac{\\partial^2 ${E}}{\\partial t^2}`} />
        <p className="text-tinta-300">
          Essa é a equação de onda <Formula tex="\nabla^2 f = \frac{1}{v^2}\frac{\partial^2 f}{\partial t^2}" />, com
          velocidade <Formula tex="v = 1/\sqrt{\mu_0\varepsilon_0}" />. O mesmo procedimento, partindo de
          Ampère-Maxwell, dá uma equação idêntica para B.
        </p>
        <p className="text-tinta-300">
          Sem o termo de Maxwell, teríamos <Formula tex={`\\nabla\\times${B} = 0`} /> no vácuo, o lado direito
          seria zero e sobraria <Formula tex={`\\nabla^2${E} = 0`} />: nenhuma onda. Os sinais opostos de Faraday (−)
          e de Ampère-Maxwell (+) também importam: eles produzem o sinal certo para uma solução que oscila e viaja,
          em vez de crescer ou morrer.
        </p>
      </Deducao>

      <Revelar>
        <div className="painel flex flex-col items-center gap-3 p-8 text-center">
          <Formula destaque className="text-2xl sm:text-3xl" tex="c = \frac{1}{\sqrt{\mu_0\varepsilon_0}} \approx 3{,}00\times10^{8}\ \text{m/s}" />
          <p className="max-w-2xl leading-relaxed text-tinta-300">
            Duas constantes medidas em experimentos de eletricidade e magnetismo, com cargas, ímãs e fios, dão a
            velocidade de uma onda. Quando Maxwell fez essa conta, o número bateu com a velocidade da luz medida por
            Fizeau, cerca de 3,1 × 10⁸ m/s.
          </p>
        </div>
      </Revelar>

      <div>
        <Revelar>
          <h3 className="text-2xl font-semibold">E se as constantes fossem outras?</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-tinta-300">
            A velocidade da onda depende só de quanto o meio &quot;responde&quot; a campos elétricos (ε) e
            magnéticos (μ). Mude os valores e veja o que acontece.
          </p>
        </Revelar>
        <div className="mt-6">
          <CarregarAoVer alturaMinima="18rem" rotulo="calculadora da velocidade da luz">
            <VelocidadeLuz />
          </CarregarAoVer>
        </div>
      </div>

      <Destaque tipo="ideia">
        A conclusão de Maxwell foi que a luz é uma onda eletromagnética. A óptica, que até então era um ramo
        separado da física, passou a ser parte do eletromagnetismo. Tudo isso saiu de um único termo, acrescentado
        para salvar a lei de Ampère.
      </Destaque>
    </Secao>
  )
}
