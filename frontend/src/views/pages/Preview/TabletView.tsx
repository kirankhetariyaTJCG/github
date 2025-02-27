// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// Third Party Imports
import { useLocation } from 'react-use'

// Custom Imports
import CsTabletFrame from '@/@core/components/CsTabletFrame'

const TabletView = () => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Hooks
  const location = useLocation()

  return (
    <CsTabletFrame
      content={
        <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
          <Box
            sx={{
              display: isLoading ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              height: '100%'
            }}
          >
            <CircularProgress />
            <Typography sx={{ mt: 2, fontSize: '1rem', fontWeight: 600 }}>Loading...</Typography>
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
  )
}

export default TabletView
