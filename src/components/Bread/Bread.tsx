import React, { useCallback } from 'react'
import { useLinkClickHandler, useLocation } from 'react-router-dom'
import { getAbsoluteLink } from 'src/components/Menu/utils'
import { routesData } from 'src/route/routesData'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useRecoilState } from 'recoil'
import { menuFoldAtom } from 'src/recoil/atom'
import './bread.scss'

const Bread = () => {
  const [menuFold, setMenuFold] = useRecoilState(menuFoldAtom)
  const { pathname } = useLocation()
  const paths = pathname.split('/')
  const tailPath = paths.pop() as string
  const absolutePath = getAbsoluteLink(tailPath, routesData)
  const foldMenu = useCallback(() => {
    setMenuFold(true)
  }, [])
  const unfoldMenu = useCallback(() => {
    setMenuFold(false)
  }, [])
  return (
    <>
      <span className="toggle-icon">
        {menuFold ? (
          <MenuUnfoldOutlined onClick={unfoldMenu} />
        ) : (
          <MenuFoldOutlined onClick={foldMenu} />
        )}
      </span>
      <span className="path">{absolutePath}</span>
    </>
  )
}
export default Bread
