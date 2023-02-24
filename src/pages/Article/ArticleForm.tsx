import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, message, Select, Space } from 'antd'
import './article.scss'
import WangEditor from './WangEditor'
import MDEditor from './MDEditor'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { articleFormAtom, articleModalAtom } from 'src/recoil/articleAtom'
import { postArticle, putArticle } from '../../http/api'
import { useQueryClient } from 'react-query'
const { useForm } = Form
const { Option } = Select
const { TextArea } = Input

type Editor = 'md' | 'wang'

const ArticleForm = () => {
  const [editor, setEditor] = useState<Editor>('md')
  const queryClient = useQueryClient()
  const articleRecoilForm = useRecoilValue(articleFormAtom)
  const setArticleModal = useSetRecoilState(articleModalAtom)
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue(articleRecoilForm)
  }, [articleRecoilForm, form])

  const onFinish = async (value: any) => {
    if (value.id) {
      await putArticle(value)
    } else {
      await postArticle(value)
    }
    if (value.id) {
      message.success('修改成功')
    } else {
      message.success('添加成功')
    }
    onCancel()
    queryClient.invalidateQueries(['articleList'])
  }
  const onFinishFailed = () => {}
  const onCancel = useCallback(() => {
    setArticleModal((state) => ({
      ...state,
      showForm: false,
    }))
  }, [])

  return (
    <div className="article-page">
      <Form
        name="article"
        style={{ width: '100%' }}
        initialValues={{ content: '# hhiiiihh', title: '', description: '' }}
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
          name="title"
          rules={[{ required: true, message: '标题不能为空哦' }]}
          wrapperCol={{ span: 16 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<ContentLabel editor={editor} setEditor={setEditor} />}
          name="content"
          rules={[{ required: true, message: '内容不能为空哦' }]}
        >
          {editor === 'md' && (
            <MDEditor
              height={800}
              onChange={(value) => {
                form.setFieldValue('content', value || '')
              }}
              style={{ backgroundColor: 'fff' }}
              defaultContent={articleRecoilForm.content || ''}
            />
          )}
          {editor === 'wang' && (
            <WangEditor
              content={form.getFieldValue('content')}
              onChange={(value) => form.setFieldValue('content', value)}
            />
          )}
        </Form.Item>

        <Form.Item label="描述" name="description" wrapperCol={{ span: 16 }}>
          <TextArea />
        </Form.Item>

        <Form.Item label="标签" name="tags" wrapperCol={{ span: 16 }} hidden>
          <Input />
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
    </div>
  )
}

interface ContentLabelProps {
  editor: Editor
  setEditor: React.Dispatch<React.SetStateAction<Editor>>
}
const ContentLabel: FC<ContentLabelProps> = ({ editor, setEditor }) => {
  //   const onChange = useCallback(() => {}, [])
  return (
    <>
      <span className="content-label">内容</span>
      <Select value={editor} onChange={setEditor} className="editor-selector">
        <Option key="full" value="wang">
          Wang富文本编辑器
        </Option>
        <Option key="md" value="md">
          Markdown编辑器
        </Option>
      </Select>
    </>
  )
}

export default ArticleForm
