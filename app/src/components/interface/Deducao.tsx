import type { ReactNode } from 'react'

type DeducaoProps = {
  titulo: string
  children: ReactNode
}

export function Deducao({ titulo, children }: DeducaoProps) {
  return (
    <details className="group painel overflow-hidden">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-left font-medium text-tinta-50 transition-colors hover:bg-tinta-850 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="mr-2 font-codigo text-xs text-desloc">∂</span>
          {titulo}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="size-5 shrink-0 text-tinta-400 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
        >
          <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="space-y-4 border-t border-tinta-700/70 px-5 py-6 leading-relaxed">{children}</div>
    </details>
  )
}
