import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../lib/utils'

type SpinnerProps = ComponentPropsWithoutRef<'div'> & {
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: 'h-6 w-6',
  md: 'h-9 w-9',
  lg: 'h-12 w-12',
}

export function Spinner({
  label = 'Loading',
  size = 'md',
  className,
  ...props
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn('flex items-center justify-center p-8', className)}
      {...props}
    >
      <style>
        {`
          @keyframes medix-spinner-rotate {
            to {
              transform: rotate(360deg);
            }
          }

          @media (prefers-reduced-motion: no-preference) {
            .medix-spinner-mark {
              animation: medix-spinner-rotate 900ms linear infinite;
            }
          }
        `}
      </style>
      <svg
        viewBox="0 0 48 48"
        className={cn('medix-spinner-mark text-primary', sizeStyles[size])}
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="5"
        />
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeDasharray="34 88"
          strokeLinecap="round"
          strokeWidth="5"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  )
}
