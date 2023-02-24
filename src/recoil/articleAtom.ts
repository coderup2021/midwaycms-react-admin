import { atom } from 'recoil'

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
