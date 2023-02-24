import React, { useMemo } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Menu from 'src/components/Menu'
import { theme } from 'antd'
import { Header, Footer, Content, Sider } from './'
import './layout.scss'
import Logo from 'src/components/Logo/Logo'
import Bread from 'src/components/Bread/Bread'

const { useToken } = theme

const Layout = () => {
  const { token } = useToken()
  const style = useMemo(
    () => ({
      layoutBack: {
        backgroundColor: token.colorBgLayout,
      },
      siderBack: {
        backgroundColor: token.colorBgContainer,
      },
    }),
    [token],
  )
  return (
    <section className="app-layout" style={style.layoutBack}>
      <Sider className="sider" style={style.siderBack}>
        <Logo />
        <Menu />
      </Sider>
      <section className="main">
        <Header className="header">
          <Bread />
        </Header>
        <Content className="content">
          <Outlet />
        </Content>
        <Footer className="footer">Footer</Footer>
      </section>
    </section>
  )
}

export default Layout
