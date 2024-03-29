import React, { useState, useEffect, FC } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

// 初始化 MENU_CONF 属性
const editorConfig: Partial<IEditorConfig> = {
  // TS 语法
  // const editorConfig = {                       // JS 语法
  MENU_CONF: {},

  // 其他属性...
}

// 文字颜色
if (editorConfig.MENU_CONF) {
  editorConfig.MENU_CONF['color'] = {
    colors: ['#000', '#333', '#666'],
  }
  // 背景色
  editorConfig.MENU_CONF['bgColor'] = {
    colors: ['#000', '#333', '#666'],
  }
}

interface WangEditorProps {
  content: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}
const WangEditor: FC<WangEditorProps> = ({ content, onChange }) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  // 编辑器内容
  //   const [html, setHtml] = useState('<p>hello</p>')

  // 模拟 ajax 请求，异步设置 html
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setHtml('<p>hello world</p>')
  //     }, 1500)
  //   }, [])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {} // TS 语法
  // const toolbarConfig = { }                        // JS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={content}
          onCreated={setEditor}
          onChange={(editor) => onChange(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
      {/* <div style={{ marginTop: '15px' }}>{html}</div> */}
    </>
  )
}

export default WangEditor
