import { useState } from 'react'
import { ControleSegmentado } from '../interface/ControleSegmentado'
import { CanvasOnda } from './CanvasOnda'

type Modo = 'com' | 'sem'

export default function LaboratorioOnda() {
  const [modo, setModo] = useState<Modo>('com')
  const comMaxwell = modo === 'com'

  return (
    <div className="painel overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-tinta-700/70 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <ControleSegmentado<Modo>
          rotulo="Corrente de deslocamento"
          valor={modo}
          aoMudar={setModo}
          className="w-full sm:w-80"
          opcoes={[
            { valor: 'com', rotulo: 'Com o termo' },
            { valor: 'sem', rotulo: 'Sem o termo' },
          ]}
        />
        <p className="max-w-md text-sm leading-relaxed text-tinta-300" aria-live="polite">
          {comMaxwell
            ? 'E variável gera B, B variável gera E, e o ciclo se repete adiante: a perturbação viaja.'
            : 'B variável ainda gera E (Faraday), mas E variável não gera B de volta. O ciclo se quebra e nada se propaga.'}
        </p>
      </div>
      <div className="p-2 sm:p-4">
        <CanvasOnda comMaxwell={comMaxwell} />
      </div>
      <p className="border-t border-tinta-700/70 px-4 py-3 text-xs text-tinta-400 sm:px-6">
        Representação conceitual: E (laranja) no plano vertical, B (azul) perpendicular a ele, e a propagação para a
        direita.
      </p>
    </div>
  )
}
