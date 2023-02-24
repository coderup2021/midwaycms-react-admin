import { Button } from 'antd'
import AntdProvider from 'src/providers/AntdProvider'
import Router from 'src/route/Router'
import { HashRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import './App.scss'

function App() {
  return (
    <RecoilRoot>
      <AntdProvider>
        <HashRouter>
          <Router />
        </HashRouter>
      </AntdProvider>
    </RecoilRoot>
  )
}

export default App
