// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'

// Third Party Imports
import { useSelector } from 'react-redux'
import moment from 'moment'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const weekNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const OpeningHours = () => {

  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)
  const serviceScheduleData = useSelector((state: any) => state.service_schedules.serviceSchedules);

  // Media Query
  const md = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', p: { xs: 4, md: 6 }, mb: 16 }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/preview/opening_hours.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
          zIndex: 1,
          '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: AppUtils.hexToRgba(colorData?.main, 0.89),
            zIndex: 1
          }
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Container maxWidth='lg'>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '1.5rem', md: '2.875rem' },
                fontWeight: 600,
                color: '#fff',
                ...AppUtils.getFontFamily(fontType)
              }}
            >
              Opening Hours
            </Typography>
            <Divider sx={{ width: '8rem', bgcolor: '#fff', mx: 'auto', mt: 4 }} />
          </Box>
          <Box sx={{ mt: 8 }}>
            {Array.isArray(serviceScheduleData[0]?.hours) &&
              serviceScheduleData[0]?.hours?.length > 0 &&
              serviceScheduleData[0]?.hours?.map((hour: any, index: number) => {
                return (
                  <Grid container key={index} sx={{ mb: 4 }}>
                    <Grid item xs={6} md={1.5}>
                      <Typography
                        sx={{
                          color: '#fff',
                          fontSize: { xs: '0.9rem', md: '1.2rem' },
                          fontWeight: 500,
                          ...AppUtils.getFontFamily(fontType)
                        }}
                      >
                        {weekNames[hour?.day]}
                      </Typography>
                    </Grid>
                    {!md && (
                      <Grid item xs={12} sm={8}>
                        <Box sx={{ width: '100%', border: '1px dashed #fff', mt: 3.5 }} />
                      </Grid>
                    )}
                    <Grid item xs={6} md={2.5} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                      <Box>
                        {Array.isArray(hour?.hours) &&
                          hour?.hours?.length > 0 &&
                          hour?.hours?.map((hour: any, i: number) => {
                            return (
                              <Typography
                                key={i}
                                sx={{
                                  color: '#fff',
                                  fontSize: { xs: '0.9rem', md: '1.2rem' },
                                  fontWeight: 500,
                                  ...AppUtils.getFontFamily(fontType)
                                }}
                              >
                                {hour?.start_time
                                  ? moment(hour?.start_time).format('hh:mm A')
                                  : '--:--'}
                                {' - '}
                                {hour?.end_time
                                  ? moment(hour?.end_time).format('hh:mm A')
                                  : '--:--'}
                              </Typography>
                            )
                          })}
                      </Box>
                    </Grid>
                  </Grid>
                )
              })}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default OpeningHours
