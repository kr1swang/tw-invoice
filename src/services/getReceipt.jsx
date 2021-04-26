import { apiClient, reqMethods, handlerCorsUrl } from './apiClient'

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

export const getReceiptByStatic = async (params) =>
  apiClient(reqMethods.GET, '/assets/receipt.json', params)
    .then((resp) => {
      const result = resp.data
      return result
    })
    .catch((err) => {
      console.log('Get Receipt By Static Fail! ' + err)
      return []
    })

// Seems to be blocked...
export const getReceiptByApi = async (params) => {
  const random = Math.floor(Math.random() * 1000) + 1
  const url = `${handlerCorsUrl(process.env.REACT_APP_BASE_API_URL)}receipt.json?${random}`
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
