import {
  DeleteOutlined,
  FormOutlined,
  PlusCircleOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import { Input, message, Select, Space, Table, Tooltip } from 'antd'
import { useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { articleModalAtom } from 'src/recoil/articleAtom'
import ArticleForm from './ArticleForm'
import { useQuery, useQueryClient } from 'react-query'
import { delArticle, getArticleList } from 'src/http/api'
import { articleFormAtom, articleListAtom } from 'src/recoil/articleAtom'
import { ArticleDetail } from 'src/interface'
import _ from 'lodash'

const ArticleList = () => {
  const articleModal = useRecoilValue(articleModalAtom)
  const [articleList, setArticleList] = useRecoilState(articleListAtom)
  const { data, isSuccess } = useQuery('articleList', () =>
    getArticleList().then((res) => res.data),
  )

  useEffect(() => {
    if (!isSuccess || !data) return
    setArticleList(data)
  }, [isSuccess, data])

  return (
    <div className="article-page page-container">
      {articleModal.showForm ? (
        <ArticleForm />
      ) : (
        <>
          <ArticleHeader />
          <ArticleTable articleList={articleList} />
        </>
      )}
    </div>
  )
}

function ArticleHeaderRight() {
  const setArticalModal = useSetRecoilState(articleModalAtom)
  const onAdd = useCallback(() => {
    setArticalModal((state) => ({ ...state, showForm: true }))
  }, [])
  const onDel = useCallback(() => {
    setArticalModal((state) => ({ ...state, showRecycle: true }))
  }, [])
  const onMove = useCallback(() => {
    setArticalModal((state) => ({ ...state, showMove: true }))
  }, [])
  return (
    <Space className="header-right">
      <Tooltip title="add">
        <PlusCircleOutlined className="common-icon" onClick={onAdd} />
      </Tooltip>
      <Tooltip title="move">
        <SwapOutlined className="common-icon" onClick={onMove} />
      </Tooltip>
      <Tooltip title="delete">
        <DeleteOutlined className="common-icon" onClick={onDel} />
      </Tooltip>
    </Space>
  )
}

function ArticleHeaderLeft() {
  return (
    <Space className="header-left">
      <Input placeholder="请输入用户名" />
      <Input placeholder="请输入关键字" />
      <Select placeholder="请选择分类"></Select>
      <Select placeholder="请选择状态"></Select>
    </Space>
  )
}

function ArticleHeader() {
  return (
    <p className="article-header">
      <ArticleHeaderLeft />
      <ArticleHeaderRight />
    </p>
  )
}

interface ArticleTableProps {
  articleList: ArticleDetail[]
}

function formatArticleFormData(article: ArticleDetail) {
  const obj = _.cloneDeep(article)
  obj.cateId = obj.cate?.id
  delete obj.cate
  return obj
}

function ArticleTable({ articleList }: ArticleTableProps) {
  const queryClient = useQueryClient()
  const setArticleRecoilForm = useSetRecoilState(articleFormAtom)
  const setArticleModal = useSetRecoilState(articleModalAtom)
  const onEdit = useCallback(
    (item: ArticleDetail) => {
      setArticleRecoilForm(formatArticleFormData(item))
      setArticleModal((status) => ({
        ...status,
        showForm: true,
      }))
    },
    [setArticleRecoilForm],
  )
  const onDel = useCallback(async (item: ArticleDetail) => {
    await delArticle({ id: item.id })
    message.success('删除成功')
    queryClient.invalidateQueries(['articleList'])
  }, [])
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updateAt',
    },
    {
      title: '所属分类',
      key: 'cate',
      render(item: ArticleDetail) {
        return item.cate?.name || ''
      },
    },
    { title: '标签', dataIndex: 'tags', key: 'tags' },
    { title: '点击', dataIndex: 'clickCount', key: 'clickCount' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    {
      title: '编辑',
      key: 'operation',
      render(item: ArticleDetail) {
        return (
          <>
            <FormOutlined
              className="common-icon"
              style={{ marginRight: 10 }}
              onClick={() => onEdit(item)}
            />
            <DeleteOutlined
              className="common-icon"
              onClick={() => onDel(item)}
            />
          </>
        )
      },
    },
  ]

  return (
    <div className="article-table">
      <Table
        columns={columns}
        dataSource={articleList}
        rowKey={(item) => item.title + item.id}
      />
    </div>
  )
}

export default ArticleList
