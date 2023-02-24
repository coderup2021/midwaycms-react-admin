import React, { FC, PropsWithChildren } from 'react'

const Sider: FC<PropsWithChildren<React.HTMLAttributes<HTMLElement>>> = ({
  children,
  ...props
}) => {
  return <aside {...props}>{children}</aside>
}

export default Sider
