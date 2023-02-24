import React, { FC, PropsWithChildren } from 'react'

const Header: FC<PropsWithChildren<React.HTMLAttributes<HTMLElement>>> = ({
  children,
  ...props
}) => {
  return <header {...props}>{children}</header>
}

export default Header
