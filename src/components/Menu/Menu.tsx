import React, { useMemo, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Menu } from 'antd'
import { theme } from 'antd'
import './menu.scss'
import { MenuProp, routesData } from 'src/route/routesData'
import { Link } from 'react-router-dom'

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

function getAbsoluteLink(menu: MenuProp, routesData: MenuProp[]) {
  const path: string[] = []
  let flag = false
  function search(menu: MenuProp, routeData: MenuProp[]) {
    for (let i = 0; i < routeData.length; i++) {
      if (flag) return
      const item = routeData[i]
      if (item.key === menu.key) {
        flag = true
        path.unshift(item.link)
        return
      } else if (item.children && item.children.length > 0) {
        search(menu, item.children)
      }
      if (flag) path.unshift(item.link)
    }
  }
  search(menu, routesData)
  return path.join('')
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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const style = useMemo(
    () => ({
      color: token.colorText,
      backgroundColor: token.colorBgContainer,
    }),
    [token],
  )
  const items = getItems(routesData)

  return (
    <div>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['home']}
        defaultOpenKeys={[]}
        mode="inline"
        theme="dark"
        style={style}
        inlineCollapsed={collapsed}
        items={items}
        className="midway-menu"
      />
    </div>
  )
}

export default MenuComp
