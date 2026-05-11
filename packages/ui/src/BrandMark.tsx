import { Activity } from 'lucide-react'
import { cn } from './lib/utils'

type BrandMarkProps = {
  product?: string
  description?: string
  size?: 'sm' | 'md'
  className?: string
}

const sizeStyles = {
  sm: {
    icon: 'h-7 w-7',
    glyph: 'h-4 w-4',
    title: 'text-lg',
  },
  md: {
    icon: 'h-8 w-8',
    glyph: 'h-4 w-4',
    title: 'text-xl',
  },
}

export function BrandMark({
  product,
  description,
  size = 'md',
  className,
}: BrandMarkProps) {
  const styles = sizeStyles[size]
  const label = product ? `Medix ${product}` : 'Medix'

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground',
          styles.icon,
        )}
        aria-hidden="true"
      >
        <Activity className={styles.glyph} />
      </div>
      <div className="min-w-0">
        <div className={cn('font-bold tracking-tight', styles.title)}>
          {label}
        </div>
        {description && (
          <div className="mt-1 text-sm text-muted-foreground">
            {description}
          </div>
        )}
      </div>
    </div>
  )
}
