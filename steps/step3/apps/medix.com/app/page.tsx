import Link from 'next/link'
import {
  ArrowRight,
  HeartPulse,
  Smartphone,
  Network,
  BarChart3,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@medix/ui'

const solutions = [
  {
    icon: HeartPulse,
    title: 'Arena',
    description:
      'A complete journal system for hospitals. Supports every clinical workflow from admission to discharge.',
  },
  {
    icon: Smartphone,
    title: 'Mobility',
    description:
      'Journal access on phone and tablet for clinical staff on the move.',
  },
  {
    icon: Network,
    title: 'Integration',
    description:
      'API platform for integrating with lab systems, RIS/PACS, and other clinical tooling.',
  },
]

const stats = [
  { value: '85%', label: 'of national hospitals' },
  { value: '40,000+', label: 'active users' },
  { value: '600+', label: 'employees' },
  { value: '30+', label: 'years in operation' },
]

const features = [
  {
    icon: ShieldCheck,
    title: 'Security at the core',
    description:
      'Patient data is handled in line with the strictest healthcare and privacy regulations.',
  },
  {
    icon: BarChart3,
    title: 'Clinical data in real time',
    description:
      'Decision support and reports built on data from across the hospital.',
  },
  {
    icon: Users,
    title: 'Built with clinicians',
    description:
      'Designed alongside doctors, nurses, and medical secretaries in daily operations.',
  },
]

export default function Home() {
  return (
    <div>
      <section className="py-24 border-b">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-medium mb-6">
            Health technology
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Health technology for
            <br />
            modern hospitals
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Medix delivers journal systems, mobile access, and an integration
            platform for hospitals nationwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              See products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 border-b">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Our solutions
            </h2>
            <p className="mt-2 text-muted-foreground">
              A unified ecosystem for modern healthcare operations.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            All products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {solutions.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 border-t">
        <h2 className="text-3xl font-semibold tracking-tight mb-12">
          Why Medix?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 border-t">
        <div className="rounded-2xl bg-primary text-primary-foreground p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Want to learn more?
            </h2>
            <p className="mt-2 text-primary-foreground/80 max-w-xl">
              Get in touch for a demo or a no-strings-attached conversation.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-md bg-primary-foreground text-primary px-5 py-2.5 text-sm font-medium hover:bg-primary-foreground/90 transition-colors"
          >
            Book a demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
