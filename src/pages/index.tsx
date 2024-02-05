import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import useSWR from 'swr'

import { getPeriodList, getReceipt } from '@/api/receiptService'
import { type History } from '@/types/common'
import { toast } from '@/hooks/useToast'
import { Card, Separator } from '@/components/base'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PrizeDesc from '@/components/PrizeDesc'
import UserInput from '@/components/UserInput'
import WinningRate from '@/components/WinningRate'
import WinningResult from '@/components/WinningResult'

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: options = [], error: optionsError } = useSWR(['getPeriodList', {}], getPeriodList)
  const period = useSearchParams().get('period') ?? options[0]
  const { data: selectedInfo, error: infoError } = useSWR(period ? ['getReceipt', { period }] : null, getReceipt)
  const [history, setHistory] = useState<History[]>([])

  useEffect(() => {
    const isInvalid = period && options.length > 0 && !options.includes(period)
    if (isInvalid) router.push(pathname)
  }, [period, options, router, pathname])

  useEffect(() => {
    const errorMassage: string | undefined = [optionsError, infoError].find((item) => item?.message)?.message
    if (errorMassage) toast({ variant: 'error', description: errorMassage })
  }, [optionsError, infoError])

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={'sm:p-4 md:grid md:py-8'}>
      <Card className={'mx-auto flex size-full max-w-screen-2xl flex-col items-stretch gap-6 p-4 sm:p-6'}>
        <Header />
        <Separator />
        <article className={'grid shrink grow grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[146px_min(50vh,512px)]'}>
          <UserInput
            options={options}
            info={selectedInfo}
            addResult={(value) => setHistory((prev) => [...prev, value])}
          />
          <WinningRate history={history} />
          <PrizeDesc info={selectedInfo} />
          <WinningResult
            history={history}
            onRemove={(id) => setHistory((prev) => prev.filter((item) => item.id !== id))}
            onRemoveAll={() => setHistory([])}
          />
        </article>
        <Separator />
        <Footer />
      </Card>
    </motion.main>
  )
}
