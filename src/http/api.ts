import { get, put, del, post } from './request'

/**
 *  article
 */
export const postArticle = (data: any) => post('/api/article', { data })

export const putArticle = (data: any) =>
  put(`/api/article/${data.id}`, { data })

export const getArticleList = (data?: any) => get('/api/article', { data })

export const getArticleDetail = (id: number) =>
  get('/api/article', { data: { id } })

export const delArticle = (data: any) =>
  del(`/api/article/${data.id}`, { data })

/**
 *  cate
 */
export const postCate = (data: any) => post('/api/cate', { data })

export const putCate = (data: any) => put(`/api/cate/${data.id}`, { data })

export const getCateList = (data?: any) => get('/api/cate', { data })

export const getCateDetail = (id: number) => get('/api/cate', { data: { id } })

export const delCate = (data: any) => del(`/api/cate/${data.id}`, { data })
