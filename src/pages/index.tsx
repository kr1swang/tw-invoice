import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'

import { getPeriodList, getReceipt } from '@/api/receiptService'
import type { History, Receipt } from '@/types/common'
import { toast } from '@/hooks/useToast'
import {
  Card,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator
} from '@/components/base'

export default function Home() {
  const { t } = useTranslation()
  const { data: options = [], error: optionsError } = useSWR(['getPeriodList', {}], getPeriodList)
  // TODO, replace this, using url query params
  const [period, setPeriod] = useState<string | undefined>(undefined)
  const { data: selectedInfo, error: infoError } = useSWR(period ? ['getReceipt', { period }] : null, getReceipt)
  const [history, setHistory] = useState<History[]>([])

  useEffect(() => {
    if (!period && options.length > 0) setPeriod(options[0])
  }, [period, options])

  useEffect(() => {
    const errorMassage: string | undefined = [optionsError, infoError].find((item) => item?.message)
    if (errorMassage) toast({ variant: 'error', description: errorMassage })
  }, [optionsError, infoError])

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={'p-4 md:grid md:h-screen md:py-8'}>
      <Card className={'mx-auto flex size-full max-w-screen-2xl flex-col items-stretch gap-6 p-6'}>
        <Header />
        <Separator />
        <main className={'grid flex-1 grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[auto_1fr]'}>
          <UserInput
            options={options}
            period={period}
            onPeriodChange={(value) => setPeriod(value)}
            info={selectedInfo}
            addResult={(value) => setHistory((prev) => [...prev, value])}
          />
          <WinningRate history={history} />
          <PrizeDesc info={selectedInfo} />
          <WinningResult
            history={history}
            remove={(id) => setHistory((prev) => prev.filter((item) => item.id !== id))}
            removeAll={() => setHistory([])}
          />
        </main>
        <Separator />
        <Footer />
      </Card>
    </motion.main>
  )
}

function Header() {
  const { t } = useTranslation()

  return (
    <header className={'flex flex-wrap items-baseline justify-start gap-4'}>
      <h1 className={'inline-block text-2xl font-bold'}>{t('title')}</h1>
      <p className={'inline-block text-xs'}>{'Easily Check Taiwan Invoice Lottery Tool.'}</p>
    </header>
  )
}

interface UserInputProps {
  options: string[]
  period: string | undefined
  onPeriodChange: (value: string) => void
  info: Receipt | undefined
  addResult: (value: History) => void
}

function UserInput({ options, period, onPeriodChange, info, addResult }: UserInputProps) {
  const { t } = useTranslation()
  const [input, setInput] = useState<string>('')

  return (
    <section className={'flex flex-col gap-6 rounded-sm border p-6 text-sm md:col-span-4'}>
      <div className={'flex flex-col gap-2 md:flex-row md:items-center'}>
        <label
          htmlFor={'period'}
          className={`basis-1/4 text-left after:mx-1 after:content-[':'] md:text-right lg:basis-40`}
        >
          {'開獎月份'}
        </label>
        <Select value={period} onValueChange={onPeriodChange} disabled={!info}>
          <SelectTrigger className={'flex-1'}>
            <SelectValue id={'period'} placeholder={'Loading...'} />
          </SelectTrigger>
          <SelectContent>
            {options.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className={'flex flex-col gap-2 md:flex-row md:items-center'}>
        <label
          htmlFor={'number'}
          className={`basis-1/4 text-left after:mx-1 after:content-[':'] md:text-right lg:basis-40`}
        >
          {'發票末三碼'}
        </label>
        <Input
          id={'number'}
          className={'flex-1'}
          // TODO, check this works on mobile
          pattern={`\d*`}
          inputMode={'numeric'}
          type={'text'}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={'請輸入發票末三碼'}
        />
      </div>
    </section>
  )
}

interface WinningRateProps {
  history: History[]
}

function WinningRate({ history }: WinningRateProps) {
  const { t } = useTranslation()
  const { winning, total, rate } = useMemo(() => {
    const winning = history.filter(({ isWinning }) => isWinning).length || 10
    const total = history.length || 12
    const rate = total === 0 ? NaN : winning / total
    return { winning, total, rate }
  }, [history])
  const titleDesc = useMemo(() => (total === 0 ? '' : `(${winning}/${total})`), [winning, total])
  const rateLabel = useMemo(() => (isNaN(rate) ? '-' : `${Math.round(rate * 1000) / 10}%`), [rate])

  return (
    <section className={'grid place-items-center gap-2 rounded-sm border p-6 md:col-span-2'}>
      <div className={'flex flex-row items-baseline gap-1'}>
        <span className={'text-sm text-gray-600'}>{'中獎機率'}</span>
        <code className={'text-sm text-gray-600'}>{titleDesc}</code>
      </div>
      <code className={'text-3xl'}>{rateLabel}</code>
    </section>
  )
}

interface PrizeDescProps {
  info: Receipt | undefined
}

function PrizeDesc({ info }: PrizeDescProps) {
  const { t } = useTranslation()
  const sourceUrl = process.env.NEXT_PUBLIC_ETAX_URL

  return (
    <section className={'flex flex-col gap-6 rounded-sm border p-6 text-sm md:col-span-3'}>
      <span className={'text-base'}>{info?.period ?? 'Loading...'}</span>
      {info && <code className={'whitespace-pre'}>{JSON.stringify(info, null, 2)}</code>}
    </section>
  )
}

interface WinningResultProps {
  history: History[]
  remove: (id: string) => void
  removeAll: () => void
}

// TODO, implement this
function WinningResult({ history, remove, removeAll }: WinningResultProps) {
  const { t } = useTranslation()

  return (
    <section className={'flex flex-col gap-6 rounded-sm border p-6 text-sm md:col-span-3'}>
      <span className={'text-base'}>{'對獎紀錄'}</span>
      <code className={'whitespace-pre'}>{JSON.stringify(history, null, 2)}</code>
    </section>
  )
}

function Footer() {
  const { t } = useTranslation()
  const version = `ver ${process.env.version} (${process.env.buildId})`
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL
  const currentYear = new Date().getFullYear()

  return (
    <footer className={'flex flex-col flex-wrap items-center justify-between gap-4 sm:flex-row'}>
      <span className={'text-xs'}>{version}</span>

      <Link
        className={'text-xs underline-offset-2 hover:underline'}
        href={githubUrl!}
        target={'_blank'}
        rel={'noreferrer'}
      >
        {`Copyright © ${currentYear} by Kr1sWang`}
      </Link>
    </footer>
  )
}
