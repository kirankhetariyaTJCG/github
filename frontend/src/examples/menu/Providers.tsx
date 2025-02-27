// Type Imports
import type { ChildrenType } from '@core/types'

// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import ThemeProvider from './ThemeProvider'

const MenuExampleProviders = (props: ChildrenType) => {
  // Props
  const { children } = props

  return (
    <VerticalNavProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </VerticalNavProvider>
  )
}

export default MenuExampleProviders
