import React, { FC, PropsWithChildren } from 'react'

const Container: FC<PropsWithChildren<React.HTMLAttributes<HTMLElement>>> = ({
  children,
  ...props
}) => {
  return <section {...props}>{children}</section>
}

export default Container
