// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'

// Icon Imports
import Icon from '@/@core/components/Icon'

const OnlineSales = () => {
  const arr = [
    { label: 'Increase website visits', btnText: 'I want more visitors', icon: 'hugeicons:touch-interaction-01' },
    { label: 'Convince more people to order', btnText: 'I want more orders', icon: 'humbleicons:cart' },
    {
      label: 'Increase the number of returning clients',
      btnText: 'I want returning clients',
      icon: 'humbleicons:refresh'
    }
  ]

  return (
    <Card>
      <Box sx={{ p: 4, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
        <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
          You have 3 opportunities to increase your online sales
        </Typography>
      </Box>
      <Grid container columnSpacing={4} sx={{ width: '100%', m: 0, p: 4 }}>
        {Array.isArray(arr) &&
          arr?.length > 0 &&
          arr?.map((item: any, index) => {
            return (
              <Grid
                key={index}
                item
                xs={12}
                sm={4}
                sx={{
                  pl: { xs: '0 !important', sm: index === 0 ? '0 !important' : '1rem !important' },
                  pt: { xs: 4, sm: 0 }
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    border: theme => `2px dashed ${theme.palette.divider}`,
                    borderRadius: '8px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: theme => theme.palette.primary.lightOpacity,
                      width: 'max-content',
                      display: 'flex',
                      mx: 'auto'
                    }}
                  >
                    <Box
                      component={Icon}
                      icon={item?.icon}
                      sx={{ color: theme => theme.palette.primary.main, fontSize: 35 }}
                    />
                  </Box>
                  <Typography sx={{ my: 4, fontWeight: 500 }}>{item?.label}</Typography>
                  <LoadingButton sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}>
                    {item?.btnText}
                  </LoadingButton>
                </Box>
              </Grid>
            )
          })}
      </Grid>
    </Card>
  )
}

export default OnlineSales
