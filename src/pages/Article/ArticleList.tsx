import {
  DeleteOutlined,
  PlusCircleOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import { Input, Modal, Popover, Select, Space, Table, Tooltip } from 'antd'
import React, { useCallback } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { articleModalAtom } from 'src/recoil/articleAtom'
import ArticleForm from './ArticleForm'

const ArticleList = () => {
  const articleModal = useRecoilValue(articleModalAtom)
  return (
    <div className="article-page">
      {articleModal.showForm ? (
        <ArticleForm />
      ) : (
        <>
          <ArticleHeader />
          <ArticleTable />
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
        <PlusCircleOutlined className="header-icon" onClick={onAdd} />
      </Tooltip>
      <Tooltip title="move">
        <SwapOutlined className="header-icon" onClick={onMove} />
      </Tooltip>
      <Tooltip title="delete">
        <DeleteOutlined className="header-icon" onClick={onDel} />
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

function ArticleTable() {
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
    { title: '所属分类', dataIndex: 'cate', key: 'cate' },
    { title: '标签', dataIndex: 'tags', key: 'tags' },
    { title: '点击', dataIndex: 'clickCount', key: 'clickCount' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '编辑', key: 'operation' },
  ]
  const dataSource = [
    {
      key: '1',
      title: '第一篇',
      author: '临江',
      updatedAt: '2023-12-12',
      cate: 'a/bc/d',
      tags: 'abc, bcd, edf',
      clickCount: 123,
      status: '成功',
    },
    {
      key: '2',
      title: '第二篇',
      author: '临江',
      updatedAt: '2023-12-12',
      cate: 'a/bc/d',
      tags: 'abc, bcd, edf',
      clickCount: 100,
      status: '成功',
    },
  ]
  return (
    <div className="article-table">
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default ArticleList
