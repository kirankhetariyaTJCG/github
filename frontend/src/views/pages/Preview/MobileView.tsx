// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// Third Party Imports
import { useLocation } from 'react-use'

// Custom Imports
import CsMobileFrame from '@/@core/components/CsMobileFrame'

const MobileView = () => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Hooks
  const location = useLocation()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <CsMobileFrame
        JSXContent={
          <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <Box
              sx={{
                display: isLoading ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flexDirection: 'column'
              }}
            >
              <CircularProgress />
              <Typography sx={{ mt: 2, fontWeight: 600, fontSize: '1rem' }}>Loading...</Typography>
            </Box>
            <Box
              component={'iframe'}
              src={`${location.href}`}
              onLoad={() => setIsLoading(false)}
              sx={{ width: '100%', height: '100%', border: 'none', display: isLoading ? 'none' : 'block' }}
            />
          </Box>
        }
      />
    </Box>
  )
}

export default MobileView
