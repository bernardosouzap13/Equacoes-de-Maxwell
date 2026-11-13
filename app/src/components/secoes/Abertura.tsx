const objetivos = [
  { cor: 'bg-campo-e', texto: 'Campos elétricos que variam no tempo também geram campos magnéticos.' },
  { cor: 'bg-desloc', texto: 'Por que a lei de Ampère precisou ganhar um termo novo: a corrente de deslocamento.' },
  { cor: 'bg-campo-b', texto: 'Como quatro equações resumem todo o eletromagnetismo e explicam a luz.' },
]

function OndasAbertura() {
  const caminho = (amplitude: number, fase: number) => {
    let d = ''
    for (let x = 0; x <= 2400; x += 10) {
      const y = 100 + amplitude * Math.sin((x / 1200) * 4 * Math.PI + fase)
      d += `${x === 0 ? 'M' : 'L'}${x},${y.toFixed(1)}`
    }
    return d
  }
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/4 overflow-hidden opacity-60">
      <svg viewBox="0 0 2400 200" preserveAspectRatio="none" className="h-56 w-[200%] animate-[onda-abertura_14s_linear_infinite] sm:h-72">
        <path d={caminho(70, 0)} fill="none" stroke="var(--color-campo-e)" strokeWidth="1.5" strokeOpacity="0.55" />
        <path d={caminho(45, 0)} fill="none" stroke="var(--color-campo-b)" strokeWidth="1.5" strokeOpacity="0.45" />
      </svg>
    </div>
  )
}

export function Abertura() {
  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-primaria), transparent 65%)' }}
      />
      <OndasAbertura />

      <div className="container-pagina relative">
        <p className="mb-6 font-codigo text-xs tracking-[0.25em] text-desloc uppercase">Equações de Maxwell</p>
        <h1
          id="inicio-titulo"
          className="max-w-4xl text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] font-bold tracking-tight"
        >
          O termo que{' '}<span className="bg-[linear-gradient(transparent_58%,var(--color-primaria)_58%,var(--color-primaria)_92%,transparent_92%)] px-1">faltava</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-tinta-300 sm:text-xl">
          Em 1862, James Clerk Maxwell percebeu que uma das leis do eletromagnetismo estava incompleta. Ao
          consertá-la com um único termo, ele descobriu que eletricidade, magnetismo e luz são a mesma coisa.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#o-que-se-sabia"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primaria px-6 font-semibold text-tinta-50 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
          >
            Começar pela história
          </a>
          <a
            href="#as-quatro-equacoes"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-tinta-600 bg-tinta-950/80 px-6 font-medium text-tinta-50 backdrop-blur-sm transition-colors hover:bg-tinta-800"
          >
            Ir direto às 4 equações
          </a>
        </div>

        <div className="mt-20 max-w-3xl">
          <h2 className="mb-5 text-sm font-medium tracking-wide text-tinta-400 uppercase">O que você vai entender</h2>
          <ol className="grid gap-3 sm:grid-cols-3">
            {objetivos.map((o, i) => (
              <li key={o.texto} className="painel p-4 text-sm leading-relaxed text-tinta-200 backdrop-blur-sm">
                <span className="mb-3 flex items-center gap-2 font-codigo text-xs text-tinta-400">
                  <span className={`size-2 rounded-full ${o.cor}`} aria-hidden="true" />
                  {String(i + 1).padStart(2, '0')}
                </span>
                {o.texto}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
