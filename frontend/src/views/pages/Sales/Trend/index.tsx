'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import Tab from '@mui/material/Tab'
import useMediaQuery from '@mui/material/useMediaQuery'

// Third Party Imports
import moment from 'moment'

// Custom Imports
import DateRangePicker from '@/@core/components/CsDateRangePicker'
import Table from './Table'
import Chart from './Chart'

// Icon Imports
import Icon from '@/@core/components/Icon'
import TabContext from '@mui/lab/TabContext'
import CustomTabList from '@/@core/components/mui/TabList'

const TrendView = () => {
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

  const data = [
    {
      _id: 1,
      total_revenue: 100,
      not_sales: 50,
      orders: 10,
      avg_order_value: 10,
      createAt: '2024-09-10',
      change: '30%'
    },
    {
      _id: 2,
      total_revenue: 200,
      not_sales: 100,
      orders: 15,
      avg_order_value: 13.33,
      createAt: '2024-09-11',
      change: '23%'
    },
    {
      _id: 3,
      total_revenue: 150,
      not_sales: 80,
      orders: 20,
      avg_order_value: 7.5,
      createAt: '2024-09-12',
      change: '3%'
    },
    {
      _id: 4,
      total_revenue: 300,
      not_sales: 200,
      orders: 25,
      avg_order_value: 12,
      createAt: '2024-09-13',
      change: '10%'
    },
    {
      _id: 5,
      total_revenue: 250,
      not_sales: 120,
      orders: 18,
      avg_order_value: 13.88,
      createAt: '2024-09-14',
      change: '12%'
    },
    {
      _id: 6,
      total_revenue: 400,
      not_sales: 220,
      orders: 30,
      avg_order_value: 13.33,
      createAt: '2024-09-15',
      change: '4%'
    },
    {
      _id: 7,
      total_revenue: 350,
      not_sales: 180,
      orders: 22,
      avg_order_value: 15.9,
      createAt: '2024-09-16',
      change: '5%'
    },
    {
      _id: 8,
      total_revenue: 450,
      not_sales: 250,
      orders: 35,
      avg_order_value: 12.86,
      createAt: '2024-09-17',
      change: '23%'
    },
    {
      _id: 9,
      total_revenue: 500,
      not_sales: 300,
      orders: 40,
      avg_order_value: 12.5,
      createAt: '2024-09-18',
      change: '30%'
    },
    {
      _id: 10,
      total_revenue: 600,
      not_sales: 400,
      orders: 400,
      avg_order_value: 13.33,
      createAt: '2024-09-19',
      change: '20%'
    },
    {
      _id: 11,
      total_revenue: 700,
      not_sales: 450,
      orders: 550,
      avg_order_value: 14,
      createAt: '2024-09-20',
      change: '23%'
    },
    {
      _id: 12,
      total_revenue: 800,
      not_sales: 500,
      orders: 155,
      avg_order_value: 14.55,
      createAt: '2024-09-21',
      change: '25%'
    },
    {
      _id: 13,
      total_revenue: 900,
      not_sales: 550,
      orders: 560,
      avg_order_value: 15,
      createAt: '2024-09-22',
      change: '3%'
    },
    {
      _id: 14,
      total_revenue: 1000,
      not_sales: 600,
      orders: 65,
      avg_order_value: 15.38,
      createAt: '2024-09-23',
      change: '10%'
    },
    {
      _id: 15,
      total_revenue: 1100,
      not_sales: 700,
      orders: 70,
      avg_order_value: 15.71,
      createAt: '2024-09-24',
      change: '15%'
    }
  ]

  const arr = ['Daily', 'Weekly', 'Monthly', 'Yearly']

  const fieldMapping: { [key: number]: string } = {
    1: 'total_revenue',
    2: 'not_sales',
    3: 'orders',
    4: 'avg_order_value'
  }

  const handleDownload = async (type: string) => {
    try {
      setLoading(true)
      if (type === 'csv') {
        const csvContent = [
          ['ID', 'Total Revenue', 'Not Sales', 'Orders', 'Avg. Order Value', 'Created At'],
          ...row.map(item => [
            item._id,
            item.total_revenue,
            item.not_sales,
            item.orders,
            item.avg_order_value,
            item.createAt
          ])
        ]
          .map(row => row.join(','))
          .join('\n')
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

  // useEffect(() => {
  //   const filterRows = data
  //     .filter((v: any) => {
  //       const date = moment(v.createAt, 'YYYY-MM-DD')
  //       return date.isBetween(dateRange.startDate, dateRange.endDate, null, '[]')
  //     })
  //     .sort((a: any, b: any) => moment(a.createAt).diff(moment(b.createAt)))

  //   if (filterRows.length > 0) {
  //     const selectedField = fieldMapping[view.value] || 'total_revenue'
  //     const filteredData = filterRows.map((item: any) => ({
  //       ...item,
  //       value: item[selectedField]
  //     }))
  //     setRow(filteredData)
  //   } else {
  //     setRow([])
  //   }
  // }, [dateRange, view])

  // useEffect(() => {
  //   const selectedField = fieldMapping[view.value] || 'total_revenue'
  //   const filteredData = data.map((item: any) => ({
  //     ...item,
  //     value: item[selectedField]
  //   }))
  //   setRow(filteredData)
  // }, [view])

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
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' }
        }}
      >
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, mb: { xs: 2, sm: 2, md: 0 } }}>Trend</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flexDirection: { xs: 'column', sm: 'row', md: 'row' },
            width: '100%',
            justifyContent: { xs: 'center', sm: 'end', md: 'end' }
          }}
        >
          <Box sx={{ display: !isView ? 'none' : 'block' }}>
            <DateRangePicker value={value} setValue={setValue} dateRange={dateRange} setDateRange={setDateRange} />
          </Box>
          {/* {!isView && (
            <Box sx={{ width: '16rem' }}>
              <Autocomplete
                size='small'
                options={[
                  { label: 'Total Revenue', value: 1 },
                  { label: 'Not Sales', value: 2 },
                  { label: 'Orders', value: 3 },
                  { label: 'Avg. Order Value', value: 4 }
                ]}
                isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
                value={view}
                fullWidth
                multiple={false}
                getOptionLabel={(option: any) => option?.label || ''}
                onChange={(e: any, value: any) => setView(value || { label: 'Total Revenue', value: 1 })}
                sx={{
                  '& .MuiBox-root': {
                    outline: 'none'
                  }
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    inputProps={{ ...params.inputProps }}
                    InputProps={{
                      ...params.InputProps
                    }}
                  />
                )}
              />
            </Box>
          )} */}

          <ButtonGroup sx={{ width: 'auto' }}>
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 4,
          flexDirection: { xs: 'column', sm: 'row', md: 'row' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row', md: 'row' },
            alignItems: 'center',
            gap: 4,
            width: '100%'
          }}
        ></Box>
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
    </Card>
  )
}

export default TrendView
