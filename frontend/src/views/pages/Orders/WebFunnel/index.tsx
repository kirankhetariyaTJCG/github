'use client'

// Next Imports
import dynamic from 'next/dynamic'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import type { ApexOptions } from 'apexcharts'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'
import CsDatePicker from '@/@core/components/CsDatePicker'
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const arr = [
  {
    label: 'Website visits',
    value: 0,
    percentage: 0,
    title: 'How to get more visitors',
    desc: 'Make it easy for clients to find your restaurant online. Also, spread the word offline by distributing flyers.',
    btnTxt: 'Increase website visits'
  },
  {
    label: 'Opened the menu / reservation form',
    value: 0,
    percentage: 0,
    title: 'How to increase this number',
    desc: 'Publish the ordering and reservation buttons in highly visible places, on all of your website pages.',
    btnTxt: 'Check now'
  },
  {
    label: 'Went to checkout',
    value: 0,
    percentage: 0,
    title: 'How to increase this number',
    desc: 'Create a mouth-watering online menu with good quality images competitive prices and attractive promotions.',
    btnTxt: 'Edit menu'
  },
  {
    label: 'Sent the order / reservation',
    value: 0,
    percentage: 0,
    title: 'How to increase this number',
    desc: 'Make ordering convenient: allow clients to order for later, revise your delivery areas, min. order value & fees',
    btnTxt: 'Get more orders'
  },
  {
    label: 'Received confirmation',
    value: 0,
    percentage: 0,
    title: 'How to increase this number',
    desc: 'Make sure you don’t miss orders by keeping your app opened, the device plugged in and connected to internet at all times.',
    btnTxt: 'Check connectivity'
  }
]

const FunnelView = () => {
  // State
  const [value, setValue] = useState<any>({ label: 'Last 7 Days', value: 3 })
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  // Hooks
  const theme = useTheme()

  const series = [{ name: 'Sales', data: [24165, 18850, 16375, 13567, 8800] }]

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
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '59%',
        horizontal: true,
        distributed: true,
        borderRadiusApplication: 'end'
      }
    },
    dataLabels: {
      offsetY: 8,
      style: { fontWeight: 500, fontSize: '0.8125rem' }
    },
    grid: {
      strokeDashArray: 8,
      borderColor: 'rgba(38, 43, 67, 0.12)',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: { top: -30, left: 21, right: 25, bottom: -5 }
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main
    ],
    legend: { show: false },
    states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: arr.map((item: any) => item?.label),
      labels: {
        formatter: val => `${Number(val) / 1000}k`,
        style: { fontSize: '0.8125rem', colors: 'rgba(38, 43, 67, 0.4)' }
      }
    },
    yaxis: {
      labels: {
        align: 'left',
        style: { fontWeight: 500, fontSize: '0.9375rem', colors: 'rgba(38, 43, 67, 0.9)' },
        offsetX: -30
      }
    }
  }

  return (
    <>
      <Card sx={{ width: '100%', height: '100%' }}>
        <Box
          sx={{
            p: 4,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Website Funnel</Typography>
          <CsAutocomplete
            sx={{ width: '16rem' }}
            options={[
              { label: 'Today', value: 1 },
              { label: 'Yesterday', value: 2 },
              { label: 'Last 7 Days', value: 3 },
              { label: 'last 14 Days', value: 4 },
              { label: 'last 28 Days', value: 5 },
              { label: 'Custom Interval', value: 6 }
            ]}
            isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
            multiple={false}
            getOptionLabel={(option: any) => option?.label || ''}
            value={value}
            onChange={(e: any, value: any) => {
              setValue(value)
              value?.value === 6 && setAnchorEl(e.currentTarget)
            }}
          />
        </Box>
        <Box sx={{ p: 4 }}>
          <AppReactApexCharts type='bar' height={450} series={series} options={options} />
        </Box>
      </Card>

      <Menu keepMounted anchorEl={anchorEl} onClose={() => setAnchorEl(null)} open={Boolean(anchorEl)}>
        <MenuItem>
          <CsDatePicker label={'Select Start Date'} name='start_date' placeholderText='Select Start Date' />
        </MenuItem>
        <MenuItem>
          <CsDatePicker label={'Select End Date'} name='end_date' placeholderText='Select End Date' />
        </MenuItem>
      </Menu>
    </>
  )
}

export default FunnelView
