import { message } from 'antd'
import { HttpStatus } from 'src/interface'
import http, { CustomAxiosRequestConfig } from './http'

const request = async (...[endpoint, config]: Parameters<typeof http>) => {
  try {
    const result = await http(endpoint, {
      ...(config as CustomAxiosRequestConfig),
      method: config?.method || 'GET',
    })
    if (result.status !== HttpStatus.OK) {
      return Promise.reject(result)
    }
    return Promise.resolve(result)
  } catch (error: any) {
    message.error(error)
    return Promise.reject(error)
  }
}

export const post = (...[endpoint, config]: Parameters<typeof http>) => {
  if (!config) {
    config = {}
  }
  config.method = 'POST'
  return request(endpoint, config)
}

export const put = (...[endpoint, config]: Parameters<typeof http>) => {
  if (!config) {
    config = {}
  }
  config.method = 'PUT'
  return request(endpoint, config)
}

export const del = (...[endpoint, config]: Parameters<typeof http>) => {
  if (!config) {
    config = {}
  }
  config.method = 'DELETE'
  return request(endpoint, config)
}

export const get = request

export default request
