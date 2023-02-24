import { atom } from 'recoil'
import { ArticleDetail } from 'src/interface'

interface ArticleModalAtom {
  showForm: boolean
  showRecycle: boolean
  showMove: boolean
}
export const articleModalAtom = atom<ArticleModalAtom>({
  key: 'articleModalAtom',
  default: {
    showForm: false,
    showRecycle: false,
    showMove: false,
  },
})

export const articleListAtom = atom<ArticleDetail[]>({
  key: 'articleListAtom',
  default: [],
})

export const articleFormAtom = atom<Partial<ArticleDetail>>({
  key: 'articleFormAtom',
  default: {},
})
