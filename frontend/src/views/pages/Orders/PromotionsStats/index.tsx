'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import { Tab, useMediaQuery } from '@mui/material'
import TabContext from '@mui/lab/TabContext'

// Third Party Imports
import moment from 'moment'

// Component Imports
import CsSelect from '@/@core/components/CsSelect'
import CustomTabList from '@/@core/components/mui/TabList'
import DateRangePicker from '@/@core/components/CsDateRangePicker'

// Custom Imports
import Chart from './Chart'
import Table from './Table'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Static Data Imports
import { promotionData } from './data'

const StatsView = () => {
  // Var
  const opt1 = [
    { label: 'Value', value: 1 },
    { label: 'Count', value: 2 },
    { label: 'Discount', value: 3 }
  ]

  const arr = ['Daily', 'Weekly', 'Monthly', 'Yearly']

  // State
  const [value, setValue] = useState<any>({ label: 'Last 7 Days', value: 3 })
  const [catValue, catSetValue] = useState<any>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isView, setIsView] = useState<boolean>(false)
  const [row, setRow] = useState<any[]>([])
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null
  })
  const [tab, setTab] = useState<string>('0')

  // Hooks
  const isMobile = useMediaQuery('(max-width: 440px)');

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

  useEffect(() => {
    const filterRows = promotionData.filter((v: any) => {
      const date = moment(v.date, 'YYYY-MM-DD')
      return date.isBetween(dateRange.startDate, dateRange.endDate, null, '[]');
    }).sort((a: any, b: any) => moment(a.date).diff(moment(b.date)));
    if (filterRows.length > 0) {
      setRow(filterRows);
    } else {
      setRow([]);
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
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}
      >
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Promotions Stats</Typography>

        <ButtonGroup sx={{ width: 'auto', marginLeft: 'auto', marginRight: 4 }}>
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

      {/* Filter  */}
      <Box sx={{ p: 2, px: { sm: 4 }, width: '100%' }}>
        <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'end' }}>
          <Grid item xs={12} sm={6} md={3} sx={{ display: !isView ? 'none' : 'block' }}>
            <CsSelect
              fullWidth
              name='catValue'
              value={catValue}
              onChange={(e: any) => catSetValue(e.target.value)}
              options={opt1}
              label='Select Promotion'
            />
          </Grid>

          <Grid item sx={{ display: !isView ? 'none' : 'block' }}>
            <DateRangePicker value={value} setValue={setValue} dateRange={dateRange} setDateRange={setDateRange} />
          </Grid>

          <Grid item sx={{ display: isView ? 'none' : 'block' }}>
            <TabContext value={tab}>
              <CustomTabList
                scrollButtons='auto'
                pill='true'
                onChange={(_: any, newValue) => { setTab(newValue) }}
                variant='scrollable'
                sx={{ width: isMobile ? '300px' : '1000%' }}
              >
                {Array.isArray(arr) &&
                  arr?.length > 0 &&
                  arr?.map((item: any, index: number) => {
                    return (
                      <Tab
                        key={index}
                        value={index.toString()}
                        label={item} />
                    )
                  })}
              </CustomTabList>
            </TabContext>

          </Grid>
        </Grid>
      </Box>

      <Box>
        {isView && <Table row={row} />}
        {!isView && <Chart row={row} tab={tab} />}
      </Box>
    </Card>
  )
}

export default StatsView
