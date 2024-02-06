import { memo, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HelpCircle, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { type History } from '@/types/common'
import { cn } from '@/utils/classnames'
import { toast } from '@/hooks/useToast'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ToggleGroup,
  ToggleGroupItem
} from '@/components/base'

type Filter = 'all' | 'win' | 'lose'

const MotionTableRow = motion(TableRow)

interface WinningResultProps {
  history: History[]
  onRemove: (id: string) => void
  onRemoveAll: () => void
}

export default function WinningResult({ history, onRemove, onRemoveAll }: WinningResultProps) {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<Filter>('all')
  const list = useMemo(() => {
    switch (filter) {
      case 'win':
        return history.filter(({ isWinning }) => isWinning)
      case 'lose':
        return history.filter(({ isWinning }) => !isWinning)
      case 'all':
      default:
        return history
    }
  }, [filter, history])

  const handleRemoveAll = () => {
    if (confirm('確定要清空紀錄嗎?')) {
      onRemoveAll()
      toast({ variant: 'success', description: '已清空紀錄!' })
    }
  }

  return (
    <section className={'flex flex-col gap-6 rounded-sm border p-6 text-sm md:col-span-3'}>
      <div className={'flex flex-wrap items-center gap-2'}>
        <span>{'對獎紀錄'}</span>

        <div className={'flex grow items-center justify-between gap-2'}>
          <ToggleGroup type={'single'} value={filter} onValueChange={(value: Filter) => setFilter(value)} size={'sm'}>
            <ToggleGroupItem value={'all'}>{'全部'}</ToggleGroupItem>
            <ToggleGroupItem value={'win'}>{'中獎'}</ToggleGroupItem>
            <ToggleGroupItem value={'lose'}>{'未中'}</ToggleGroupItem>
          </ToggleGroup>
          <Button variant={'ghost'} size={'sm'} onClick={handleRemoveAll}>
            {'清空紀錄'}
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader className={'sticky top-0 bg-gray-100'}>
          <TableRow>
            <TableHead className={'w-28'}>{'項次'}</TableHead>
            <TableHead>{'發票末三碼'}</TableHead>
            <TableHead className={'w-10'} />
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {list.length > 0 ? (
              list
                .map((item, index) => (
                  <RowItem key={item.id} item={item} index={index + 1} onRemove={() => onRemove(item.id)} />
                ))
                .toReversed()
            ) : (
              <EmptyRow colSpan={3} />
            )}
          </AnimatePresence>
        </TableBody>
      </Table>
    </section>
  )
}

interface RowItemProps {
  item: History
  index: number
  onRemove: () => void
}

const RowItem = memo(({ item, index, onRemove }: RowItemProps) => {
  return (
    <MotionTableRow
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      title={`${item.date.toLocaleString()}\n${item.period} - ${item.number}`}
    >
      <TableCell className={'font-medium'}>{index}</TableCell>
      <TableCell className={cn(item.isWinning && 'text-red-600')}>{item.number}</TableCell>
      <TableCell>
        <Button variant={'ghost'} size={'icon'} onClick={onRemove}>
          <X />
        </Button>
      </TableCell>
    </MotionTableRow>
  )
})
RowItem.displayName = 'RowItem'

interface EmptyRowProps {
  colSpan: number
}

const EmptyRow = memo(({ colSpan }: EmptyRowProps) => {
  return (
    <MotionTableRow initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <TableCell colSpan={colSpan}>
        <div className={'flex h-80 flex-col items-center justify-center gap-2'}>
          <HelpCircle className={'size-6 text-gray-400'} />
          <span className={'text-gray-400'}>{'No Data'}</span>
        </div>
      </TableCell>
    </MotionTableRow>
  )
})
EmptyRow.displayName = 'EmptyRow'
