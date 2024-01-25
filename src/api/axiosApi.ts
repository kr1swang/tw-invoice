import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT!

const instance = axios.create({ timeout: 5000 })

instance.interceptors.request.use(
  (config) => {
    return { ...config, baseURL }
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return error
  }
)

export default instance
