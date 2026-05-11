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
    glyph: 'h-3.5 w-3.5',
    title: 'text-base leading-4',
    context: 'text-[0.625rem] leading-3',
  },
  md: {
    icon: 'h-8 w-8',
    glyph: 'h-4 w-4',
    title: 'text-lg leading-5',
    context: 'text-[0.6875rem] leading-3',
  },
}

export function BrandMark({
  product,
  description,
  size = 'md',
  className,
}: BrandMarkProps) {
  const styles = sizeStyles[size]
  const context = description ?? product

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground',
          styles.icon,
        )}
        aria-hidden="true"
      >
        <Activity className={styles.glyph} />
      </div>
      <div className="flex min-w-0 flex-col justify-center">
        <div className={cn('font-bold', styles.title)}>Medix</div>
        {context && (
          <div
            className={cn(
              'mt-0.5 font-medium text-muted-foreground',
              styles.context,
            )}
          >
            {context}
          </div>
        )}
      </div>
    </div>
  )
}
