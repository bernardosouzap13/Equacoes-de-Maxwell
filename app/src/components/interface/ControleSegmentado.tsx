import { useRef, type KeyboardEvent } from 'react'

export type OpcaoSegmentada<T extends string> = {
  valor: T
  rotulo: string
}

type ControleSegmentadoProps<T extends string> = {
  rotulo: string
  opcoes: OpcaoSegmentada<T>[]
  valor: T
  aoMudar: (valor: T) => void
  className?: string
}

export function ControleSegmentado<T extends string>({
  rotulo,
  opcoes,
  valor,
  aoMudar,
  className = '',
}: ControleSegmentadoProps<T>) {
  const botoes = useRef<(HTMLButtonElement | null)[]>([])
  const indice = Math.max(
    0,
    opcoes.findIndex((o) => o.valor === valor),
  )

  function aoTeclar(evento: KeyboardEvent<HTMLDivElement>) {
    const passo = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[evento.key]
    if (!passo) return
    evento.preventDefault()
    const proximo = (indice + passo + opcoes.length) % opcoes.length
    aoMudar(opcoes[proximo].valor)
    botoes.current[proximo]?.focus()
  }

  return (
    <div className={className}>
      <span className="mb-2 block text-xs font-medium tracking-wide text-tinta-400 uppercase">{rotulo}</span>
      <div
        role="radiogroup"
        aria-label={rotulo}
        onKeyDown={aoTeclar}
        className="relative grid rounded-xl border border-tinta-700 bg-tinta-950 p-1"
        style={{ gridTemplateColumns: `repeat(${opcoes.length}, minmax(0, 1fr))` }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-1 rounded-lg bg-primaria transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{
            width: `calc((100% - 0.5rem) / ${opcoes.length})`,
            transform: `translateX(${indice * 100}%)`,
          }}
        />
        {opcoes.map((opcao, i) => {
          const selecionado = i === indice
          return (
            <button
              key={opcao.valor}
              ref={(el) => {
                botoes.current[i] = el
              }}
              type="button"
              role="radio"
              aria-checked={selecionado}
              tabIndex={selecionado ? 0 : -1}
              onClick={() => aoMudar(opcao.valor)}
              className={`relative z-10 min-h-11 rounded-lg px-3 text-sm font-medium transition-colors ${
                selecionado ? 'text-tinta-50' : 'text-tinta-400 hover:text-tinta-200'
              }`}
            >
              {opcao.rotulo}
            </button>
          )
        })}
      </div>
    </div>
  )
}
