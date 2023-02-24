import { atom } from 'recoil'
import { Cate, IdNameMapProps } from 'src/interface'

interface CateModalAtom {
  showForm: boolean
  showRecycle: boolean
  showMove: boolean
}
export const cateModalAtom = atom<CateModalAtom>({
  key: 'cateModalAtom',
  default: {
    showForm: false,
    showRecycle: false,
    showMove: false,
  },
})

export const cateListAtom = atom<Cate[]>({
  key: 'cateListAtom',
  default: [],
})

export const cateTreeAtom = atom<Cate[]>({
  key: 'cateTreeAtom',
  default: [],
})

export const cateExpandedKeysAtom = atom<string[]>({
  key: 'cateExpandedKeysAtom',
  default: [],
})

export const cateIdNameMapAtom = atom<IdNameMapProps>({
  key: 'cateIdNameMapAtom',
  default: {},
})

export const cateFormAtom = atom<Partial<Cate>>({
  key: 'cateFormAtom',
  default: {},
})
