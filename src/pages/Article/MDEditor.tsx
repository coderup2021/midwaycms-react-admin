import React, { useState, useEffect, FC, useCallback } from 'react'
import MDEditor, { MDEditorProps } from '@uiw/react-md-editor'

interface MDEditorWrapperProps extends MDEditorProps {
  defaultContent: string
}

const MDEditorWrapper: FC<MDEditorWrapperProps> = ({
  defaultContent,
  onChange,
}) => {
  const [content, setContent] = useState('')
  useEffect(() => {
    setContent(defaultContent)
  }, [defaultContent])

  const _onChange = useCallback((value: string | undefined) => {
    setContent(value || '')
    onChange && onChange(value)
  }, [])

  return (
    <MDEditor
      height={800}
      value={content}
      onChange={_onChange}
      style={{ backgroundColor: 'fff' }}
    />
  )
}

export default MDEditorWrapper
