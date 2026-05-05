import { useEffect, useState } from 'react'

/**
 * Delays updating a value until the user stops typing.
 * Useful for search inputs to avoid firing on every keystroke.
 */
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
