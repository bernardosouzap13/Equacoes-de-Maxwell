import { Link } from 'react-router'

export function NaoEncontrada() {
  return (
    <main className="container-pagina flex min-h-dvh flex-col items-start justify-center gap-6">
      <h1 className="text-4xl font-semibold">Página não encontrada</h1>
      <Link
        to="/"
        className="inline-flex min-h-12 items-center rounded-xl bg-primaria px-6 font-semibold text-tinta-50"
      >
        Voltar ao início
      </Link>
    </main>
  )
}
