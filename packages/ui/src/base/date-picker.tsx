'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { cn } from '../lib/utils'

type DatePickerButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof Button>,
  'asChild' | 'children' | 'onChange' | 'type' | 'value' | 'variant'
>

type DatePickerProps = DatePickerButtonProps & {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  className,
  disabled,
  ...buttonProps
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  // Parse the YYYY-MM-DD string with a noon time to avoid timezone shifts
  const selected = value ? new Date(value + 'T12:00:00') : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
          {...buttonProps}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          {value ? format(selected!, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected}
          onSelect={(day) => {
            if (day) {
              onChange(format(day, 'yyyy-MM-dd'))
              setOpen(false)
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
