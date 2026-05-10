import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@medix/ui'
import { PageHeader } from '../components/PageHeader'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Medix — our mission, team, and the hospitals we serve.',
}

export default function AboutPage() {
  return (
    <div className="py-16">
      <PageHeader
        title="About"
        description="Medix delivers journal systems and a healthcare platform for hospitals across the country."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Founded</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1987</p>
            <p className="mt-1 text-sm text-muted-foreground">
              and still going
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">600+</p>
            <p className="mt-1 text-sm text-muted-foreground">
              across multiple offices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hospitals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">85%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              of national hospitals run on Medix
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="prose max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Our mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          We build digital tools that make it easier for clinicians to deliver
          good care. Patient safety, usability, and clinical workflows are at
          the heart of everything we do.
        </p>
      </section>
    </div>
  )
}
