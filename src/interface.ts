export enum HttpStatus {
  OK = 0,
  ERROR = -1,
}

export interface IdNameMapProps {
  [prop: number]: string
}

export interface ArticleDetail {
  id: number
  content: string
  description: null | string
  editorType: number //编辑器类型，1:markdown；2:富文本编辑器
  title: string
  cate?: Cate
  cateId?: number
  updatedAt: null | string
  createdAt: string
  deletedAt: null | string
}

export interface Cate {
  id: number
  name: string
  parentId: number
  parentIdPaths?: number[]
  path: string
  children?: Cate[]
}
