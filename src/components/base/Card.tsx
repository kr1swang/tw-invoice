import { forwardRef } from 'react'

import { cn } from '@/utils/classnames'

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('rounded-sm border bg-gray-50 shadow', className)} {...props} />
))
Card.displayName = 'Card'
