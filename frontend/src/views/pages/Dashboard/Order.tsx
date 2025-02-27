// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

// Third party Imports
import { ApexOptions } from 'apexcharts'

// Custom Imports
import CustomAvatar from '@/@core/components/mui/Avatar'
import Sales from './Sales'
import BgLayerChart from './BgLayerChart'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const Orders = () => {
  // Hooks
  const theme = useTheme()

  const series = [{ data: [12, 12, 18, 18, 13, 13, 5, 5, 17, 17, 25, 25] }]

  const options: ApexOptions = {
    chart: {
      zoom: { enabled: false },
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        top: 9,
        blur: 4,
        left: 0,
        enabled: true,
        opacity: 0.18,
        color: theme.palette.error.main
      }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: { width: 4, lineCap: 'round' },
    colors: [theme.palette.error.main],
    grid: { show: false, padding: { top: -27, left: 7, right: 7, bottom: 9 } },
    xaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false }
  }

  return (
    <>
      <Grid container spacing={6}>
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              p: 4,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              '&:hover .Btn': { opacity: 1 }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CustomAvatar color='success' skin='light' variant='rounded'>
                  <Icon icon={'fluent:task-list-square-rtl-16-regular'} />
                </CustomAvatar>
                <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', ml: 2 }}>200</Typography>
              </Box>
              <IconButton
                color='success'
                className='Btn'
                sx={{
                  bgcolor: theme.palette.success.lightOpacity,
                  opacity: 0,
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <Icon icon={'grommet-icons:share-rounded'} />
              </IconButton>
            </Box>
            <BgLayerChart
              color={theme.palette.success.main}
              arr={[50, 100, 85, 160, 135, 150, 145, 230, 140, 100, 260, 290, 365]}
            />
            <Typography sx={{ fontWeight: 600, fontSize: '1.2rem', mb: 2 }}>Total Orders</Typography>
            <Typography color={'error'}>0.55% -</Typography>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              p: 4,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              '&:hover .Btn': { opacity: 1 }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CustomAvatar color='info' skin='light' variant='rounded'>
                  <Icon icon={'ci:calendar-check'} />
                </CustomAvatar>
                <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', ml: 2 }}>200</Typography>
              </Box>
              <IconButton
                color='info'
                className='Btn'
                sx={{
                  bgcolor: theme.palette.info.lightOpacity,
                  opacity: 0,
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <Icon icon={'grommet-icons:share-rounded'} />
              </IconButton>
            </Box>
            <BgLayerChart
              color={theme.palette.info.main}
              arr={[95, 125, 100, 175, 140, 155, 135, 250, 225, 170, 280, 275, 380]}
            />
            <Typography sx={{ fontWeight: 600, fontSize: '1.2rem', mb: 2 }}>Total Reservations</Typography>
            <Typography sx={{ color: theme.palette.success.dark }}>12.09% +</Typography>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 4, position: 'relative', height: '100%', '&:hover .Btn': { opacity: 1 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className='flex flex-wrap items-center gap-1'>
                <Typography fontSize={'1.3rem'} fontWeight={800}>
                  $10.5 M
                </Typography>
                <Typography color='error'>-18%</Typography>
              </div>
              <IconButton
                color='error'
                className='Btn'
                sx={{
                  bgcolor: theme.palette.error.lightOpacity,
                  opacity: 0,
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <Icon icon={'grommet-icons:share-rounded'} />
              </IconButton>
            </Box>
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', mb: 2 }}>Total Profits</Typography>
            <Box>
              <AppReactApexCharts type='line' height={70} width='100%' options={options} series={series} />
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Sales />
    </>
  )
}

export default Orders
