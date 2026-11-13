import { useEffect, useState } from 'react'
import { AnimatePresence, m, useScroll, useSpring } from 'motion/react'
import { secoes } from '../../dados/secoes'

function useSecaoAtiva(ids: string[]) {
  const [ativa, setAtiva] = useState<string | null>(null)

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) setAtiva(entrada.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of ids) {
      const elemento = document.getElementById(id)
      if (elemento) observador.observe(elemento)
    }
    return () => observador.disconnect()
  }, [ids])

  return ativa
}

const idsSecoes = secoes.map((s) => s.id)

export function Cabecalho() {
  const ativa = useSecaoAtiva(idsSecoes)
  const [menuAberto, setMenuAberto] = useState(false)
  const { scrollYProgress } = useScroll()
  const progresso = useSpring(scrollYProgress, { stiffness: 250, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    if (!menuAberto) return
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setMenuAberto(false)
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [menuAberto])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-tinta-800/80 bg-tinta-950/85 backdrop-blur-md">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-lg focus:bg-tinta-800 focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>

      <div className="container-pagina flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="flex min-h-11 items-center font-titulo font-semibold text-tinta-50">
          Equações de Maxwell
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {secoes.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={ativa === s.id ? 'location' : undefined}
                  className={`rounded-lg px-2.5 py-2 text-sm transition-colors ${
                    ativa === s.id ? 'bg-primaria-clara text-tinta-50' : 'text-tinta-400 hover:text-tinta-50'
                  }`}
                >
                  {s.curto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="flex min-h-11 items-center gap-2 rounded-lg border border-tinta-700 px-3 text-sm text-tinta-200 lg:hidden"
          aria-expanded={menuAberto}
          aria-controls="menu-indice"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          Índice
          <svg aria-hidden="true" viewBox="0 0 20 20" className={`size-4 transition-transform ${menuAberto ? 'rotate-180' : ''}`}>
            <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <m.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primaria"
        style={{ scaleX: progresso }}
      />

      <AnimatePresence>
        {menuAberto && (
          <m.nav
            id="menu-indice"
            aria-label="Índice"
            className="border-t border-tinta-800 bg-tinta-950 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ol className="container-pagina grid gap-1 py-3 sm:grid-cols-2">
              {secoes.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setMenuAberto(false)}
                    aria-current={ativa === s.id ? 'location' : undefined}
                    className={`flex min-h-11 items-center gap-3 rounded-lg px-3 ${
                      ativa === s.id ? 'bg-primaria-clara text-tinta-50' : 'text-tinta-300'
                    }`}
                  >
                    <span className="font-codigo text-xs text-tinta-400">{String(i + 1).padStart(2, '0')}</span>
                    {s.rotulo}
                  </a>
                </li>
              ))}
            </ol>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
