'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'
import { Tab, useMediaQuery, useTheme } from '@mui/material'

// Custom Imports
import Table from './Table'
import Chart from './Chart'

// Icon Imports
import Icon from '@/@core/components/Icon'
import DateRangePicker from '@/@core/components/CsDateRangePicker'
import moment from 'moment'
import TabContext from '@mui/lab/TabContext'
import CustomTabList from '@/@core/components/mui/TabList'

const sampleCSVData = [
  ['Column1', 'Column2', 'Column3'],
  ['Row1Value1', 'Row1Value2', 'Row1Value3'],
  ['Row2Value1', 'Row2Value2', 'Row2Value3']
]

const TableView = () => {
  // State
  const [isView, setIsView] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<any>({ label: 'Last 7 Days', value: 3 })
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null
  })
  const [row, setRow] = useState<any[]>([])
  const [tab, setTab] = useState<string>('0')
  const isMobile = useMediaQuery('(max-width: 440px)')

  // Hooks
  const router = useRouter()

  const theme = useTheme()

  const arr = ['Daily', 'Weekly', 'Monthly', 'Yearly']

  const data = [
    {
      _id: 1,
      createAt: '2024-09-01',
      time_slot: '18:00:00',
      total_persons: 4,
      total_revenue: 150,
      status: 'Confirmed'
    },
    {
      _id: 2,
      createAt: '2024-09-22',
      time_slot: '19:00:00',
      total_persons: 2,
      total_revenue: 75,
      status: 'Pending'
    },
    {
      _id: 3,
      createAt: '2024-09-23',
      time_slot: '20:00:00',
      total_persons: 6,
      total_revenue: 200,
      status: 'Cancelled'
    },
    {
      _id: 4,
      createAt: '2024-09-24',
      time_slot: '17:00:00',
      total_persons: 3,
      total_revenue: 100,
      status: 'Confirmed'
    },
    {
      _id: 5,
      createAt: '2024-09-24',
      time_slot: '17:00:00',
      total_persons: 3,
      total_revenue: 100,
      status: 'Confirmed'
    },
    {
      _id: 6,
      createAt: '2024-09-05',
      time_slot: '21:00:00',
      total_persons: 5,
      total_revenue: 180,
      status: 'Confirmed'
    }
  ]

  const handleDownload = async (type: string) => {
    try {
      setLoading(true)
      if (type === 'csv') {
        const csvContent = sampleCSVData.map(row => row.join(',')).join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'sample.csv'
        link.click()
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error generating file:', error)
    }
  }

  useEffect(() => {
    const filterRows = data
      .filter((v: any) => {
        const date = moment(v.createAt, 'YYYY-MM-DD')
        return date.isBetween(dateRange.startDate, dateRange.endDate, null, '[]')
      })
      .sort((a: any, b: any) => moment(a.createAt).diff(moment(b.createAt)))
    if (filterRows.length > 0) {
      setRow(filterRows)
    } else {
      setRow([])
    }
  }, [dateRange])

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          p: 4,
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Table reservations</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Box sx={{ display: !isView ? 'none' : 'block' }}>
            <DateRangePicker value={value} setValue={setValue} dateRange={dateRange} setDateRange={setDateRange} />
          </Box>
          <ButtonGroup>
            <Button
              startIcon={<Icon icon={'uis:chart'} />}
              variant={isView ? 'contained' : 'outlined'}
              onClick={() => setIsView(true)}
            >
              Table
            </Button>
            <Button
              startIcon={<Icon icon={'tabler:table-filled'} />}
              variant={!isView ? 'contained' : 'outlined'}
              onClick={() => setIsView(false)}
            >
              Chart
            </Button>
          </ButtonGroup>
          <Tooltip title='Export' arrow>
            <IconButton
              color='primary'
              disabled={loading}
              sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              onClick={() => handleDownload('csv')}
            >
              <Icon icon={'ph:export-bold'} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ display: isView ? 'none' : 'flex', width: '100%', pt: '1rem', pr: '1rem' }}>
        <TabContext value={tab}>
          <CustomTabList
            scrollButtons='auto'
            pill='true'
            onChange={(_: any, newValue) => {
              setTab(newValue)
            }}
            variant='scrollable'
            sx={{
              width: isMobile ? '300px' : '1000%',
              '& .MuiTabs-flexContainer': { display: 'flex', justifyContent: 'end' }
            }}
          >
            {Array.isArray(arr) &&
              arr?.length > 0 &&
              arr?.map((item: any, index: number) => {
                return <Tab key={index} value={index.toString()} label={item} />
              })}
          </CustomTabList>
        </TabContext>
      </Box>
      <Box>
        {isView && <Table row={row} />}
        {!isView && <Chart row={data} tab={tab} />}
      </Box>
      <Divider />
      <Box>
        <Typography sx={{ p: 4, fontWeight: 700, fontSize: '1.2rem' }}>
          Key actions to increase your website visitors
        </Typography>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 4,
            m: { xs: '0.5rem', sm: '1rem', md: '1rem' },
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '10px'
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
            Allow clients to pre-order food when booking a table
          </Typography>
          <LoadingButton
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={() => router.push('/setup/services/table-reservation')}
          >
            Enable Service
          </LoadingButton>
        </Box>
      </Box>
    </Card>
  )
}

export default TableView
