import { StatusBadge } from '@dips/ui'

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-16">
        <h1 className="text-4xl font-bold text-blue-900">DIPS</h1>
        <p className="mt-2 text-lg text-gray-600">
          Helseteknologi for norske sykehus
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Våre løsninger
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="mb-2 text-lg font-semibold">DIPS Arena</h3>
            <p className="mb-4 text-sm text-gray-600">
              Komplett journalsystem for sykehus. Støtter alle kliniske
              arbeidsflyter fra innleggelse til utskrivning.
            </p>
            <div className="flex gap-2">
              <StatusBadge status="aktiv" />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="mb-2 text-lg font-semibold">DIPS Mobilitet</h3>
            <p className="mb-4 text-sm text-gray-600">
              Journaltilgang på mobil og nettbrett for klinisk personell på
              farten.
            </p>
            <div className="flex gap-2">
              <StatusBadge status="utkast" />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="mb-2 text-lg font-semibold">DIPS Integrasjon</h3>
            <p className="mb-4 text-sm text-gray-600">
              API-plattform for integrasjon mot laboratoriesystemer, RIS/PACS og
              andre fagsystemer.
            </p>
            <div className="flex gap-2">
              <StatusBadge status="avsluttet" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <p className="text-sm text-gray-400">
          Dette er en demopside brukt i DIPS React-workshop. Se{' '}
          <code className="rounded bg-gray-100 px-1">packages/ui</code> for
          delte komponenter.
        </p>
      </section>
    </main>
  )
}
