import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { coresCampo } from '../../funcoes/tema'

const VELOCIDADE = 140
const COMPRIMENTO = 170
const OMEGA = (2 * Math.PI * VELOCIDADE) / COMPRIMENTO
const K = (2 * Math.PI) / COMPRIMENTO
const DPR_MAXIMO = 2

type Estado = { comMaxwell: boolean; tempo: number; frente: number }

function desenhar(ctx: CanvasRenderingContext2D, largura: number, altura: number, estado: Estado) {
  ctx.clearRect(0, 0, largura, altura)
  const x0 = 36
  const y0 = altura * 0.55
  const amplitude = Math.min(altura * 0.32, 90)
  const bx = 0.55
  const by = -0.4

  ctx.strokeStyle = coresCampo.tinta600
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(largura - 12, y0)
  ctx.stroke()

  ctx.fillStyle = coresCampo.tinta50
  ctx.fillRect(x0 - 4, y0 - 26, 8, 52)

  const fim = estado.comMaxwell ? Math.min(largura - 16, x0 + estado.frente) : largura - 16
  const campoEm = (x: number) => {
    if (estado.comMaxwell) return Math.sin(K * (x - x0) - OMEGA * estado.tempo)
    const d = (x - x0) / 34
    return Math.sin(-OMEGA * estado.tempo) * Math.exp(-d * d)
  }

  for (const [cor, dx, dy, escala] of [
    [coresCampo.b, bx, by, 0.75],
    [coresCampo.e, 0, -1, 1],
  ] as const) {
    ctx.strokeStyle = cor
    ctx.globalAlpha = 0.35
    ctx.lineWidth = 1.2
    ctx.beginPath()
    for (let x = x0; x <= fim; x += 9) {
      const v = campoEm(x) * amplitude * escala
      ctx.moveTo(x, y0)
      ctx.lineTo(x + v * dx, y0 + v * dy)
    }
    ctx.stroke()
    ctx.globalAlpha = 1
    ctx.lineWidth = 2.2
    ctx.beginPath()
    for (let x = x0; x <= fim; x += 3) {
      const v = campoEm(x) * amplitude * escala
      if (x === x0) ctx.moveTo(x + v * dx, y0 + v * dy)
      else ctx.lineTo(x + v * dx, y0 + v * dy)
    }
    ctx.stroke()
  }

  ctx.font = '600 15px "Inter Variable", system-ui, sans-serif'
  ctx.fillStyle = coresCampo.e
  ctx.fillText('E', x0 + 14, y0 - amplitude - 8)
  ctx.fillStyle = coresCampo.b
  ctx.fillText('B', x0 + 14 + amplitude * 0.75 * bx + 10, y0 + amplitude * 0.75 * -by + 8)
  if (estado.comMaxwell && fim > x0 + 60) {
    ctx.fillStyle = coresCampo.tinta400
    ctx.fillText('c →', Math.min(fim - 30, largura - 50), y0 + amplitude + 28)
  }
}

type CanvasOndaProps = { comMaxwell: boolean }

export function CanvasOnda({ comMaxwell }: CanvasOndaProps) {
  const movimentoReduzido = useReducedMotion()
  const [tocando, setTocando] = useState(!movimentoReduzido)
  const caixaRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const estadoRef = useRef<Estado>({ comMaxwell, tempo: 0, frente: movimentoReduzido ? 10_000 : 0 })
  const tamanhoRef = useRef({ largura: 0, altura: 0 })
  const tocandoRef = useRef(tocando)

  useEffect(() => {
    tocandoRef.current = tocando
  }, [tocando])

  useEffect(() => {
    estadoRef.current.comMaxwell = comMaxwell
    estadoRef.current.frente = tocandoRef.current ? 0 : 10_000
  }, [comMaxwell])

  useEffect(() => {
    const canvas = canvasRef.current
    const caixa = caixaRef.current
    if (!canvas || !caixa) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const redesenhar = () =>
      desenhar(ctx, tamanhoRef.current.largura, tamanhoRef.current.altura, estadoRef.current)

    const redimensionar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_MAXIMO)
      const { width, height } = caixa.getBoundingClientRect()
      tamanhoRef.current = { largura: width, altura: height }
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      redesenhar()
    }
    const observadorTamanho = new ResizeObserver(redimensionar)
    observadorTamanho.observe(caixa)
    redimensionar()

    let quadro = 0
    let anterior = 0
    let naTela = true

    const passo = (agora: number) => {
      const dt = anterior ? Math.min((agora - anterior) / 1000, 0.05) : 0
      anterior = agora
      estadoRef.current.tempo += dt
      estadoRef.current.frente += VELOCIDADE * dt
      redesenhar()
      quadro = requestAnimationFrame(passo)
    }
    const iniciar = () => {
      if (quadro || !tocando || !naTela || document.hidden) return
      anterior = 0
      quadro = requestAnimationFrame(passo)
    }
    const parar = () => {
      cancelAnimationFrame(quadro)
      quadro = 0
    }

    const observadorTela = new IntersectionObserver(([entrada]) => {
      naTela = entrada.isIntersecting
      if (naTela) iniciar()
      else parar()
    })
    observadorTela.observe(caixa)
    const aoMudarVisibilidade = () => (document.hidden ? parar() : iniciar())
    document.addEventListener('visibilitychange', aoMudarVisibilidade)

    if (tocando) iniciar()
    else redesenhar()

    return () => {
      parar()
      observadorTamanho.disconnect()
      observadorTela.disconnect()
      document.removeEventListener('visibilitychange', aoMudarVisibilidade)
    }
  }, [tocando, comMaxwell])

  return (
    <div className="relative">
      <div ref={caixaRef} className="aspect-[16/9] w-full sm:aspect-[21/9]">
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          role="img"
          aria-label={
            comMaxwell
              ? 'Onda eletromagnética: os campos E e B, perpendiculares entre si, se propagam para a direita a partir da antena.'
              : 'Sem a corrente de deslocamento: os campos oscilam apenas perto da antena e não se propagam.'
          }
        />
      </div>
      <button
        type="button"
        onClick={() => setTocando((t) => !t)}
        className="absolute top-3 right-3 flex min-h-11 items-center gap-2 rounded-lg border border-tinta-700 bg-tinta-950/80 px-3 text-sm text-tinta-200 hover:text-tinta-50"
      >
        {tocando ? 'Pausar' : 'Animar'}
      </button>
    </div>
  )
}
