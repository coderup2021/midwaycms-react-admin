import { MenuProp } from 'src/route/routesData'

export function getKeyByLink(path: string, routesData: MenuProp[]) {
  const pathArr = path.split('/')
  const tailPath = pathArr[pathArr.length - 1]
  function _getKeyByLink(link: string, routesData: MenuProp[]): string {
    for (let i = 0; i < routesData.length; i++) {
      const item = routesData[i]
      if (item.link.endsWith(link)) {
        return item.key
      } else if (item.children && item.children.length > 0) {
        const key = _getKeyByLink(link, item.children)
        if (key) return key
      }
    }
  }
  return _getKeyByLink(tailPath, routesData)
}

export function getAbsoluteLink(menu: MenuProp, routesData: MenuProp[]) {
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

export function getOpenedKeys(pathname: string, routesData: MenuProp[]) {
  const keys: string[] = []
  let flag = false
  const pathArr = pathname.split('/')
  const tailPath = pathArr[pathArr.length - 1]
  function search(tailPath: string, routeData: MenuProp[]) {
    if (flag) return
    for (let i = 0; i < routeData.length; i++) {
      const item = routeData[i]
      if (item.link.endsWith(tailPath)) {
        flag = true
        if (item.children && item.children.length > 0) keys.unshift(item.key)
        return
      } else if (item.children && item.children.length > 0) {
        search(tailPath, item.children)
      }
      if (flag) keys.unshift(item.key)
    }
  }
  search(tailPath, routesData)
  return keys
}
