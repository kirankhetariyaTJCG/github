'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import { ApexOptions } from 'apexcharts'

// Custom Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const RankingView = () => {
  // Hooks
  const theme = useTheme()

  const series = [
    { name: 'Visits', data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375] },
    { name: 'Visitors', data: [50, 150, 50, 150, 10, 200, 190, 220, 200, 185, 215, 300, 375] }
  ]

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
      }
    },
    tooltip: { shared: false },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    colors: [theme.palette.info.main, theme.palette.primary.main],
    fill: { opacity: 1, type: 'solid' },
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
    <Card sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ p: 4, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Google Ranking</Typography>
      </Box>
      <AppReactApexCharts type='line' width='100%' height={490} options={options} series={series} />
    </Card>
  )
}

export default RankingView
