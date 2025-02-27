// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

type Params = {
  [key: string]: string | string[]
}

const verticalMenuData = (params: Params): VerticalMenuDataType[] => [
  // This is how you will normally render submenu
  {
    label: 'navigation',
    icon: 'ri-home-smile-line'
  },

  // This is how you will normally render menu section
  {
    label: 'navigation',
    isSection: true
  }
]

export default verticalMenuData
