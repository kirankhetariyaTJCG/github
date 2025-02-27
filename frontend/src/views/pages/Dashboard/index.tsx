'use client'

// MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// Custom Imports
import Orders from './Order'
import Ranking from './Ranking'
import OnlineSales from './OnlineSales'

const DashboardView = () => {
  return (
    <>
      <Box>
        <Box sx={{ overflow: 'auto', height: 'calc(100vh - 5.5rem)', px: 4 }}>
          <Grid container sx={{ width: '100%', m: 0 }} spacing={1}>
            <Grid item xs={12} sm={8} sx={{ pl: '0 !important' }}>
              <Orders />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ pl: { xs: '0 !important', sm: '1.5rem !important' } }}>
              <Ranking />
            </Grid>
            <Grid item xs={12} sx={{ pl: '0 !important' }}>
              <OnlineSales />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default DashboardView
