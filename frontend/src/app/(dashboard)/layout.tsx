// MUI Imports
import Button from '@mui/material/Button'

// Type Imports
import type { ChildrenType } from '@core/types'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import ScrollToTop from '@core/components/scroll-to-top'
import AppMapProvider from '@/@core/components/CsMap/MapLoader'

// Util Imports
import { getMode, getSystemMode } from '@core/utils/serverHelpers'

// Icon Imports
import Icon from '@/@core/components/Icon'

const Layout = async ({ children }: ChildrenType) => {
  const mode = getMode()
  const systemMode = getSystemMode()

  return (
    <Providers>
      <AppMapProvider>
        <LayoutWrapper
          systemMode={systemMode}
          verticalLayout={
            <VerticalLayout navigation={<Navigation mode={mode} systemMode={systemMode} />} navbar={<Navbar />}>
              {children}
            </VerticalLayout>
          }
        />
      </AppMapProvider>
      <ScrollToTop className='mui-fixed'>
        <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
          <Icon icon={'ion:arrow-up-outline'} />
        </Button>
      </ScrollToTop>
    </Providers>
  )
}

export default Layout
