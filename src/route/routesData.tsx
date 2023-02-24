import { FC } from 'react'
import Home from '../pages/Home'
import ArticleList from '../pages/Article/ArticleList'
import ArticleForm from '../pages/Article/ArticleForm'
import Setting from '../pages/Setting'
import {
  UnorderedListOutlined,
  HomeOutlined,
  SettingOutlined,
  FormOutlined,
  FileTextOutlined,
} from '@ant-design/icons'

export interface MenuProp {
  index?: boolean
  key: string
  titleKey: string
  pic?: string
  link: string
  children?: MenuProp[]
  component?: FC
  icon?: React.ReactNode
}

export const routesData: MenuProp[] = [
  {
    index: true,
    key: 'home',
    titleKey: 'home',
    link: '/',
    icon: <HomeOutlined />,
    component: Home,
  },
  {
    key: 'article',
    titleKey: 'article',
    link: '/article/',
    icon: <FileTextOutlined />,
    children: [
      {
        key: 'articleList',
        titleKey: 'articleList',
        link: 'list',
        component: ArticleList,
        icon: <UnorderedListOutlined />,
      },
      {
        key: 'articleForm',
        titleKey: 'articleForm',
        link: 'form',
        component: ArticleForm,
        icon: <FormOutlined />,
      },
    ],
  },
  {
    key: 'setting',
    titleKey: 'setting',
    link: '/setting',
    component: Setting,
    icon: <SettingOutlined />,
  },
]
