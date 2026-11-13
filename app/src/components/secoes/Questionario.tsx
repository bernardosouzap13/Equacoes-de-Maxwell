import { useState } from 'react'
import { Secao } from '../interface/Secao'
import { perguntas } from '../../dados/questionario'

export function Questionario() {
  const [respostas, setRespostas] = useState<(number | null)[]>(() => perguntas.map(() => null))
  const respondidas = respostas.filter((r) => r !== null).length
  const acertos = respostas.filter((r, i) => r === perguntas[i].resposta).length

  const escolher = (pergunta: number, opcao: number) =>
    setRespostas((anteriores) => anteriores.map((r, i) => (i === pergunta && r === null ? opcao : r)))

  return (
    <Secao
      id="teste-se"
      numero={8}
      sobretitulo="Teste-se"
      titulo="Você entendeu o termo que faltava?"
      introducao="Seis perguntas conceituais. Cada resposta vem com a explicação, então errar também ensina."
    >
      <div className="sticky top-20 z-10 flex items-center justify-between gap-4 rounded-xl border border-tinta-700 bg-tinta-900/95 px-4 py-3 backdrop-blur">
        <p className="text-sm text-tinta-300" aria-live="polite">
          {respondidas} de {perguntas.length} respondidas · <span className="text-certo">{acertos} corretas</span>
        </p>
        {respondidas > 0 && (
          <button
            type="button"
            onClick={() => setRespostas(perguntas.map(() => null))}
            className="min-h-11 rounded-lg px-3 text-sm text-tinta-300 hover:text-tinta-50"
          >
            Recomeçar
          </button>
        )}
      </div>

      <ol className="space-y-6">
        {perguntas.map((p, ip) => {
          const escolhida = respostas[ip]
          const respondida = escolhida !== null
          return (
            <li key={p.pergunta} className="painel p-5 sm:p-6">
              <fieldset>
                <legend className="font-titulo text-lg font-semibold text-tinta-50">
                  <span className="mr-2 font-codigo text-sm text-tinta-400">{ip + 1}.</span>
                  {p.pergunta}
                </legend>
                <div className="mt-4 grid gap-2">
                  {p.opcoes.map((opcao, io) => {
                    const ehResposta = io === p.resposta
                    const ehEscolhida = io === escolhida
                    let estilo = 'border-tinta-700 hover:border-tinta-400 hover:bg-tinta-850'
                    if (respondida && ehResposta) estilo = 'border-certo/70 bg-certo/10 text-tinta-50'
                    else if (respondida && ehEscolhida) estilo = 'border-errado/70 bg-errado/10'
                    else if (respondida) estilo = 'border-tinta-800 opacity-60'
                    return (
                      <button
                        key={opcao}
                        type="button"
                        disabled={respondida}
                        aria-pressed={ehEscolhida}
                        onClick={() => escolher(ip, io)}
                        className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-2 text-left text-sm leading-snug transition-colors sm:text-base ${estilo}`}
                      >
                        <span className="font-codigo text-xs text-tinta-400">{String.fromCharCode(65 + io)}</span>
                        <span className="flex-1">{opcao}</span>
                        {respondida && ehResposta && <span className="text-certo">✓ correta</span>}
                        {respondida && ehEscolhida && !ehResposta && <span className="text-errado">✗</span>}
                      </button>
                    )
                  })}
                </div>
                {respondida && (
                  <p className="mt-4 rounded-xl border border-tinta-700 bg-tinta-950 p-4 text-sm leading-relaxed text-tinta-200" aria-live="polite">
                    <strong className={escolhida === p.resposta ? 'text-certo' : 'text-errado'}>
                      {escolhida === p.resposta ? 'Isso mesmo. ' : 'Não exatamente. '}
                    </strong>
                    {p.explicacao}
                  </p>
                )}
              </fieldset>
            </li>
          )
        })}
      </ol>

      {respondidas === perguntas.length && (
        <p className="painel p-6 text-center text-lg text-tinta-50" aria-live="polite">
          Você acertou <strong className="text-certo">{acertos}</strong> de {perguntas.length}.{' '}
          {acertos === perguntas.length ? 'Maxwell ficaria orgulhoso.' : 'Vale reler as seções das perguntas que errou.'}
        </p>
      )}
    </Secao>
  )
}
