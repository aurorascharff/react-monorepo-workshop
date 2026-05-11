import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@medix/ui'
import { Building2, MapPin } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'

export const metadata: Metadata = {
  title: 'Customers',
  description:
    'Hospitals and health systems across every region trust Medix for their clinical workflows.',
}

const customers = [
  {
    name: 'Central University Hospital',
    region: 'Region North',
    quote:
      'Medix has changed how we work with patient journeys. Clinicians spend less time on documentation and more time with patients.',
    role: 'Department Head',
  },
  {
    name: 'St. Mary Medical Center',
    region: 'Region East',
    quote:
      'The integration platform lets us connect lab, radiology, and journal seamlessly — without bespoke integration projects.',
    role: 'IT Director',
  },
  {
    name: 'Northern Regional Hospital',
    region: 'Region North',
    quote:
      'Mobile access has been critical for our outreach teams. The journal is wherever the patient is.',
    role: 'Clinical Lead',
  },
  {
    name: 'Coastal University Hospital',
    region: 'Region West',
    quote:
      'Decision support gives us safer clinical choices, especially on call and in acute situations.',
    role: 'Senior Physician',
  },
]

export default function CustomersPage() {
  return (
    <div className="py-16">
      <PageHeader
        title="Customers"
        description="Medix is in use at hospitals across every healthcare region — from coast to coast."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-16">
        {customers.map((customer) => (
          <Card key={customer.name}>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground mb-2">
                <Building2 className="h-5 w-5" />
              </div>
              <CardTitle>{customer.name}</CardTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5" /> {customer.region}
              </p>
            </CardHeader>
            <CardContent>
              <blockquote className="text-sm leading-relaxed border-l-2 border-primary pl-4 italic">
                {customer.quote}
              </blockquote>
              <p className="mt-3 text-sm text-muted-foreground">
                — {customer.role}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
