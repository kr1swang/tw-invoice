import { useMemo } from 'react'
import Link from 'next/link'
import { prizeList } from '@/constants/prizeList'
import { HelpCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { type Receipt } from '@/types/common'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/base'

interface PrizeDescProps {
  info: Receipt | undefined
}

export default function PrizeDesc({ info }: PrizeDescProps) {
  const { t } = useTranslation()
  const sourceUrl = process.env.NEXT_PUBLIC_ETAX_URL
  const list = useMemo(() => {
    try {
      if (!info) throw new Error('info is undefined')
      return (
        prizeList
          // format the number
          .map((item) => {
            const key = item.mappingKey as keyof Receipt
            const value = info[key] ?? ''
            return { ...item, number: Array.isArray(value) ? value.join(', ') : value }
          })
          // filter out additionalSixth if it's empty
          .filter((item) => {
            const isAdditionalSixth = item.mappingKey === 'additionalSixth'
            return !isAdditionalSixth || (isAdditionalSixth && item.number !== '')
          })
      )
    } catch (e) {
      return []
    }
  }, [info])

  return (
    <section className={'flex flex-col gap-6 rounded-sm border p-6 text-sm md:col-span-3'}>
      <div className={'flex flex-wrap items-center gap-2'}>
        <span>{info?.period ?? '中獎號碼'}</span>
        <Link
          className={'text-gray-400 underline-offset-2 hover:underline'}
          href={sourceUrl!}
          target={'_blank'}
          rel={'noreferrer'}
        >
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
        {list.length === 0 ? (
          <EmptyTableBody colSpan={2} />
        ) : (
          <TableBody>
            {list.map((item, index) => (
              <TableRow key={index}>
                <TableCell className={'font-medium'}>{item.name}</TableCell>
                <TableCell className={'flex flex-col gap-1'}>
                  <code className={'text-red-600'}>{item.number}</code>
                  <span className={'text-xs'}>{item.rule}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </section>
  )
}

function EmptyTableBody({ colSpan }: { colSpan: number }) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan}>
          <div className={'flex h-80 flex-col items-center justify-center gap-2'}>
            <HelpCircle className={'size-6 text-gray-400'} />
            <span className={'text-gray-400'}>{'No Data'}</span>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}
