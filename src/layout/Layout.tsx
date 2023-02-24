import React, { useMemo } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Menu from 'src/components/Menu'
import { theme } from 'antd'
import {
  Header,
  Footer,
  Content,
  Sider,
  Main,
  Container,
  HeaderLeft,
  HeaderRight,
} from './'
import './layout.scss'
import Logo from 'src/components/Logo/Logo'
import Bread from 'src/components/Bread/Bread'
import LangSwitch from 'src/components/LangSwitch'

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
    <Container className="app-layout" style={style.layoutBack}>
      <Header className="header">
        <HeaderLeft className="header-left">
          <Logo />
        </HeaderLeft>
        <HeaderRight className="header-right">
          <LangSwitch />
        </HeaderRight>
      </Header>
      <Main className="main">
        <Sider className="sider" style={style.siderBack}>
          <Menu />
        </Sider>
        <Main className="content">
          <Header className="bread">
            <Bread />
          </Header>
          <Content className="content-main">
            <Outlet />
          </Content>
          <Footer className="footer">Footer</Footer>
        </Main>
      </Main>
    </Container>
  )
}

export default Layout
