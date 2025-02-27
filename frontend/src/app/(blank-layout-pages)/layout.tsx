// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import AppMapProvider from '@/@core/components/CsMap/MapLoader'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

type Props = ChildrenType

const Layout = ({ children }: Props) => {
  // Vars
  const systemMode = getSystemMode()

  return (
    <Providers>
      <BlankLayout systemMode={systemMode}>
        <AppMapProvider>
          {children}
        </AppMapProvider>
      </BlankLayout>
    </Providers>
  )
}

export default Layout
