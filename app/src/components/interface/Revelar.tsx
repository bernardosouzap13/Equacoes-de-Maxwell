import type { ReactNode } from 'react'
import { m } from 'motion/react'

type RevelarProps = {
  children: ReactNode
  atraso?: number
  className?: string
}

export function Revelar({ children, atraso = 0, className }: RevelarProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.5, delay: atraso, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}
