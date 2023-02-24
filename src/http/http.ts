import axios from './axios'
import { AxiosError, AxiosRequestConfig } from 'axios'

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipLoading?: boolean
}

const http = async (
  endpoint: string,
  { data = {}, method = 'GET', ...customConfig }: CustomAxiosRequestConfig = {},
) => {
  let params: object | null = null
  if (method === 'GET') {
    data.IEtimeStamp = new Date().getTime()
  }
  if (method === 'GET' && Object.keys(data).length > 0) {
    params = data
  }
  try {
    const config = {
      method,
      url: endpoint,
      data,
      params,
      ...customConfig,
    }
    const response = await axios(config)

    return Promise.resolve(response.data)
  } catch (error) {
    const _err = error as AxiosError
    if (_err!.response!.status === 401) {
      console.log(401)
    }
  }
}

export const useHttp = () => {
  return (...[endpoint, config]: Parameters<typeof http>) => {
    return http(endpoint, { ...config })
  }
}

export const useHttpPost = () => {
  return (...[endpoint, config]: Parameters<typeof http>) => {
    return http(endpoint, { ...config, method: 'POST' })
  }
}

export default http
