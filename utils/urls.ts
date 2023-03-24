import { MENU } from "../config"

export const getURLAyat = (ayat: number) => {
  if (typeof window !== 'undefined') return `${MENU.ODOA}/${ayat}`
  else return '/'
}