import { type Prize } from '@/types/common'

export const prizeList: Prize[] = [
  {
    prize: 'special',
    name: '特別獎',
    rule: '同期統一發票收執聯8位數號碼與特別獎號碼相同者獎金1,000萬元',
    mappingKey: 'special'
  },
  {
    prize: 'grand',
    name: '特獎',
    rule: '同期統一發票收執聯8位數號碼與特獎號碼相同者獎金200萬元',
    mappingKey: 'grand'
  },
  {
    prize: 'first',
    name: '頭獎',
    rule: '同期統一發票收執聯8位數號碼與特別獎號碼相同者獎金1,000萬元',
    mappingKey: 'first'
  },
  {
    prize: 'second',
    name: '二獎',
    rule: '同期統一發票收執聯末7位數號碼與頭獎中獎號碼末7位相同者各得獎金4萬元',
    mappingKey: ''
  },
  {
    prize: 'third',
    name: '三獎',
    rule: '同期統一發票收執聯末6位數號碼與頭獎中獎號碼末6位相同者各得獎金1萬元',
    mappingKey: ''
  },
  {
    prize: 'fourth',
    name: '四獎',
    rule: '同期統一發票收執聯末5位數號碼與頭獎中獎號碼末5位相同者各得獎金4千元',
    mappingKey: ''
  },
  {
    prize: 'fifth',
    name: '五獎',
    rule: '同期統一發票收執聯末4位數號碼與頭獎中獎號碼末4位相同者各得獎金1千元',
    mappingKey: ''
  },
  {
    prize: 'sixth',
    name: '六獎',
    rule: '同期統一發票收執聯末3位數號碼與頭獎中獎號碼末3位相同者各得獎金2百元',
    mappingKey: ''
  },
  {
    prize: 'additionalSixth',
    name: '增開六獎',
    rule: '同期統一發票收執聯末3位數號碼與增開六獎號碼相同者各得獎金2百元',
    mappingKey: 'additionalSixth'
  }
]
