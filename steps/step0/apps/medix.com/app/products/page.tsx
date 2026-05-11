import type { Metadata } from 'next'
import { PageHeader } from '../components/PageHeader'
import { ProductCard } from './_components/ProductCard'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Explore the Medix product suite — Arena, Mobility, Integration, and Analytics.',
}

const products = [
  {
    name: 'Arena',
    description:
      'A complete journal system for hospitals. Supports every clinical workflow from admission to discharge.',
  },
  {
    name: 'Mobility',
    description:
      'Journal access on phone and tablet for clinical staff on the move.',
  },
  {
    name: 'Integration',
    description:
      'API platform for integrating with lab systems, RIS/PACS, and other clinical tooling.',
  },
  {
    name: 'Analytics',
    description:
      'Decision support and reports built on clinical data from across the hospital.',
  },
]

export default function ProductsPage() {
  return (
    <div className="py-16">
      <PageHeader
        title="Products"
        description="A unified ecosystem for modern healthcare operations — from journaling to decision support."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            title={product.name}
            description={product.description}
          />
        ))}
      </div>
    </div>
  )
}
