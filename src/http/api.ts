import { get, put, del, post } from './request'

export const postArticle = (data: any) => post('/api/article', { data })

export const putArticle = (data: any) =>
  put(`/api/article/${data.id}`, { data })

export const getArticleList = (data?: any) => get('/api/article', { data })

export const getArticleDetail = (id: number) =>
  get('/api/article', { data: { id } })

export const delArticle = (data: any) =>
  del(`/api/article/${data.id}`, { data })
