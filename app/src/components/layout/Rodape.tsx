export function Rodape() {
  return (
    <footer className="border-t border-tinta-800 py-10">
      <div className="container-pagina flex flex-col gap-2 text-sm text-tinta-400 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-tinta-200">Bernardo Pinho</span> · Fundamentos de Eletromagnetismo
        </p>
        <a href="#inicio" className="inline-flex min-h-11 items-center text-tinta-300 hover:text-tinta-50">
          Voltar ao início ↑
        </a>
      </div>
    </footer>
  )
}
