'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col',
        month: 'flex flex-col gap-4',
        month_caption: 'relative flex h-9 items-center justify-center',
        caption_label: 'text-sm font-medium',
        nav: 'absolute inset-x-0 top-0 flex h-9 items-center justify-between px-1',
        button_previous:
          'flex h-7 w-7 items-center justify-center rounded-md opacity-50 hover:opacity-100 hover:bg-accent',
        button_next:
          'flex h-7 w-7 items-center justify-center rounded-md opacity-50 hover:opacity-100 hover:bg-accent',
        month_grid: 'mt-1 w-full border-collapse',
        weekdays: 'flex',
        weekday:
          'flex h-9 w-9 items-center justify-center text-xs font-normal text-muted-foreground select-none',
        weeks: '',
        week: 'flex',
        day: 'relative flex h-9 w-9 items-center justify-center p-0 text-sm focus-within:z-20 [&:has([aria-selected])]:rounded-md',
        day_button:
          'flex h-9 w-9 items-center justify-center rounded-md text-sm font-normal hover:bg-accent hover:text-accent-foreground',
        selected:
          '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground',
        today: '[&>button]:bg-accent [&>button]:text-accent-foreground',
        outside: 'opacity-50',
        disabled: 'opacity-50 [&>button]:pointer-events-none',
        range_start: '[&>button]:rounded-l-md',
        range_end: '[&>button]:rounded-r-md',
        range_middle: 'aria-selected:bg-accent aria-selected:rounded-none',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
