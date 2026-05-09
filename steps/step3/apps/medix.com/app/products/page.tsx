import type { Metadata } from 'next'
import { StatusBadge, Card, CardContent, CardHeader, CardTitle } from '@medix/ui'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore the Medix product suite — Arena, Mobility, Integration, and Analytics.',
}

const products = [
  {
    name: 'Arena',
    description:
      'A complete journal system for hospitals. Supports every clinical workflow from admission to discharge.',
    status: 'active' as const,
  },
  {
    name: 'Mobility',
    description:
      'Journal access on phone and tablet for clinical staff on the move.',
    status: 'draft' as const,
  },
  {
    name: 'Integration',
    description:
      'API platform for integrating with lab systems, RIS/PACS, and other clinical tooling.',
    status: 'closed' as const,
  },
  {
    name: 'Analytics',
    description:
      'Decision support and reports built on clinical data from across the hospital.',
    status: 'active' as const,
  },
]

export default function ProductsPage() {
  return (
    <div className="py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Products</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
        A unified ecosystem for modern healthcare operations — from journaling
        to decision support.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {products.map((product) => (
          <Card key={product.name}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {product.description}
              </p>
              <StatusBadge status={product.status} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
