import { useEffect, useState } from 'react'

type Katex = typeof import('katex').default

let katex: Katex | null = null
const katexPronto: Promise<Katex> = Promise.all([
  import('katex'),
  import('katex/dist/katex.min.css'),
]).then(([modulo]) => {
  katex = modulo.default
  return katex
})

const memoria = new Map<string, string>()

function renderizar(motor: Katex, codigo: string, destaque: boolean): string {
  const chave = `${destaque ? 'D' : 'I'}:${codigo}`
  let html = memoria.get(chave)
  if (!html) {
    html = motor.renderToString(codigo, {
      displayMode: destaque,
      throwOnError: false,
      output: 'htmlAndMathml',
    })
    memoria.set(chave, html)
  }
  return html
}

type FormulaProps = {
  tex: string
  destaque?: boolean
  className?: string
}

export function Formula({ tex, destaque = false, className = '' }: FormulaProps) {
  const [html, setHtml] = useState(() => (katex ? renderizar(katex, tex, destaque) : null))

  useEffect(() => {
    let ativo = true
    katexPronto.then((motor) => {
      if (ativo) setHtml(renderizar(motor, tex, destaque))
    })
    return () => {
      ativo = false
    }
  }, [tex, destaque])

  if (destaque) {
    return (
      <div
        className={`bloco-formula min-h-[3rem] text-center text-tinta-50 ${className}`}
        aria-busy={html === null}
        dangerouslySetInnerHTML={html ? { __html: html } : undefined}
      />
    )
  }

  return (
    <span
      className={`inline-block min-h-[1.2em] align-middle text-tinta-50 ${className}`}
      aria-busy={html === null}
      dangerouslySetInnerHTML={html ? { __html: html } : undefined}
    />
  )
}
