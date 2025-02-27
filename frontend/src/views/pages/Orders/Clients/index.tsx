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

// Third Party Import
import moment from 'moment'

// Custom Imports
import Table from './Table'
import Chart from './Chart'

// Icon Imports
import Icon from '@/@core/components/Icon'
import TabContext from '@mui/lab/TabContext'
import CustomTabList from '@/@core/components/mui/TabList'
import DateRangePicker from '@/@core/components/CsDateRangePicker'

const sampleCSVData = [
  ['Column1', 'Column2', 'Column3'],
  ['Row1Value1', 'Row1Value2', 'Row1Value3'],
  ['Row2Value1', 'Row2Value2', 'Row2Value3']
]

const ClientsView = () => {
  // State
  const [isView, setIsView] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [row, setRow] = useState<any[]>([])
  const [value, setValue] = useState<any>({ label: 'Last 7 Days', value: 3 })
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null
  })
  const [tab, setTab] = useState<string>('0')
  const isMobile = useMediaQuery('(max-width: 440px)')

  const data = [
    {
      _id: 1,
      createAt: '2024-09-24',
      new_clients: 5,
      existing_clients: 8
    },
    {
      _id: 2,
      createAt: '2024-09-23',
      new_clients: 3,
      existing_clients: 7
    },
    {
      _id: 3,
      createAt: '2024-09-03',
      new_clients: 10,
      existing_clients: 2
    },
    {
      _id: 4,
      createAt: '2024-09-04',
      new_clients: 8,
      existing_clients: 5
    },
    {
      _id: 5,
      createAt: '2024-09-05',
      new_clients: 0,
      existing_clients: 12
    },
    {
      _id: 6,
      createAt: '2024-08-15',
      new_clients: 4,
      existing_clients: 1
    },
    {
      _id: 7,
      createAt: '2024-08-07',
      new_clients: 1,
      existing_clients: 0
    },
    {
      _id: 8,
      createAt: '2024-08-01',
      new_clients: 0,
      existing_clients: 12
    },
    {
      _id: 9,
      createAt: '2024-09-05',
      new_clients: 0,
      existing_clients: 12
    },
    {
      _id: 10,
      createAt: '2024-09-05',
      new_clients: 0,
      existing_clients: 12
    },
    {
      _id: 11,
      createAt: '2024-09-05',
      new_clients: 0,
      existing_clients: 12
    }
  ]

  const arr = ['Daily', 'Weekly', 'Monthly', 'Yearly']

  // Hooks
  const router = useRouter()
  const theme = useTheme()

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
    <>
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
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Clients</Typography>
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
            Key actions to get new clients and repeat business
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
              Promote attractive offers on email and social media
            </Typography>
            <LoadingButton
              sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              onClick={() => router.push('/marketing-tools/autopilot/overview')}
            >
              Create Promo
            </LoadingButton>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export default ClientsView
