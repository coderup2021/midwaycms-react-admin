import { Button } from 'antd'
import AntdProvider from 'src/providers/AntdProvider'
import Router from 'src/route/Router'
import { HashRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import './App.scss'
import I18nProvider from './providers/I18nProvider'
import QueryProvider from './providers/QueryProvider'

function App() {
  return (
    <RecoilRoot>
      <QueryProvider>
        <I18nProvider>
          <AntdProvider>
            <HashRouter>
              <Router />
            </HashRouter>
          </AntdProvider>
        </I18nProvider>
      </QueryProvider>
    </RecoilRoot>
  )
}

export default App
