'use client'

// Next Imports
import dynamic from 'next/dynamic'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import type { ApexOptions } from 'apexcharts'

// Custom Imports
import CustomTabList from '@/@core/components/mui/TabList'
import AppReactApexCharts from '@/libs/styles/AppReactApexCharts'

// Icon Imports
import Icon from '@/@core/components/Icon'

const labels = ['Development Apps', 'UI Design', 'IOS Application', 'Web App Wireframing', 'Prototyping']

const series = [
  {
    data: [
      {
        x: 'Jaqueline',
        y: [
          new Date(`${new Date().getFullYear()}-02-01`).getTime(),
          new Date(`${new Date().getFullYear()}-05-02`).getTime()
        ]
      },
      {
        x: 'Janelle',
        y: [
          new Date(`${new Date().getFullYear()}-03-18`).getTime(),
          new Date(`${new Date().getFullYear()}-07-2`).getTime()
        ]
      },
      {
        x: 'Wellington',
        y: [
          new Date(`${new Date().getFullYear()}-03-10`).getTime(),
          new Date(`${new Date().getFullYear()}-06-2`).getTime()
        ]
      },
      {
        x: 'Blake',
        y: [
          new Date(`${new Date().getFullYear()}-02-14`).getTime(),
          new Date(`${new Date().getFullYear()}-08-1`).getTime()
        ]
      },
      {
        x: 'Quinn',
        y: [
          new Date(`${new Date().getFullYear()}-05-01`).getTime(),
          new Date(`${new Date().getFullYear()}-08-1`).getTime()
        ]
      }
    ]
  }
]

const HealthView = () => {
  // State
  const [value, setValue] = useState<string>('0')
  const arr = [
    { label: 'Saturday', value: 0, date: 'August 03' },
    { label: 'Sunday', value: 0, date: 'August 04' },
    { label: 'Monday', value: 0, date: 'August 05' },
    { label: 'Tuesday', value: 0, date: 'August 06' },
    { label: 'Wednesday', value: 0, date: 'August 07' },
    { label: 'Thursday', value: 0, date: 'August 08' },
    { label: 'Friday', value: 0, date: 'August 09' }
  ]

  // Hooks
  const theme = useTheme()

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
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      x: { show: true, format: 'dd MMM' },
      y: { formatter: (val: any) => val, title: { formatter: seriesName => seriesName } }
    },
    plotOptions: { bar: { horizontal: true, borderRadius: 6, distributed: true, barHeight: 30 } },
    stroke: { width: 2, colors: [theme.palette.background.paper] },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
      theme.palette.warning.main
    ],
    dataLabels: {
      enabled: true,
      style: { fontSize: '0.8125rem', fontWeight: 500 },
      formatter: (val, opts) => labels[opts.dataPointIndex],
      offsetY: 5
    },
    states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
    legend: { show: false },
    grid: {
      strokeDashArray: 6,
      borderColor: 'rgba(38, 43, 67, 0.12)',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: { top: -22, left: 23, right: -5, bottom: -10 }
    },
    xaxis: {
      type: 'datetime',
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { style: { colors: 'rgba(38, 43, 67, 0.4)', fontSize: '13px' }, datetimeFormatter: { month: 'MMM' } }
    },
    yaxis: {
      labels: {
        show: true,
        align: 'left',
        style: { fontSize: '0.8125rem', colors: 'rgba(38, 43, 67, 0.9)' },
        offsetX: -35
      }
    },
    responsive: [
      {
        breakpoint: 465,
        options: {
          dataLabels: { style: { fontSize: '0.625rem' } },
          yaxis: { offsetX: -15 },
          grid: { padding: { left: 3, right: -5 } }
        }
      }
    ]
  }

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ p: 4, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Connectivity Health</Typography>
      </Box>
      <Box sx={{ p: 6 }}>
        <Box
          sx={{
            borderLeft: theme => `3px solid ${theme.palette.error.main}`,
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 4,
            p: 4,
            borderRadius: '0.5rem',
            mb: 6,
            bgcolor: theme => theme.palette.error.lighterOpacity
          }}
        >
          <Box sx={{ p: 2, borderRadius: '50%', bgcolor: theme => theme.palette.error.lightOpacity, display: 'flex' }}>
            <Box
              component={Icon}
              icon={'material-symbols-light:ecg-heart-sharp'}
              sx={{ color: theme => theme.palette.error.main, fontSize: 35 }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700 }}>0% Connectivity health (7 days)</Typography>
            <Typography sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
              This is the average connectivity health over the course of last 7 days combined. You should aim to have a
              score higher than 95%.
            </Typography>
          </Box>
        </Box>
        <TabContext value={value}>
          <CustomTabList
            onChange={(event: any, newValue: string) => setValue(newValue)}
            variant='scrollable'
            scrollButtons='auto'
            pill='true'
          >
            {Array.isArray(arr) &&
              arr?.length > 0 &&
              arr?.map((item: any, index: number) => {
                return <Tab key={index} value={index.toString()} label={item?.label} />
              })}
          </CustomTabList>
          <TabPanel value={value}>
            <AppReactApexCharts height={250} type='rangeBar' series={series} options={options} />
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  )
}

export default HealthView
