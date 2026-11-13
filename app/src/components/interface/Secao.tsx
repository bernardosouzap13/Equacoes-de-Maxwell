import type { ReactNode } from 'react'
import { Revelar } from './Revelar'

type SecaoProps = {
  id: string
  numero: number
  sobretitulo: string
  titulo: ReactNode
  introducao?: ReactNode
  children: ReactNode
}

export function Secao({ id, numero, sobretitulo, titulo, introducao, children }: SecaoProps) {
  const idTitulo = `${id}-titulo`
  return (
    <section id={id} aria-labelledby={idTitulo} className="border-t border-tinta-800/80 py-20 sm:py-28">
      <div className="container-pagina">
        <Revelar>
          <p className="mb-4 flex items-center gap-3 font-codigo text-xs tracking-[0.2em] text-desloc uppercase">
            <span className="text-tinta-400">{String(numero).padStart(2, '0')}</span>
            <span aria-hidden="true" className="h-px w-8 bg-tinta-600" />
            {sobretitulo}
          </p>
          <h2 id={idTitulo} className="max-w-3xl text-3xl leading-tight font-semibold sm:text-5xl">
            {titulo}
          </h2>
          {introducao && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-tinta-300">{introducao}</p>}
        </Revelar>
        <div className="mt-12 space-y-10">{children}</div>
      </div>
    </section>
  )
}
