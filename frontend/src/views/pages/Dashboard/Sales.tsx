// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import { ApexOptions } from 'apexcharts'

// Custom Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Icon Imports
import Icon from '@/@core/components/Icon'

const Sales = () => {
  // Hooks
  const theme = useTheme()

  const series = [{ name: 'Visits', data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375] }]

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
      height: 350,
      type: 'area'
    },
    tooltip: { shared: false },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    colors: [theme.palette.primary.main],
    fill: { opacity: 0.5, type: 'gradient' },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: 'rgba(38, 43, 67, 0.4)' },
      crosshairs: { stroke: { color: 'rgba(38, 43, 67, 0.4)' } },
      labels: { style: { colors: 'rgba(38, 43, 67, 0.4)', fontSize: '13px', fontWeight: 500 } },
      categories: [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
        '17/12',
        '18/12',
        '19/12'
      ]
    }
  }

  return (
    <Card sx={{ widht: '100%', my: 6, p: 4, '&:hover .Btn': { opacity: 1 } }}>
      {/* Top Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', ml: 2 }}>Sales (USD)</Typography>
        </Box>

        {/* Share Button with Hover Effect */}
        <IconButton
          color='primary'
          className='Btn'
          sx={{
            bgcolor: theme => theme.palette.primary.lightOpacity,
            '&:hover': { bgcolor: theme => theme.palette.primary.main, color: 'white' },
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <Icon icon={'grommet-icons:share-rounded'} />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        {/* Total Revenue */}
        <Box>
          <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>Total Revenue</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', color: theme => theme.palette.primary.main }}>
            10K
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Average Orders */}
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>Average Orders</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', color: theme => theme.palette.primary.main }}>
              1,000
            </Typography>
          </Box>

          {/* Not Sale */}
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>Not Sale</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', color: theme => theme.palette.primary.main }}>
              100
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mt: 4, mb: 1.6 }} />
      <AppReactApexCharts type='area' width='100%' height={442} options={options} series={series} />
    </Card>
  )
}

export default Sales
