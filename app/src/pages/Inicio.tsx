import { Cabecalho } from '../components/layout/Cabecalho'
import { Rodape } from '../components/layout/Rodape'
import { Abertura } from '../components/secoes/Abertura'
import { LeisConhecidas } from '../components/secoes/LeisConhecidas'
import { ProblemaAmpere } from '../components/secoes/ProblemaAmpere'
import { CorrecaoMaxwell } from '../components/secoes/CorrecaoMaxwell'
import { PorQueNinguemViu } from '../components/secoes/PorQueNinguemViu'
import { QuatroEquacoes } from '../components/secoes/QuatroEquacoes'
import { Luz } from '../components/secoes/Luz'
import { Alem } from '../components/secoes/Alem'
import { Questionario } from '../components/secoes/Questionario'
import { Referencias } from '../components/secoes/Referencias'

export function Inicio() {
  return (
    <>
      <Cabecalho />
      <main id="conteudo">
        <Abertura />
        <LeisConhecidas />
        <ProblemaAmpere />
        <CorrecaoMaxwell />
        <PorQueNinguemViu />
        <QuatroEquacoes />
        <Luz />
        <Alem />
        <Questionario />
        <Referencias />
      </main>
      <Rodape />
    </>
  )
}
