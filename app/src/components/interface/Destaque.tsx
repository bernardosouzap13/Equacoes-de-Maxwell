import type { ReactNode } from 'react'

const variantes = {
  pergunta: { borda: 'border-l-campo-b', rotulo: 'Pergunta', corRotulo: 'text-campo-b' },
  ideia: { borda: 'border-l-desloc', rotulo: 'A ideia-chave', corRotulo: 'text-desloc' },
  nota: { borda: 'border-l-campo-e', rotulo: 'Atenção', corRotulo: 'text-campo-e' },
} as const

type DestaqueProps = {
  tipo: keyof typeof variantes
  titulo?: string
  children: ReactNode
}

export function Destaque({ tipo, titulo, children }: DestaqueProps) {
  const v = variantes[tipo]
  return (
    <aside className={`rounded-r-xl border-l-4 bg-tinta-900/70 px-5 py-4 ${v.borda}`}>
      <p className={`mb-1 font-codigo text-xs tracking-widest uppercase ${v.corRotulo}`}>{titulo ?? v.rotulo}</p>
      <div className="leading-relaxed text-tinta-200">{children}</div>
    </aside>
  )
}
