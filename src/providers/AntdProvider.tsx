import { FC, PropsWithChildren } from 'react'
import { ConfigProvider } from 'antd'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css'

dayjs.locale('zh-cn')

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          //   colorBgLayout: '#0F172A',
          //   colorBgContainer: '#13213C',
          //   colorText: 'rgba(255, 255, 255, 1)',
        },
      }}
      locale={zhCN}
    >
      {children}
    </ConfigProvider>
  )
}

export default AntdProvider
