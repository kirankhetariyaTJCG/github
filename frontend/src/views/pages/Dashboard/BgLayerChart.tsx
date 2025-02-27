// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import { ApexOptions } from 'apexcharts'

// Custom Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const BgLayerChart = (props: { color?: string; arr?: number[] }) => {
  // Props
  const { arr = [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 220], color = '' } = props
  // Hooks
  const theme = useTheme()

  const series = [{ name: 'Visits', data: arr }]

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      height: 350,
      type: 'area',
      zoom: { enabled: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 1 },
    colors: [color || theme.palette.primary.main],
    fill: { opacity: 0.5 },
    xaxis: {
      axisBorder: { show: false },
      labels: { show: false },
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
    },
    yaxis: { show: false },
    grid: { show: false }
  }

  return (
    <Box sx={{ position: 'absolute', width: '110%', right: -10, p: 0, opacity: 0.4, bottom: -30 }}>
      <AppReactApexCharts type='area' width='100%' height={200} options={options} series={series} />
    </Box>
  )
}

export default BgLayerChart
