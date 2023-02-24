import _ from 'lodash'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { getCateList } from 'src/http/api'
import { Cate } from 'src/interface'
import {
  cateListAtom,
  cateTreeAtom,
  cateIdNameMapAtom,
  cateExpandedKeysAtom,
} from 'src/recoil/cateAtom'
import { removeEmptyChildren, flatToTree, genIdNameProp } from 'src/utils'

export const useCateData = () => {
  const setCateList = useSetRecoilState(cateListAtom)
  const setCateTree = useSetRecoilState(cateTreeAtom)
  const setCateIdNameMap = useSetRecoilState(cateIdNameMapAtom)
  const setExpandedKeys = useSetRecoilState(cateExpandedKeysAtom)
  const { data, isSuccess } = useQuery('cateList', () =>
    getCateList().then((res) => res.data),
  )

  useEffect(() => {
    if (!isSuccess || !data) return
    const tmpData = _.cloneDeep(data)
    setCateList(tmpData)
    setCateTree(removeEmptyChildren(flatToTree(tmpData)))
    setCateIdNameMap(genIdNameProp(tmpData))
    setExpandedKeys(tmpData.map((item: Cate) => item.name + item.id))
  }, [isSuccess, data])
}
