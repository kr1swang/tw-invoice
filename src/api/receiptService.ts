import axiosApi from '@/api/axiosApi'
import type { Receipt } from '@/types/common'

export const getReceipt = async (data: Record<string, any>): Promise<Receipt[]> => {
  const params = {}

  const resp = await axiosApi.get('', { params })

  return resp.data.map(
    (item: any): Receipt => ({
      title: item.cTitle,
      special: item.cCode_1,
      grand: item.cCode_2,
      first: item.cCode_3,
      additionalSixth: item.cCode_4
    })
  )
}
