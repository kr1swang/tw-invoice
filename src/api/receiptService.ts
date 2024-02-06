import axiosApi from '@/api/axiosApi'
import { type Receipt } from '@/types/common'

export const getPeriodList = async ([_, data]: [string, Record<string, any>]): Promise<string[]> => {
  const params = {}

  const resp = await axiosApi.get('', { params })
  if (!resp.data) throw new Error('No data')
  if (!Array.isArray(resp.data)) throw new Error('Data is not an array')

  return []
  return resp.data.map((item: any) => item.cTitle)
}

export const getReceipt = async ([_, data]: [string, Record<string, any>]): Promise<Receipt> => {
  const params = {}
  if (!data.period) throw new Error('Bad request')

  const resp = await axiosApi.get('', { params })
  if (!resp.data) throw new Error('No data')
  if (!Array.isArray(resp.data)) throw new Error('Data is not an array')
  const item = resp.data.find(({ cTitle }) => cTitle === data.period)
  if (!item) throw new Error('Period not found')

  return {
    period: item.cTitle,
    special: item.cCode_1,
    grand: item.cCode_2,
    first: item.cCode_3,
    additionalSixth: item.cCode_4
  }
}
