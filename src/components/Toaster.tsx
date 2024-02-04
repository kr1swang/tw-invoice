import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

import { useToast } from '@/hooks/useToast'
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/base'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ variant, id, title, description, action, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          <div className={'flex items-center gap-2'}>
            {variant === 'error' && <XCircle className={'size-4 shrink-0'} />}
            {variant === 'success' && <CheckCircle2 className={'size-4 shrink-0'} />}
            {variant === 'warring' && <AlertCircle className={'size-4 shrink-0'} />}
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
