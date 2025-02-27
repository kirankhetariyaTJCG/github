'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// Third Party Import
import moment from 'moment'

// Custom Imports
import DateRangePicker from '@/@core/components/CsDateRangePicker'
import Table from './Table'

// Icon Imports
import Icon from '@/@core/components/Icon'

const SummaryView = () => {
  // State
  const [value, setValue] = useState<any>({ label: 'Last 7 Days', value: 3 })
  const [loading, setLoading] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null
  })
  const [row, setRow] = useState<any[]>([])

  const data = [
    {
      _id: 1,
      createAt: '2024-09-21',
      total_revenue: 15000,
      change: 5,
      orders: 100,
      subtotal: 14000,
      tax: 1500,
      delivery_fee: 500,
      total: 15000,
      payment_type: 'Credit Card',
      order_type: 'Online'
    },
    {
      _id: 2,
      createAt: '2024-09-24',
      total_revenue: 13000,
      change: -3,
      orders: 90,
      subtotal: 12000,
      tax: 1000,
      delivery_fee: 500,
      total: 13000,
      payment_type: 'PayPal',
      order_type: 'In-Store'
    },
    {
      _id: 3,
      createAt: '2024-09-11',
      total_revenue: 18000,
      change: 8,
      orders: 120,
      subtotal: 16500,
      tax: 1800,
      delivery_fee: 700,
      total: 18000,
      payment_type: 'Debit Card',
      order_type: 'Online'
    },
    {
      _id: 4,
      createAt: '2024-08-21',
      total_revenue: 12000,
      change: 2,
      orders: 80,
      subtotal: 11000,
      tax: 1200,
      delivery_fee: 500,
      total: 12000,
      payment_type: 'Credit Card',
      order_type: 'In-Store'
    },
    {
      _id: 5,
      createAt: '2024-09-11',
      total_revenue: 17000,
      change: 10,
      orders: 110,
      subtotal: 15500,
      tax: 1700,
      delivery_fee: 800,
      total: 17000,
      payment_type: 'Cash',
      order_type: 'Online'
    },
    {
      _id: 6,
      createAt: '2024-09-19',
      total_revenue: 14000,
      change: -2,
      orders: 95,
      subtotal: 12800,
      tax: 1400,
      delivery_fee: 800,
      total: 14000,
      payment_type: 'PayPal',
      order_type: 'In-Store'
    },
    {
      _id: 7,
      createAt: '2024-08-01',
      total_revenue: 20000,
      change: 12,
      orders: 150,
      subtotal: 18000,
      tax: 2000,
      delivery_fee: 1000,
      total: 20000,
      payment_type: 'Debit Card',
      order_type: 'Online'
    },
    {
      _id: 8,
      createAt: '2024-09-19',
      total_revenue: 16000,
      change: 3,
      orders: 110,
      subtotal: 14500,
      tax: 1600,
      delivery_fee: 900,
      total: 16000,
      payment_type: 'Credit Card',
      order_type: 'In-Store'
    },
    {
      _id: 9,
      createAt: '2024-09-20',
      total_revenue: 22000,
      change: 15,
      orders: 140,
      subtotal: 20000,
      tax: 2200,
      delivery_fee: 1000,
      total: 22000,
      payment_type: 'Cash',
      order_type: 'Online'
    },
    {
      _id: 10,
      createAt: '2024-09-23',
      total_revenue: 19000,
      change: 6,
      orders: 130,
      subtotal: 17500,
      tax: 1900,
      delivery_fee: 600,
      total: 19000,
      payment_type: 'PayPal',
      order_type: 'In-Store'
    },
    {
      _id: 11,
      createAt: '2024-09-09',
      total_revenue: 21000,
      change: 7,
      orders: 115,
      subtotal: 19500,
      tax: 2100,
      delivery_fee: 600,
      total: 21000,
      payment_type: 'Credit Card',
      order_type: 'Online'
    },
    {
      _id: 12,
      createAt: '2024-09-12',
      total_revenue: 23000,
      change: 9,
      orders: 125,
      subtotal: 21500,
      tax: 2300,
      delivery_fee: 800,
      total: 23000,
      payment_type: 'Debit Card',
      order_type: 'In-Store'
    },
    {
      _id: 13,
      createAt: '2024-08-17',
      total_revenue: 24000,
      change: 11,
      orders: 140,
      subtotal: 22000,
      tax: 2400,
      delivery_fee: 800,
      total: 24000,
      payment_type: 'Cash',
      order_type: 'Online'
    },
    {
      _id: 14,
      createAt: '2024-09-18',
      total_revenue: 17000,
      change: -5,
      orders: 100,
      subtotal: 15500,
      tax: 1700,
      delivery_fee: 500,
      total: 17000,
      payment_type: 'PayPal',
      order_type: 'In-Store'
    },
    {
      _id: 15,
      createAt: '2024-09-24',
      total_revenue: 15000,
      change: -1,
      orders: 80,
      subtotal: 14000,
      tax: 1000,
      delivery_fee: 500,
      total: 15000,
      payment_type: 'Credit Card',
      order_type: 'Online'
    }
  ]

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

  const handleDownload = async (type: string) => {
    try {
      setLoading(true)
      if (type === 'csv') {
        const csvContent = [
          ['Column1', 'Column2', 'Column3'],
          ['Row1Value1', 'Row1Value2', 'Row1Value3'],
          ['Row2Value1', 'Row2Value2', 'Row2Value3']
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
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, mb: { xs: 4, sm: 4, md: 0 } }}>Summary</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          <DateRangePicker value={value} setValue={setValue} dateRange={dateRange} setDateRange={setDateRange} />

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
      <Table row={row} />
    </Card>
  )
}

export default SummaryView
