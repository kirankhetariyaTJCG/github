'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import { Tab, useTheme, useMediaQuery } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party
import moment from 'moment'

// Custom Imports
import Table from './Table'
import Chart from './Chart'

// Component Imports
import CsSelect from '@/@core/components/CsSelect'
import CsInputSearchGroup from '@/@core/components/CsInputSeachGroup'
import DateRangePicker from '@/@core/components/CsDateRangePicker'
import CustomTabList from '@/@core/components/mui/TabList'

// Icon Imports
import Icon from '@/@core/components/Icon'

import { visitorsData } from './data'

const VisitsView = () => {
  // Var
  const opt3 = [
    { label: 'Affiliate', value: 'affiliate' },
    { label: 'Direct', value: 'direct' },
    { label: 'Email', value: 'email' },
    { label: 'Inside website', value: 'inside_web' },
    { label: 'Organic', value: 'organic' },
    { label: 'Paid ads', value: 'paid_ads' },
    { label: 'Referral', value: 'referral' },
    { label: 'Social Media', value: 'social_media' },
    { label: 'Visit', value: 'visit' }
  ]

  const opt1 = [
    { label: 'Chanel', value: '1' },
    { label: 'Visit', value: '2' }
  ]

  const arr = ['Daily', 'Weekly', 'Monthly', 'Yearly']

  // State
  const [isView, setIsView] = useState<boolean>(true)
  const [value, setValue] = useState<any>({ label: 'Last 7 Days', value: 3 })
  const [catValue, catSetValue] = useState<any>(opt1[0].value)
  const [colValue, colSetValue] = useState<any>(opt3[0].value)
  const [cols, setCols] = useState<any[]>(opt3.filter(c => c.value !== 'visit'))
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [row, setRow] = useState<any[]>([])
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null
  })
  const [tab, setTab] = useState<string>('0')

  // Hooks
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 440px)')

  const handleDownload = async (type: string) => {
    if (type === 'csv') {
      setLoading(true)
      try {
        const headers = Object.keys(row[0])
        const csvRows = row.map((r: any) =>
          headers
            .map(header => (r[header] instanceof Date ? moment(r[header]).format('YYYY-MM-DD HH:mm') : r[header]))
            .join(',')
        )
        const csvContent = [headers.join(','), ...csvRows].join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', 'websitevisitor.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error('Error generating CSV file:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const filterRows = visitorsData
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
            justifyContent: 'space-between',
            gap: { xs: 2, sm: 0 }
          }}
        >
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Website Visits</Typography>

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

        <Box sx={{ p: 2, px: { sm: 4 }, width: '100%' }}>
          <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'end' }}>
            <Grid item xs={12} md={6} key={catValue} sx={{ display: !isView ? 'none' : 'block' }}>
              <CsInputSearchGroup
                options={cols}
                setSearchValue={setSearch}
                searchValue={search}
                setSelectedOption={colSetValue}
                placeholderSearch='Search Order'
                boxSx={{ ml: 'auto' }}
                selectedOption={colValue}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CsSelect
                fullWidth
                name='catValue'
                value={catValue}
                onChange={(e: any) => {
                  catSetValue(e.target.value)
                  const filter = opt3.filter(c =>
                    e.target.value === '1' ? c.value !== 'visit' : c.value === 'visit' || c.value === 'date'
                  )
                  setCols(filter)
                  colSetValue(filter[0].value)
                }}
                options={opt1}
                label='Select Type'
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
                  onChange={(_: any, newValue) => {
                    setTab(newValue)
                  }}
                  variant='scrollable'
                  sx={{ width: isMobile ? '300px' : '1000%' }}
                >
                  {Array.isArray(arr) &&
                    arr?.length > 0 &&
                    arr?.map((item: any, index: number) => {
                      return <Tab key={index} value={index.toString()} label={item} />
                    })}
                </CustomTabList>
              </TabContext>
            </Grid>
          </Grid>
        </Box>

        <Box>
          {isView && <Table type={catValue} row={row} />}
          {!isView && <Chart type={catValue} row={row} tab={tab} />}
        </Box>

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
              Make it easy for clients to find your website on Google
            </Typography>
            <LoadingButton
              sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              onClick={() => router.push('/marketing-tools/autopilot/overview')}
            >
              Fixed 7 Problems
            </LoadingButton>
          </Box>
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
              Make your restaurant stand out in your local area with Google Business listing
            </Typography>
            <LoadingButton
              sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              onClick={() => router.push('/marketing-tools/autopilot/overview')}
            >
              Access request pending
            </LoadingButton>
          </Box>
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
            <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Distribute flyers in your neighbourhood</Typography>
            <LoadingButton
              sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              onClick={() => router.push('/marketing-tools/autopilot/overview')}
            >
              Download Template
            </LoadingButton>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export default VisitsView
