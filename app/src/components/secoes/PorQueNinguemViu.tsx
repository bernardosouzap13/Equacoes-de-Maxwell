import { lazy } from 'react'
import { Secao } from '../interface/Secao'
import { Formula } from '../interface/Formula'
import { CarregarAoVer } from '../interface/CarregarAoVer'
import { Revelar } from '../interface/Revelar'
import { Destaque } from '../interface/Destaque'
import { MU_0, EPSILON_0 } from '../../funcoes/fisica'
import { formatarCientifico } from '../../funcoes/formatacao'

const EstimativaFrequencia = lazy(() => import('../simulacoes/EstimativaFrequencia'))

const motivos = [
  {
    titulo: 'Um fator minúsculo',
    texto: `O termo novo vem multiplicado por μ₀ε₀ ≈ ${formatarCientifico(MU_0 * EPSILON_0, 3)} s²/m². Para que ele produza um campo perceptível, o campo elétrico precisa variar muito rápido.`,
  },
  {
    titulo: 'Escondido atrás do fio',
    texto: 'Num circuito com capacitor, o campo criado pela corrente de deslocamento é igual ao que a corrente no fio já criaria. Não aparece nenhuma "anomalia" para chamar a atenção.',
  },
  {
    titulo: 'Instrumentos lentos',
    texto: 'No século XIX, os circuitos de laboratório variavam devagar. Faraday conseguia mover ímãs e usar bobinas com muitas voltas. O efeito simétrico exigia oscilações de milhões de vezes por segundo.',
  },
]

export function PorQueNinguemViu() {
  return (
    <Secao
      id="por-que-ninguem-viu"
      numero={4}
      sobretitulo="Ordem de grandeza"
      titulo="Se o efeito existe, por que ninguém tinha visto?"
      introducao="Maxwell chegou à corrente de deslocamento por consistência matemática, não por um experimento. A pergunta natural é por que algo tão fundamental passou despercebido."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {motivos.map((m, i) => (
          <Revelar key={m.titulo} atraso={i * 0.06}>
            <article className="painel h-full p-5">
              <h3 className="text-lg font-semibold">{m.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tinta-300">{m.texto}</p>
            </article>
          </Revelar>
        ))}
      </div>

      <Revelar>
        <div className="flex flex-col items-center gap-2 text-center">
          <Formula destaque tex="\mu_0 \varepsilon_0 = \frac{1}{c^2}" className="text-xl" />
          <p className="max-w-xl text-sm text-tinta-400">
            Esse número pequeno não é coincidência: ele é o inverso do quadrado da velocidade da luz. Isso vai fazer
            sentido em duas seções.
          </p>
        </div>
      </Revelar>

      <CarregarAoVer alturaMinima="28rem" rotulo="estimativa interativa">
        <EstimativaFrequencia />
      </CarregarAoVer>

      <Destaque tipo="ideia">
        Na frequência da rede elétrica, o campo induzido fica cerca de cinco milhões de vezes abaixo do campo da Terra.
        Só em centenas de megahertz o efeito fica comparável, e foi nessa faixa que Heinrich Hertz trabalhou entre
        1886 e 1888, quando produziu e detectou as primeiras ondas eletromagnéticas em laboratório.
      </Destaque>
    </Secao>
  )
}
