import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@medix/ui'
import { Mail, Phone, MapPin, Building2 } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Medix team. We are here to help.',
}

const offices = [
  {
    name: 'HQ',
    address: '123 Main Street, Anytown',
    department: 'Headquarters',
  },
  {
    name: 'Engineering',
    address: '45 Innovation Way, Tech City',
    department: 'Product & engineering',
  },
  {
    name: 'Support',
    address: '7 Service Avenue, Northpoint',
    department: 'Sales and support',
  },
]

const contactPoints = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@medix.example',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 555 123 4567',
  },
  {
    icon: Building2,
    label: 'Company number',
    value: '999 999 999',
  },
]

export default function ContactPage() {
  return (
    <div className="py-16">
      <PageHeader
        title="Contact"
        description="We are happy to help — whether you want a demo, have product questions, or need technical support."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
        {contactPoints.map(({ icon: Icon, label, value }) => (
          <Card key={label}>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground mb-2">
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-base text-muted-foreground font-medium">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold tracking-tight mb-6">Offices</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {offices.map((office) => (
          <Card key={office.name}>
            <CardHeader>
              <CardTitle>{office.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {office.department}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                {office.address}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
