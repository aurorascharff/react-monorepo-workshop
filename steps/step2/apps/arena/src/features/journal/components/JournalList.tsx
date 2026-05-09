/* eslint-disable react-hooks/set-state-in-effect --
 * Module 4 replaces this manual fetching with TanStack Query.
 */
import { useEffect, useState } from 'react'
import { Spinner } from '@medix/ui'
import { fetchJournals, updateJournalStatus } from '../../../lib/api'
import { JournalEntry } from './JournalEntry'
import type { Journal } from '../../../types'
import type { JournalStatus } from '@medix/ui'

type JournalListProps = {
  patientId: string
}

export function JournalList({ patientId }: JournalListProps) {
  const [journals, setJournals] = useState<Journal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchJournals(patientId)
      .then((data) => setJournals(data))
      .finally(() => setIsLoading(false))
  }, [patientId])

  function handleStatusChange(journalId: string, status: JournalStatus) {
    updateJournalStatus(journalId, status).then(() =>
      fetchJournals(patientId).then(setJournals),
    )
  }

  if (isLoading) return <Spinner />

  if (journals.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No journal entries yet
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {journals.map((entry) => (
        <JournalEntry
          key={entry.id}
          entry={entry}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  )
}
