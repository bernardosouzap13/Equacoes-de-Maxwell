import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'

type CarregarAoVerProps = {
  children: ReactNode
  alturaMinima: string
  rotulo: string
}

export function CarregarAoVer({ children, alturaMinima, rotulo }: CarregarAoVerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true)
          observador.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    observador.observe(elemento)
    return () => observador.disconnect()
  }, [])

  const espera = (
    <div
      role="status"
      className="painel flex h-full items-center justify-center text-sm text-tinta-400"
      style={{ minHeight: alturaMinima }}
    >
      Carregando {rotulo}…
    </div>
  )

  return (
    <div ref={ref} style={{ minHeight: alturaMinima }}>
      {visivel ? <Suspense fallback={espera}>{children}</Suspense> : espera}
    </div>
  )
}
