import apiClient, { reqMethods } from './apiClient'

const random = Math.floor(Math.random() * 1000) + 1
export const getReceipt = params => apiClient.httpReq(reqMethods.GET, `receipt.json?${random}`, params)