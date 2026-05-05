import { Card, CardContent, CardHeader, CardTitle } from '@klinikk/ui'

export default function OmOssPage() {
  return (
    <div className="py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Om oss</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
        Klinikk leverer journalsystem og helseplattform til sykehus over hele
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Grunnlagt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1987</p>
            <p className="mt-1 text-sm text-muted-foreground">
              i Bodø, Norge
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ansatte</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">600+</p>
            <p className="mt-1 text-sm text-muted-foreground">
              fordelt på flere kontorer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sykehus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">85%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              av norske sykehus bruker DIPS
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="prose max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Vår misjon</h2>
        <p className="text-muted-foreground leading-relaxed">
          Vi bygger digitale verktøy som gjør det enklere for klinikere å gi
          god behandling. Pasientsikkerhet, brukervennlighet og kliniske
          arbeidsflyter er kjernen i alt vi gjør.
        </p>
      </section>
    </div>
  )
}
