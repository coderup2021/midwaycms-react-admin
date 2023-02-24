import { useCallback, useEffect } from 'react'
import { Button, Form, Input, message, Space, TreeSelect } from 'antd'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cateFormAtom, cateModalAtom, cateTreeAtom } from 'src/recoil/cateAtom'
import { postCate, putCate } from 'src/http/api'
import { useQueryClient } from 'react-query'
import _ from 'lodash'
import { Cate } from 'src/interface'
import { addRootCate, getIdPath } from 'src/utils'
const { useForm } = Form

const CateForm = () => {
  const queryClient = useQueryClient()
  const cateRecoilForm = useRecoilValue(cateFormAtom)
  const setCateModal = useSetRecoilState(cateModalAtom)
  const cateTree = useRecoilValue(cateTreeAtom)
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue(cateRecoilForm)
  }, [cateRecoilForm, form])

  const onFinish = async (value: Cate) => {
    value = _.cloneDeep(value)
    value.path = getIdPath(value.parentId, cateTree)
    if (value.id) {
      await putCate(value)
    } else {
      await postCate(value)
    }
    if (value.id) {
      message.success('修改成功')
    } else {
      message.success('添加成功')
    }
    onCancel()
    form.resetFields()
    queryClient.invalidateQueries(['cateList'])
  }
  const onFinishFailed = () => {
    console.log('finish failed')
  }
  const onCancel = useCallback(() => {
    setCateModal((state) => ({
      ...state,
      showForm: false,
    }))
  }, [])
  return (
    <Form
      name="article"
      style={{ width: '100%' }}
      initialValues={{
        content: '# hhiiiihh',
        title: '',
        description: '',
        path: '',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      form={form}
    >
      <Form.Item name="id" hidden={true}>
        <Input />
      </Form.Item>
      <Form.Item
        label="标题"
        name="name"
        rules={[{ required: true, message: '名称不能为空哦' }]}
        wrapperCol={{ span: 16 }}
      >
        <Input />
      </Form.Item>

      <Form.Item label={'父级目录'} name="parentId">
        <TreeSelect
          treeDefaultExpandAll
          treeData={addRootCate(cateTree)}
          fieldNames={{ value: 'id', label: 'name' }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 2 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="default" onClick={onCancel}>
            取消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default CateForm
