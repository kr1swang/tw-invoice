import { useEffect, useMemo, useState } from 'react'
import { animate } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { type History } from '@/types/common'

interface WinningRateProps {
  history: History[]
}

export default function WinningRate({ history }: WinningRateProps) {
  const { t } = useTranslation()
  const [counter, setCounter] = useState<number>(0)
  const { winning, total, rate } = useMemo(() => {
    const winning = history.filter(({ isWinning }) => isWinning).length
    const total = history.length
    const rate = total === 0 ? 0 : winning / total
    return { winning, total, rate }
  }, [history])
  const titleDesc = useMemo(() => (total === 0 ? '' : `(${winning}/${total})`), [winning, total])
  const rateLabel = useMemo(() => `${Math.round(counter * 1000) / 10}%`, [counter])

  useEffect(() => {
    const controls = animate(counter, rate, {
      duration: 0.1,
      onUpdate: (value) => setCounter(value)
    })
    return () => controls.stop()
  }, [counter, rate])

  return (
    <section className={'grid place-items-center gap-2 rounded-sm border p-4 sm:p-6 md:col-span-2'}>
      <div className={'flex flex-row items-baseline gap-1'}>
        <span className={'text-sm text-gray-600'}>{'中獎機率'}</span>
        <code className={'text-sm text-gray-600'}>{titleDesc}</code>
      </div>
      <code className={'text-3xl'}>{rateLabel}</code>
    </section>
  )
}
