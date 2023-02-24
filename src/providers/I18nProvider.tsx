import React, { FC, useCallback, useEffect, useState } from 'react'
import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
import axios from 'axios'
import { Skeleton } from 'antd'
import { lngAtom } from 'src/recoil/atom'
import { useRecoilValue } from 'recoil'
import enData from 'src/../public/i18n/en.json'

const i18nDefaultNS = 'translation'

const I18nProvider: FC<React.HTMLAttributes<HTMLElement>> = ({ children }) => {
  const [loaded, setLoaded] = useState(false)
  const lng = useRecoilValue(lngAtom)
  const initI18n = useCallback(
    ({ lng, resources }: { lng: string; resources: Resource }) => {
      i18n.use(initReactI18next).init({
        debug: false,
        lng,
        resources,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
      })
    },
    [initReactI18next, i18n],
  )

  useEffect(() => {
    initI18n({
      lng: 'en',
      resources: { en: { translation: enData } },
    })
    setLoaded(true)
  }, [initI18n])

  useEffect(() => {
    if (!i18n.getResourceBundle(lng, i18nDefaultNS)) {
      axios
        .get(`/i18n/${lng}.json`)
        .then((data) => data.data)
        .then((data) =>
          i18n.addResourceBundle(lng, i18nDefaultNS, data).changeLanguage(lng),
        )
    } else {
      i18n.changeLanguage(lng)
    }
  }, [lng, initI18n, i18n])

  return (
    <Skeleton active loading={!loaded}>
      {children}
    </Skeleton>
  )
}

export default I18nProvider
