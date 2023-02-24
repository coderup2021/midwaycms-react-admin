import { Select } from 'antd'
import './langSwitch.scss'
import { useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { lngAtom } from 'src/recoil/atom'

const { Option } = Select

interface Lang {
  name: string
  value: string
}
const supportedLangs: Lang[] = [
  { name: '简体中文', value: 'zh-CN' },
  {
    name: '英语',
    value: 'en',
  },
]

const LangSwitch = () => {
  const [lng, setLng] = useRecoilState(lngAtom)
  const onChange = useCallback((lng: string) => {
    setLng(lng)
  }, [])
  return (
    <Select className="lang-switch" onChange={onChange} value={lng}>
      {supportedLangs.map((lang) => (
        <Option key={lang.value} value={lang.value}>
          {lang.name}
        </Option>
      ))}
    </Select>
  )
}

export default LangSwitch
