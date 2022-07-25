import { apiClient, reqMethods } from './apiClient'

export const getPrizeSpce = async (params) =>
  apiClient(reqMethods.GET, '/assets/prizeSpce.json', params)
    .then((resp) => {
      const result = resp.data
      return result
    })
    .catch((err) => {
      console.log('Get Receipt Spec Fail! ' + err)
      return []
    })

export const getReceiptByApi = async (params) => {
  const url = process.env.REACT_APP_INVOICE_API_URL
  return apiClient(reqMethods.GET, url, params)
    .then((resp) => {
      const result = resp.data
      return result
    })
    .catch((err) => {
      console.log('Get Receipt By Api Fail! ' + err)
      return []
    })
}
