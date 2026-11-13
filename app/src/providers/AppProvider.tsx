import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'

type AppProviderProps = {
  children: ReactNode
}

/**
 * Regras e lógica globais da aplicação.
 * - Motion: usa LazyMotion (bundle menor) e respeita a preferência
 *   de movimento reduzido do sistema operacional.
 * - Rolagem: ao trocar de rota volta ao topo; se a URL tiver âncora (#secao),
 *   rola até a seção correspondente.
 */
export function AppProvider({ children }: AppProviderProps) {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
