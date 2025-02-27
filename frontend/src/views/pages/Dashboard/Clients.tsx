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

const Clients = () => {
  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    legend: { show: false },
    stroke: { width: 5, colors: [theme.palette.background.paper] },
    colors: [theme.palette.info.main, theme.palette.primary.main, theme.palette.warning.main],
    labels: [`${new Date().getFullYear()}`, `${new Date().getFullYear() - 1}`, `${new Date().getFullYear() - 2}`],
    tooltip: { y: { formatter: (val: number) => `${val}%` } },
    dataLabels: { enabled: false },
    states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: false },
            total: {
              label: '',
              show: true,
              fontWeight: 600,
              fontSize: '1rem',
              color: 'rgba(38, 43, 67, 0.7)',
              formatter: val => (typeof val === 'string' ? `${val}%` : '12%')
            },
            value: {
              offsetY: 6,
              fontWeight: 600,
              fontSize: '0.9375rem',
              formatter: val => `${val}%`,
              color: 'rgba(38, 43, 67, 0.9)'
            }
          }
        }
      }
    },
    responsive: [
      { breakpoint: 1309, options: { plotOptions: { pie: { offsetY: 20 } } } },
      { breakpoint: 900, options: { plotOptions: { pie: { offsetY: 0 } } } },
      { breakpoint: theme.breakpoints.values.sm, options: { chart: { height: 165 } } }
    ]
  }

  const series = [35, 30, 23]

  return (
    <>
      <Card sx={{ my: 5, p: 4, '&:hover .Btn': { opacity: 1 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', ml: 2 }}>Clients</Typography>
          </Box>
          <IconButton
            color='secondary'
            className='Btn'
            sx={{
              bgcolor: theme => theme.palette.secondary.lightOpacity,
              opacity: 0,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <Icon icon={'grommet-icons:share-rounded'} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mr: 3 }}>
            <Box
              sx={{ width: '1rem', height: '1rem', borderRadius: '50%', bgcolor: theme => theme.palette.warning.main }}
            />
            <Typography sx={{ fontWeight: 500, ml: 2, fontSize: '0.8rem' }}>Last 3 Years</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mr: 3 }}>
            <Box
              sx={{ width: '1rem', height: '1rem', borderRadius: '50%', bgcolor: theme => theme.palette.info.main }}
            />
            <Typography sx={{ fontWeight: 500, ml: 2, fontSize: '0.8rem' }}>New Clients</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mr: 3 }}>
            <Box
              sx={{ width: '1rem', height: '1rem', borderRadius: '50%', bgcolor: theme => theme.palette.primary.main }}
            />
            <Typography sx={{ fontWeight: 500, ml: 2, fontSize: '0.8rem' }}>Last 7 Days</Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Box sx={{ my: 1.1 }}>
          <AppReactApexCharts type='donut' height={400} options={options} series={series} />
        </Box>
      </Card>
    </>
  )
}

export default Clients
