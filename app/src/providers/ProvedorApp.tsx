import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'

type ProvedorAppProps = {
  children: ReactNode
}

export function ProvedorApp({ children }: ProvedorAppProps) {
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
