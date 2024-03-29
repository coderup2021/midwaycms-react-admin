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
import CateManage from 'src/pages/CateManage'

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
    key: '/',
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
        key: 'articleManage',
        titleKey: 'articleManage',
        link: 'article-manage',
        component: ArticleList,
        icon: <UnorderedListOutlined />,
      },
      {
        key: 'cateManage',
        titleKey: 'cateManage',
        link: 'cate-manage',
        component: CateManage,
        icon: <FormOutlined />,
      },
      {
        key: 'tagManage',
        titleKey: 'tagManage',
        link: 'tag-manage',
        component: ArticleForm,
        icon: <FormOutlined />,
      },
      {
        key: 'messageManage',
        titleKey: 'messageManage',
        link: 'message-manage',
        component: ArticleForm,
        icon: <FormOutlined />,
      },
    ],
  },
  {
    key: 'setting',
    titleKey: 'systemSetting',
    link: '/setting',
    component: Setting,
    icon: <SettingOutlined />,
  },
]
