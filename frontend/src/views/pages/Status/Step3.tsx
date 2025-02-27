// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

// Icon Imports
import Icon from '@/@core/components/Icon'

const Step3 = () => {
  const arr = [
    'Maximum visitors to order conversion',
    'Mobile optimized',
    'Great speed performance',
    'Search engine optimized',
    'SSL security added'
  ]

  return (
    <Grid container spacing={4} sx={{ width: '100%', m: 0 }}>
      <Grid item xs={12} sm={6}>
        <Typography sx={{ fontWeight: 700 }}>Preview Your Sales Optimized Website</Typography>
        <Typography sx={{ fontWeight: 700, my: 4 }}>
          We’ve generated a brand new website for your restaurant. From content to search engine optimizations, it’s all
          taken care of.
        </Typography>
        <Box sx={{ my: 4 }}>
          {Array.isArray(arr) &&
            arr?.length > 0 &&
            arr?.map((item: any, index: number) => {
              return (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    component={Icon}
                    icon={'icon-park-solid:check-one'}
                    sx={{ color: theme => theme.palette.success.main, mr: 4, fontSize: 20 }}
                  />
                  <Typography sx={{ fontSize: '0.9rem' }}>{item}</Typography>
                </Box>
              )
            })}
        </Box>
        <Divider sx={{ my: 6 }} />
        <Typography sx={{ fontWeight: 500 }}>
          Connect your domain (nento.com) to attract more online customers and get an edge over the competition
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box
          component={'iframe'}
          src='https://1roos.com/en/setup/services/delivery'
          sx={{
            width: '100%',
            height: '100%',
            border: theme => `1px solid ${theme.palette.divider}`,
            borderRadius: '6px'
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Step3
