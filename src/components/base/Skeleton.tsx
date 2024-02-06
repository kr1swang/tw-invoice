import { cn } from '@/utils/classnames'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-gray-600/10', className)} {...props} />
}
