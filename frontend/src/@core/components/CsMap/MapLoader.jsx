'use client'

// React Imports
import { memo } from 'react'

// MUI Imports
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Third Party Imports
import { LoadScript } from '@react-google-maps/api'

const DEFAULT_LIBRARIES = ['places', 'drawing']

const AppMapProvider = ({ children }) => {
  return (
    <LoadScript
      id='google-map-script'
      libraries={DEFAULT_LIBRARIES}
      googleMapsApiKey='AIzaSyAg1DPUqnLyuFzwZBshW75XAq-8hIHH66g'
      loadingElement={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            borderRadius: '8px'
          }}
        >
          <CircularProgress />
          <Typography sx={{ fontWeight: 600, mt: 2 }}>Loading...</Typography>
        </Box>
      }
    >
      {children}
    </LoadScript>
  )
}

export default memo(AppMapProvider)
