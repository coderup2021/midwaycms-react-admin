import React, { FC, PropsWithChildren } from 'react'

const Content: FC<PropsWithChildren<{ className: string }>> = ({
  children,
  ...props
}) => {
  return <main {...props}>{children}</main>
}

export default Content
