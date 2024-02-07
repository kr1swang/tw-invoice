import { useCallback, useMemo } from 'react'
import Link from 'next/link'
import { prizeList } from '@/constants/prizeList'
import { useTranslation } from 'react-i18next'

import { type Receipt } from '@/types/common'
import { cn } from '@/utils/classnames'
import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/base'

const mockReceipt: Receipt = {
  period: '',
  special: '',
  grand: '',
  first: ['', '', ''],
  additionalSixth: []
}

interface PrizeDescProps {
  info: Receipt | undefined
}

export default function PrizeDesc({ info }: PrizeDescProps) {
  const { t } = useTranslation()
  const sourceUrl = process.env.NEXT_PUBLIC_ETAX_URL
  const list = useMemo(() => {
    return prizeList.map(({ mappingKey, ...item }) => {
      const key = mappingKey as keyof Receipt
      const number = info?.[key] ?? mockReceipt[key]
      return { ...item, number }
    })
  }, [info])

  return (
    <section className={'flex flex-col gap-6 rounded-sm border p-4 text-sm sm:p-6 md:col-span-3'}>
      <div className={'flex flex-wrap items-center justify-between gap-2'}>
        {info ? <span>{info.period}</span> : <Skeleton className={'h-5 w-64'} />}

        <Link className={'underline-offset-2 hover:underline'} href={sourceUrl!} target={'_blank'} rel={'noreferrer'}>
          {'資料來源(財政部)'}
        </Link>
      </div>

      <Table>
        <TableHeader className={'sticky top-0 bg-gray-100'}>
          <TableRow>
            <TableHead className={cn('w-20')}>{'獎別'}</TableHead>
            <TableHead>{'中獎號碼'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index, array) => {
            const isAdditionalSixth = index === array.length - 1
            const isEmpty = Array.isArray(item.number) && item.number.length === 0
            const numbers: string[] | undefined = typeof item.number === 'string' ? [item.number] : item.number

            return (
              <TableRow key={index} className={cn(isAdditionalSixth && isEmpty && 'hidden')}>
                <TableCell className={'font-medium'}>{item.name}</TableCell>
                <TableCell className={'flex flex-col gap-1'}>
                  {/* numbers */}
                  {numbers && (
                    <div className={'flex flex-wrap gap-2'}>
                      {numbers.map((number, index) =>
                        info ? (
                          <code key={index} className={'text-red-600'}>
                            {number}
                          </code>
                        ) : (
                          <Skeleton key={index} className={'h-5 w-20'} />
                        )
                      )}
                    </div>
                  )}

                  {/* rule */}
                  <span className={'text-xs'}>{item.rule}</span>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}
