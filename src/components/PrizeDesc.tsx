import { useCallback, useMemo } from 'react'
import Link from 'next/link'
import { prizeList } from '@/constants/prizeList'
import { HelpCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { type Receipt } from '@/types/common'
import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/base'

interface PrizeDescProps {
  info: Receipt | undefined
}

export default function PrizeDesc({ info }: PrizeDescProps) {
  const { t } = useTranslation()
  const sourceUrl = process.env.NEXT_PUBLIC_ETAX_URL
  const list = useMemo(() => {
    return (
      prizeList
        // format the number
        .map((item) => {
          const key = item.mappingKey as keyof Receipt
          const value = info?.[key] ?? ''
          return { ...item, number: Array.isArray(value) ? value.join(', ') : value }
        })
        // filter out additionalSixth if it's empty
        .filter((item) => {
          const isAdditionalSixth = item.mappingKey === 'additionalSixth'
          return !isAdditionalSixth || (isAdditionalSixth && item.number !== '')
        })
    )
  }, [info])

  const handleSkeletonStyle = useCallback((key: keyof Receipt) => {
    switch (key) {
      case 'special':
      case 'grand':
        return 'h-5 w-20'
      case 'first':
        return 'h-5 w-64'
      default:
        return 'hidden'
    }
  }, [])

  return (
    <section className={'flex flex-col gap-6 rounded-sm border p-6 text-sm md:col-span-3'}>
      <div className={'flex flex-wrap items-center justify-between gap-2'}>
        {info ? <span>{info.period}</span> : <Skeleton className={'h-5 w-64'} />}

        <Link className={'underline-offset-2 hover:underline'} href={sourceUrl!} target={'_blank'} rel={'noreferrer'}>
          {'資料來源(財政部)'}
        </Link>
      </div>

      <Table>
        <TableHeader className={'sticky top-0 bg-gray-100'}>
          <TableRow>
            <TableHead className={'w-28'}>{'獎別'}</TableHead>
            <TableHead>{'中獎號碼'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => {
            const className = handleSkeletonStyle(item.mappingKey as keyof Receipt)
            return (
              <TableRow key={index}>
                <TableCell className={'font-medium'}>{item.name}</TableCell>
                <TableCell className={'flex flex-col gap-1'}>
                  {item.number ? (
                    <code className={'text-red-600'}>{item.number}</code>
                  ) : (
                    <Skeleton className={className} />
                  )}
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
