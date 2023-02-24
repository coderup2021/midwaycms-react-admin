export enum HttpStatus {
  OK = 0,
  ERROR = -1,
}

export interface ArticleDetail {
  /**
   * 正文
   */
  id: number
  content: string
  createdAt: string
  deletedAt: null | string
  /**
   * 描述
   */
  description: null | string
  /**
   * 编辑器类型，1:markdown；2:富文本编辑器
   */
  editorType: number
  /**
   * 标题
   */
  title: string
  updatedAt: null | string
}
