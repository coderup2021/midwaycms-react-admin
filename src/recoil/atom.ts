import { atom } from 'recoil'
import { MenuProp } from 'src/route/routesData'

export interface MenuState {
  secondMenus: MenuProp[]
  menus: MenuProp[]
}

export const menuStateAtom = atom<MenuState>({
  key: 'menuState',
  default: {
    secondMenus: [],
    menus: [],
  },
})

export const menuFoldAtom = atom<boolean>({
  key: 'menuFoldAtom',
  default: true,
})
