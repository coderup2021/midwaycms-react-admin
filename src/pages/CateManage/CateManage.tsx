import {
  DeleteOutlined,
  FormOutlined,
  PlusCircleOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import { message, Modal, Space, Table, Tooltip } from 'antd'
import { useCallback } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import CateForm from './CateForm'
import { useQueryClient } from 'react-query'
import { delCate } from 'src/http/api'
import {
  cateModalAtom,
  cateFormAtom,
  cateTreeAtom,
  cateExpandedKeysAtom,
} from 'src/recoil/cateAtom'
import { Cate } from 'src/interface'
import _ from 'lodash'
import { TableRowSelection } from 'antd/es/table/interface'
import { useCateData } from 'src/hooks/commonHooks'

const CateManage = () => {
  const cateModal = useRecoilValue(cateModalAtom)
  useCateData()

  return (
    <div className="cate-page page-container">
      <CateHeader />
      <CateTable />
      <Modal open={cateModal.showForm} title={'添加分类'} footer={false}>
        <CateForm />
      </Modal>
    </div>
  )
}

function CateHeaderRight() {
  const setCateModal = useSetRecoilState(cateModalAtom)
  const setCateRecoilForm = useSetRecoilState(cateFormAtom)
  const onAdd = useCallback(() => {
    setCateModal((state) => ({ ...state, showForm: true }))
    setCateRecoilForm({})
  }, [])
  const onDel = useCallback(() => {
    setCateModal((state) => ({ ...state, showRecycle: true }))
  }, [])
  const onMove = useCallback(() => {
    setCateModal((state) => ({ ...state, showMove: true }))
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

function CateHeaderLeft() {
  return <Space className="header-left"></Space>
}

function CateHeader() {
  return (
    <p className="article-header">
      <CateHeaderLeft />
      <CateHeaderRight />
    </p>
  )
}

function CateTable() {
  const queryClient = useQueryClient()
  const setCateRecoilForm = useSetRecoilState(cateFormAtom)
  const setCateModal = useSetRecoilState(cateModalAtom)
  const cateTree = useRecoilValue(cateTreeAtom)
  const [expandedKeys, setExpandedKeys] = useRecoilState(cateExpandedKeysAtom)

  const onExpand = (expand: boolean, item: Cate) => {
    if (expand) {
      setExpandedKeys((keys) => [...keys, item.name + item.id])
    } else {
      setExpandedKeys((keys) =>
        keys.filter((key) => key !== item.name + item.id),
      )
    }
  }
  const onEdit = useCallback(
    (item: Cate) => {
      const _item = _.cloneDeep<Cate>(item)
      setCateRecoilForm(_item)
      setCateModal((status) => ({
        ...status,
        showForm: true,
      }))
    },
    [setCateRecoilForm, cateTree],
  )
  const onDel = useCallback(async (item: Cate) => {
    await delCate({ id: item.id })
    message.success('删除成功')
    queryClient.invalidateQueries(['cateList'])
  }, [])
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '父级目录',
      dataIndex: 'parentId',
      key: 'parentId',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updateAt',
    },
    {
      title: '文章数量',
      key: 'cate',
      render() {
        return 0
      },
    },
    {
      title: '操作',
      key: 'operation',
      render(item: Cate) {
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

  const rowSelection: TableRowSelection<Cate> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      )
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows)
    },
  }
  return (
    <div className="article-table">
      <Table
        columns={columns}
        dataSource={cateTree}
        rowKey={(item) => item.name + item.id}
        rowSelection={{ ...rowSelection, checkStrictly: false }}
        expandedRowKeys={expandedKeys}
        onExpand={onExpand}
      />
    </div>
  )
}

export default CateManage
