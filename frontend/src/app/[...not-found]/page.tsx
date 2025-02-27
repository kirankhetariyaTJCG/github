// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@views/NotFound'

// Util Imports
import { getServerMode, getSystemMode } from '@core/utils/serverHelpers'

const NotFoundPage = () => {
  // Hooks
  const mode = getServerMode()
  const systemMode = getSystemMode()

  return (
    <Providers>
      <BlankLayout systemMode={systemMode}>
        <NotFound mode={mode} />
      </BlankLayout>
    </Providers>
  )
}

export default NotFoundPage
