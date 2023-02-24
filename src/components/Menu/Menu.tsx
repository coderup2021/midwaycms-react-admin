import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Menu } from 'antd'
import { theme } from 'antd'
import { MenuProp, routesData } from 'src/route/routesData'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { getAbsoluteLink, getKeyByLink, getOpenedKeys } from './utils'
import './menu.scss'

const { useToken } = theme

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

function getItemLabel(menu: MenuProp, routesData: MenuProp[]) {
  if (menu.children) {
    return menu.titleKey
  } else {
    return <Link to={getAbsoluteLink(menu, routesData)}>{menu.titleKey}</Link>
  }
}

function getItems(routes: MenuProp[]): MenuItem[] {
  return routes.map((menu: MenuProp) => {
    const children = menu.children || undefined
    return getItem(
      getItemLabel(menu, routesData),
      menu.key,
      menu.icon || '',
      children && getItems(children),
    )
  })
}

const MenuComp: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { token } = useToken()
  const { pathname } = useLocation()
  const [selectedKeys, setSelectedKeys] = useState(['/'])
  const [openedKeys, setOpenedKeys] = useState<string[]>([])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  //TODO Multi Skin
  const style = useMemo(
    () => ({
      //   color: token.colorText,
      //   backgroundColor: token.colorBgContainer,
      height: '100%',
    }),
    [token],
  )
  const items = getItems(routesData)

  useEffect(() => {
    const key = getKeyByLink(pathname, routesData)
    const keys = getOpenedKeys(pathname, routesData)
    setOpenedKeys(keys)
    setSelectedKeys([key || '/'])
  }, [pathname])

  return (
    <div>
      <Button type="primary" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        selectedKeys={selectedKeys}
        openKeys={openedKeys}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        className="midway-menu"
        onOpenChange={(item) => setOpenedKeys(item)}
      />
    </div>
  )
}

export default MenuComp
