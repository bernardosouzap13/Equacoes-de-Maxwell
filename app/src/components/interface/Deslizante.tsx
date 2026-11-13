import { useId } from 'react'

type DeslizanteProps = {
  rotulo: string
  valor: number
  min: number
  max: number
  passo: number
  aoMudar: (valor: number) => void
  textoValor: string
  cor?: string
}

export function Deslizante({ rotulo, valor, min, max, passo, aoMudar, textoValor, cor }: DeslizanteProps) {
  const id = useId()
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-tinta-300">
          {rotulo}
        </label>
        <output htmlFor={id} className="font-codigo text-sm text-tinta-50 tabular-nums">
          {textoValor}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        aria-valuetext={textoValor}
        onChange={(e) => aoMudar(Number(e.target.value))}
        className="h-11 w-full cursor-pointer"
        style={{ accentColor: cor ?? 'var(--color-campo-b)' }}
      />
    </div>
  )
}
