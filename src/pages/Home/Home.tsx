import React from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Button type="primary">hello, </Button>
      {t('articleList')}
    </div>
  )
}

export default Home
