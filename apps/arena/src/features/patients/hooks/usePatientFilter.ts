import { useState } from 'react'
import type { Pasient } from '../../types'

export function usePatientFilter(pasienter: Pasient[]) {
  const [sok, setSok] = useState('')
  const [kjonnFilter, setKjonnFilter] = useState<
    'alle' | 'mann' | 'kvinne'
  >('alle')

  const filtrertePasienter = pasienter.filter((p) => {
    const matcherSok =
      p.navn.toLowerCase().includes(sok.toLowerCase()) ||
      p.diagnose.toLowerCase().includes(sok.toLowerCase())
    const matcherKjonn = kjonnFilter === 'alle' || p.kjonn === kjonnFilter
    return matcherSok && matcherKjonn
  })

  return { sok, setSok, kjonnFilter, setKjonnFilter, filtrertePasienter }
}
