import React, { FC, HTMLAttributes, useState } from 'react'

const InitProvider: FC<HTMLAttributes<HTMLElement>> = ({ children }) => {
  const [finished, setFinished] = useState(false)

  return <>{finished ? children : <div>初始化....</div>}</>
}

export default InitProvider
