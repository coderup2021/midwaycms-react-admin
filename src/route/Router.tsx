import { routesData, MenuProp } from './routesData'
import { Routes, Route } from 'react-router-dom'
import { FC, Suspense, useEffect, useState } from 'react'
import Layout from '../layout'

const getRoutes = (routesData: MenuProp[]) => {
  return routesData.map((menu) => {
    const { component } = menu
    const Component = component as FC
    if (menu.children && menu.children.length > 0) {
      return (
        <Route path={menu.link} key={menu.link}>
          {getRoutes(menu.children!)}
        </Route>
      )
    } else {
      return (
        <Route
          index={menu.index}
          path={menu.link}
          element={
            <Suspense>
              <Component />
            </Suspense>
          }
          key={menu.link}
        />
      )
    }
  })
}

const Router = () => {
  const [routes, setRoutes] = useState<any[]>([])
  useEffect(() => {
    const _routes = getRoutes(routesData)
    setRoutes(_routes)
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {[...routes]}
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}

export default Router

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
    </div>
  )
}
