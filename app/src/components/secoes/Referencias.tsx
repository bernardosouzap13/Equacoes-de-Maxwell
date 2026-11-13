const referencias = [
  'Apostila da disciplina, Aula 42: As Equações de Maxwell.',
  'HALLIDAY, D.; RESNICK, R.; WALKER, J. Fundamentos de Física, v. 3: Eletromagnetismo. Rio de Janeiro: LTC.',
  'YOUNG, H. D.; FREEDMAN, R. A. Física III: Eletromagnetismo (Sears & Zemansky). São Paulo: Pearson.',
  'GRIFFITHS, D. J. Introduction to Electrodynamics. Cambridge University Press. Cap. 7.',
  'FEYNMAN, R. P.; LEIGHTON, R. B.; SANDS, M. The Feynman Lectures on Physics, v. II. Cap. 18.',
  'MAXWELL, J. C. A Dynamical Theory of the Electromagnetic Field. Philosophical Transactions of the Royal Society of London, v. 155, 1865.',
]

export function Referencias() {
  return (
    <section id="referencias" aria-labelledby="referencias-titulo" className="border-t border-tinta-800/80 py-16">
      <div className="container-pagina">
        <h2 id="referencias-titulo" className="text-2xl font-semibold">
          Referências
        </h2>
        <ol className="mt-6 space-y-3 text-sm leading-relaxed text-tinta-300">
          {referencias.map((r, i) => (
            <li key={r} className="flex gap-3">
              <span className="font-codigo text-tinta-400">[{i + 1}]</span>
              {r}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
