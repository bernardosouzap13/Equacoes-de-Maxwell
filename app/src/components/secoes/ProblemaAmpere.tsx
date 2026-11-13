import { lazy } from 'react'
import { Secao } from '../interface/Secao'
import { Destaque } from '../interface/Destaque'
import { CarregarAoVer } from '../interface/CarregarAoVer'
import { Revelar } from '../interface/Revelar'

const SimulacaoCapacitor = lazy(() => import('../simulacoes/SimulacaoCapacitor'))

const passos = [
  'Deixe "Plana" e "Ampère". O fio atravessa a superfície e a lei funciona.',
  'Troque para "Bojuda". A curva C é a mesma, mas agora nenhuma corrente atravessa a superfície.',
  'Compare os dois valores e depois mude para "Ampère-Maxwell".',
]

export function ProblemaAmpere() {
  return (
    <Secao
      id="o-problema"
      numero={2}
      sobretitulo="O problema"
      titulo="Um capacitor que quebra a lei de Ampère"
      introducao={
        <>
          A lei de Ampère diz que a circulação de B numa curva fechada depende da corrente que atravessa{' '}
          <em>qualquer</em> superfície limitada por essa curva. A escolha da superfície não deveria importar. Um
          simples capacitor sendo carregado mostra que, às vezes, importa.
        </>
      }
    >
      <Revelar>
        <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-start">
          <p className="leading-relaxed text-tinta-300">
            Uma corrente constante <span className="text-corrente">i</span> carrega um capacitor de placas paralelas.
            Desenhamos uma curva <em>C</em> em volta do fio, antes da primeira placa. Para aplicar a lei de Ampère,
            precisamos escolher uma superfície que tenha <em>C</em> como borda. Existem infinitas, e duas delas
            bastam para criar o problema.
          </p>
          <ol className="space-y-3">
            {passos.map((passo, i) => (
              <li key={passo} className="flex gap-3 text-sm leading-relaxed text-tinta-200">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-tinta-600 font-codigo text-xs">
                  {i + 1}
                </span>
                {passo}
              </li>
            ))}
          </ol>
        </div>
      </Revelar>

      <CarregarAoVer alturaMinima="36rem" rotulo="simulação do capacitor">
        <SimulacaoCapacitor />
      </CarregarAoVer>

      <Destaque tipo="ideia">
        Com a lei original, a mesma curva dá dois resultados diferentes: μ₀i pela superfície plana e zero pela
        bojuda. Uma lei física não pode depender de uma escolha arbitrária que nós fazemos. Entre as placas não há
        carga se movendo, mas há algo mudando: o <strong className="text-campo-e">campo elétrico</strong> cresce à
        medida que o capacitor carrega. Foi aí que Maxwell olhou.
      </Destaque>
    </Secao>
  )
}
