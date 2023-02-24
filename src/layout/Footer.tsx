import React, { FC, PropsWithChildren } from 'react'

const Footer: FC<PropsWithChildren<{ className: string }>> = ({
  children,
  ...props
}) => {
  return <footer {...props}>{children}</footer>
}

export default Footer
