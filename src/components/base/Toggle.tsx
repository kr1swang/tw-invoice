import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/classnames'

const toggleVariants = cva(
  'hover:text-muted-foreground focus-visible:ring-ring data-[state=on]:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-gray-200',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-input hover:bg-accent hover:text-accent-foreground border bg-transparent shadow-sm'
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-5 px-3 text-xs',
        lg: 'h-10 px-3'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
