import React, { FC, useCallback, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Button, Form, Input, Select, Space } from 'antd'
import './article.scss'
import WangEditor from './WangEditor'
import { useSetRecoilState } from 'recoil'
import { articleModalAtom } from 'src/recoil/articleAtom'
const { useForm } = Form
const { Option } = Select

type Editor = 'md' | 'wang'

const ArticleForm = () => {
  const [editor, setEditor] = useState<Editor>('md')
  const setArticleModal = useSetRecoilState(articleModalAtom)
  const [form] = useForm()
  const onFinish = (value: any) => {
    console.log('value', value)
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
        initialValues={{ article: '# hhiiiihh', title: '' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        form={form}
      >
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
          name="article"
          rules={[{ required: true, message: '内容不能为空哦' }]}
        >
          {editor === 'md' && (
            <MDEditor
              height={800}
              value={form.getFieldValue('article')}
              onChange={(value) => form.setFieldValue('article', value || '')}
              style={{ backgroundColor: 'fff' }}
            />
          )}
          {editor === 'wang' && (
            <WangEditor
              content={form.getFieldValue('article')}
              onChange={(value) => form.setFieldValue('article', value)}
            />
          )}
        </Form.Item>

        <Form.Item label="标签" name="tags" wrapperCol={{ span: 16 }}>
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
