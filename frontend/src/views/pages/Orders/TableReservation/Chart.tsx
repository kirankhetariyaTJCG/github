import dynamic from 'next/dynamic'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import moment from 'moment'

// Custom Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const Chart = (props: any) => {
  const { row, tab } = props

  // States
  const [chData, setChtData] = useState<{ cat: string[]; ser: number[] }>({ cat: [], ser: [] })
  // Hooks
  const theme = useTheme()

  const getProgress = (t: number) => {
    let categories: string[] = []
    let series: number[] = []

    if (t === 0) {
      // Daily
      for (let i = 6; i >= 0; i--) {
        const date = moment().subtract(i, 'days').format('YYYY-MM-DD')
        categories.push(date)
        const availableData = row.filter((row: any) => moment(row.createAt).format('YYYY-MM-DD') === date).length
        series.push(availableData)
      }
    } else if (t === 1) {
      // Weekly
      for (let i = 0; i < 4; i++) {
        const weekStart = moment().subtract(i, 'weeks').startOf('week').format('MMM D')
        const weekEnd = moment().subtract(i, 'weeks').endOf('week').format('MMM D')
        categories.push(`Week ${i + 1} (${weekStart} - ${weekEnd})`)
        const availableData = row.filter((row: any) => {
          const rowDate = moment(row.createAt)
          return rowDate.isBetween(
            moment()
              .subtract(i + 1, 'weeks')
              .startOf('week'),
            moment().subtract(i, 'weeks').endOf('week'),
            null,
            '[]'
          )
        }).length
        series.push(availableData)
      }
    } else if (t === 2) {
      // Monthly
      for (let i = 0; i < 12; i++) {
        const month = moment().subtract(i, 'months').format('YYYY-MM')
        categories.push(month)
        const availableData = row.filter((row: any) =>
          moment(row.createAt).isSame(moment().subtract(i, 'months'), 'month')
        ).length
        series.push(availableData)
      }
    } else if (t === 3) {
      // Yearly
      for (let i = 0; i < 6; i++) {
        const year = moment().subtract(i, 'years').format('YYYY')
        categories.push(year)
        const availableData = row.filter((row: any) =>
          moment(row.createAt).isSame(moment().subtract(i, 'years'), 'year')
        ).length
        series.push(availableData)
      }
    }

    setChtData({ cat: categories, ser: series })
  }

  const series = [
    {
      name: 'Data',
      data: chData.ser
    }
  ]

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      height: 350,
      type: 'bar'
    },
    tooltip: { shared: false },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    colors: [theme.palette.info.main],
    fill: { opacity: 0.5, type: 'gradient' },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: 'rgba(38, 43, 67, 0.4)' },
      crosshairs: { stroke: { color: 'rgba(38, 43, 67, 0.4)' } },
      labels: { style: { colors: 'rgba(38, 43, 67, 0.4)', fontSize: '13px', fontWeight: 500 } },
      categories: chData.cat
    }
  }

  useEffect(() => {
    getProgress(parseInt(tab))
  }, [tab])

  return (
    <>
      <AppReactApexCharts type='bar' width='100%' height={400} options={options} series={series} />
    </>
  )
}

export default Chart
