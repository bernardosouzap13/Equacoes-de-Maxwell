import { Secao } from '../interface/Secao'
import { Formula } from '../interface/Formula'
import { Revelar } from '../interface/Revelar'
import { Destaque } from '../interface/Destaque'
import { tex } from '../../funcoes/tema'

const leis = [
  {
    nome: 'Lei de Gauss',
    quem: 'Gauss',
    formula: `\\oint_S ${tex.e('\\vec{E}')} \\cdot d\\vec{A} = \\dfrac{Q_{\\text{int}}}{\\varepsilon_0}`,
    ideia: 'Cargas elétricas são fontes de campo elétrico. O fluxo de E que sai de uma superfície fechada conta a carga que está dentro dela.',
    fonte: 'E nasce de cargas',
  },
  {
    nome: 'Gauss para o magnetismo',
    quem: '',
    formula: `\\oint_S ${tex.b('\\vec{B}')} \\cdot d\\vec{A} = 0`,
    ideia: 'Não existem "cargas magnéticas" isoladas: todo ímã tem norte e sul. As linhas de B são fechadas, então tudo que entra numa superfície fechada também sai.',
    fonte: 'B não tem fonte pontual',
  },
  {
    nome: 'Lei de Faraday',
    quem: 'Faraday, 1831',
    formula: `\\oint_C ${tex.e('\\vec{E}')} \\cdot d\\vec{l} = -\\dfrac{d${tex.b('\\Phi_B')}}{dt}`,
    ideia: 'Um fluxo magnético que muda no tempo cria um campo elétrico que "circula". O sinal de menos (Lenz) diz que esse campo se opõe à variação.',
    fonte: 'E também nasce de B variável',
  },
  {
    nome: 'Lei de Ampère',
    quem: 'Ampère, 1826',
    formula: `\\oint_C ${tex.b('\\vec{B}')} \\cdot d\\vec{l} = \\mu_0\\, ${tex.corrente('i')}`,
    ideia: 'Correntes elétricas criam campo magnético ao seu redor. A circulação de B numa curva fechada mede a corrente que atravessa qualquer superfície limitada por ela.',
    fonte: 'B nasce de correntes',
  },
]

export function LeisConhecidas() {
  return (
    <Secao
      id="o-que-se-sabia"
      numero={1}
      sobretitulo="O ponto de partida"
      titulo="Quatro leis descobertas em laboratório"
      introducao="Antes de Maxwell, o eletromagnetismo era um conjunto de leis experimentais, cada uma descoberta separadamente. Juntas, elas dizem de onde vêm os campos elétrico e magnético."
    >
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-tinta-400">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-campo-e" aria-hidden="true" /> campo elétrico E
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-campo-b" aria-hidden="true" /> campo magnético B
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-corrente" aria-hidden="true" /> corrente i
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {leis.map((lei, i) => (
          <Revelar key={lei.nome} atraso={i * 0.06}>
            <article className="painel flex h-full flex-col p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold">{lei.nome}</h3>
                {lei.quem && <span className="font-codigo text-xs text-tinta-400">{lei.quem}</span>}
              </div>
              <Formula tex={lei.formula} destaque className="my-6" />
              <p className="flex-1 leading-relaxed text-tinta-300">{lei.ideia}</p>
              <p className="mt-4 inline-flex self-start rounded-full border border-tinta-700 px-3 py-1 text-xs text-tinta-200">
                {lei.fonte}
              </p>
            </article>
          </Revelar>
        ))}
      </div>

      <Revelar>
        <div className="painel overflow-hidden">
          <table className="w-full text-left text-sm sm:text-base">
            <caption className="px-5 pt-5 text-left font-titulo text-lg font-semibold text-tinta-50">
              De onde vêm os campos?
            </caption>
            <thead>
              <tr className="text-tinta-400">
                <th scope="col" className="px-5 py-3 font-medium">Campo</th>
                <th scope="col" className="px-5 py-3 font-medium">Fonte 1</th>
                <th scope="col" className="px-5 py-3 font-medium">Fonte 2</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-tinta-700/70">
                <th scope="row" className="px-5 py-4 font-semibold text-campo-e">Elétrico</th>
                <td className="px-5 py-4">cargas</td>
                <td className="px-5 py-4">B variando no tempo</td>
              </tr>
              <tr className="border-t border-tinta-700/70">
                <th scope="row" className="px-5 py-4 font-semibold text-campo-b">Magnético</th>
                <td className="px-5 py-4">correntes</td>
                <td className="px-5 py-4 font-codigo text-desloc">???</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Revelar>

      <Destaque tipo="pergunta">
        Faraday mostrou que um campo <strong className="text-campo-b">magnético</strong> variável gera campo{' '}
        <strong className="text-campo-e">elétrico</strong>. Será que o contrário também acontece? Se acontecesse, a
        lei de Ampère deveria ter um termo para isso, e ela não tem. Isso seria só uma assimetria estética, ou
        um erro de verdade?
      </Destaque>
    </Secao>
  )
}
