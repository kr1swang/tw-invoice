import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { type History, type Receipt } from '@/types/common'
import { toast } from '@/hooks/useToast'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/base'

interface UserInputProps {
  options: string[]
  info: Receipt | undefined
  addResult: (value: History) => void
}

export default function UserInput({ options, info, addResult }: UserInputProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const period = searchParams.get('period') ?? undefined
  const [input, setInput] = useState<string>('')

  const checkWinning = useCallback(
    (number: string): History => {
      const id = `${new Date().getTime()}`
      const date = new Date()
      try {
        if (number.length !== 3) throw new Error('Input length is not 3.')
        if (!info) throw new Error('Prize info is not found.')
        const period = info.period
        const isWinning = true

        if (info.special.slice(-3).includes(number)) {
          toast({ variant: 'warring', description: '請確認！與特別獎末三碼相同！' })
          return { id, period, isWinning, number, date }
        } else if (info.grand.slice(-3).includes(number)) {
          toast({ variant: 'warring', description: '請確認！與特獎末三碼相同！' })
          return { id, period, isWinning, number, date }
        } else if (info.first.map((item) => item.slice(-3)).includes(number)) {
          toast({ variant: 'success', description: '恭喜中獎！與頭獎末三碼相同！' })
          return { id, period, isWinning, number, date }
        } else if (info.additionalSixth.map((item) => item.slice(-3)).includes(number)) {
          toast({ variant: 'success', description: '恭喜中獎！與增開六獎相同！' })
          return { id, period, isWinning, number, date }
        } else {
          throw new Error('沒有中獎！再接再厲！')
        }
      } catch (e) {
        e instanceof Error && toast({ variant: 'error', description: e.message })
        return { id, period: info?.period ?? 'unknown', isWinning: false, number, date }
      }
    },
    [info]
  )

  useEffect(() => {
    if (input.length >= 3) {
      const result = checkWinning(input)
      addResult(result)
      setInput('')
    }
  }, [addResult, checkWinning, input])

  return (
    <section className={'flex flex-col gap-6 rounded-sm border p-6 text-sm md:col-span-4'}>
      <div className={'flex flex-col gap-2 md:flex-row md:items-center'}>
        <label
          htmlFor={'period'}
          className={`basis-1/3 text-left after:mx-1 after:content-[':'] md:text-right lg:basis-40`}
        >
          {'開獎月份'}
        </label>
        <Select
          value={period}
          onValueChange={(value) => router.push(`${pathname}?period=${value}`)}
          disabled={options.length === 0}
        >
          <SelectTrigger>
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
          className={`basis-1/3 text-left after:mx-1 after:content-[':'] md:text-right lg:basis-40`}
        >
          {'發票末三碼'}
        </label>
        <Input
          id={'number'}
          pattern={`\d*`}
          inputMode={'numeric'}
          type={'text'}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={'請輸入發票末三碼'}
          disabled={!info}
        />
      </div>
    </section>
  )
}
