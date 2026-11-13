import { Secao } from '../interface/Secao'
import { Formula } from '../interface/Formula'
import { Revelar } from '../interface/Revelar'
import { tex } from '../../funcoes/tema'

const espectro = [
  { nome: 'Rádio', faixa: '> 1 m' },
  { nome: 'Micro-ondas', faixa: '1 mm a 1 m' },
  { nome: 'Infravermelho', faixa: '700 nm a 1 mm' },
  { nome: 'Visível', faixa: '400 a 700 nm' },
  { nome: 'Ultravioleta', faixa: '10 a 400 nm' },
  { nome: 'Raios X e γ', faixa: '< 10 nm' },
]

export function Alem() {
  return (
    <Secao
      id="alem"
      numero={7}
      sobretitulo="Indo além"
      titulo="O que veio depois"
      introducao="A corrente de deslocamento não resolveu só um problema de capacitor. Ela abriu caminho para boa parte da física e da tecnologia dos últimos 150 anos."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Revelar>
          <article className="painel h-full p-6">
            <h3 className="text-xl font-semibold">Um espectro, uma equação</h3>
            <p className="mt-3 leading-relaxed text-tinta-300">
              A equação de onda não fixa o comprimento de onda. Rádio, micro-ondas, luz visível e raios X são a mesma
              solução das equações de Maxwell, só que com frequências diferentes.
            </p>
            <div
              aria-hidden="true"
              className="mt-5 h-3 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, #334155 0%, #475569 22%, #7f1d1d 40%, #ef4444 50%, #f59e0b 53%, #22c55e 56%, #3b82f6 59%, #8b5cf6 62%, #6d28d9 72%, #1e1b4b 100%)',
              }}
            />
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
              {espectro.map((s) => (
                <li key={s.nome}>
                  <span className="text-tinta-50">{s.nome}</span>
                  <span className="block font-codigo text-xs text-tinta-400">{s.faixa}</span>
                </li>
              ))}
            </ul>
          </article>
        </Revelar>

        <Revelar atraso={0.06}>
          <article className="painel h-full p-6">
            <h3 className="text-xl font-semibold">A onda carrega energia</h3>
            <p className="mt-3 leading-relaxed text-tinta-300">
              E e B oscilando juntos transportam energia na direção de propagação. O fluxo de energia por unidade de
              área e de tempo é dado pelo vetor de Poynting:
            </p>
            <Formula destaque className="my-5" tex={`\\vec{S} = \\frac{1}{\\mu_0}\\, ${tex.e('\\vec{E}')} \\times ${tex.b('\\vec{B}')}`} />
            <p className="leading-relaxed text-tinta-300">
              É essa energia que aquece a pele ao sol, que uma placa solar converte em eletricidade e que uma antena
              capta para formar o sinal do celular.
            </p>
          </article>
        </Revelar>

        <Revelar>
          <article className="painel h-full p-6">
            <h3 className="text-xl font-semibold">Uma velocidade sem referencial</h3>
            <p className="mt-3 leading-relaxed text-tinta-300">
              Das equações sai uma velocidade c, mas elas não dizem em relação a quê. No século XIX, supunha-se um
              meio invisível, o éter. Os experimentos não encontraram esse meio. Em 1905, Einstein levou as equações
              de Maxwell a sério: c é a mesma para qualquer observador. Daí nasceu a relatividade restrita.
            </p>
          </article>
        </Revelar>

        <Revelar atraso={0.06}>
          <article className="painel h-full p-6">
            <h3 className="text-xl font-semibold">E se existisse monopolo magnético?</h3>
            <p className="mt-3 leading-relaxed text-tinta-300">
              As equações ficariam perfeitamente simétricas: haveria uma &quot;carga magnética&quot; na lei de Gauss
              do magnetismo e uma &quot;corrente magnética&quot; em Faraday. Até hoje nenhum monopolo foi
              observado, mas físicos continuam procurando, porque várias teorias preveem que eles existam.
            </p>
          </article>
        </Revelar>
      </div>
    </Secao>
  )
}
