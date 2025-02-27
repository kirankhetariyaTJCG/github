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
  const [chData, setChtData] = useState<{ cat: string[]; ser: number[]; serRevenue: number[] }>({
    cat: [],
    ser: [],
    serRevenue: []
  })
  // Hooks
  const theme = useTheme()

  const getProgress = (t: number) => {
    let categories: string[] = []
    let seriesOrders: number[] = []
    let seriesRevenue: number[] = []

    if (t === 0) {
      // Daily
      for (let i = 6; i >= 0; i--) {
        const date = moment().subtract(i, 'days').format('YYYY-MM-DD')
        categories.push(date)

        const ordersCount = row
          .filter((r: any) => moment(r.createAt).format('YYYY-MM-DD') === date)
          .reduce((acc: any, curr: any) => acc + curr.orders, 0)
        const revenueSum = row
          .filter((r: any) => moment(r.createAt).format('YYYY-MM-DD') === date)
          .reduce((acc: any, curr: any) => acc + curr.total_revenue, 0)

        seriesOrders.push(ordersCount)
        seriesRevenue.push(revenueSum)
      }
    } else if (t === 1) {
      // Weekly
      for (let i = 0; i < 4; i++) {
        const weekStart = moment().subtract(i, 'weeks').startOf('week').format('MMM D')
        const weekEnd = moment().subtract(i, 'weeks').endOf('week').format('MMM D')
        categories.push(`Week ${i + 1} (${weekStart} - ${weekEnd})`)

        const ordersCount = row
          .filter((r: any) => {
            const rowDate = moment(r.createAt)
            return rowDate.isBetween(
              moment()
                .subtract(i + 1, 'weeks')
                .startOf('week'),
              moment().subtract(i, 'weeks').endOf('week'),
              null,
              '[]'
            )
          })
          .reduce((acc: any, curr: any) => acc + curr.orders, 0)

        const revenueSum = row
          .filter((r: any) => {
            const rowDate = moment(r.createAt)
            return rowDate.isBetween(
              moment()
                .subtract(i + 1, 'weeks')
                .startOf('week'),
              moment().subtract(i, 'weeks').endOf('week'),
              null,
              '[]'
            )
          })
          .reduce((acc: any, curr: any) => acc + curr.total_revenue, 0)

        seriesOrders.push(ordersCount)
        seriesRevenue.push(revenueSum)
      }
    } else if (t === 2) {
      // Monthly
      for (let i = 0; i < 12; i++) {
        const month = moment().subtract(i, 'months').format('YYYY-MM')
        categories.push(month)

        const ordersCount = row
          .filter((r: any) => moment(r.createAt).isSame(moment().subtract(i, 'months'), 'month'))
          .reduce((acc: any, curr: any) => acc + curr.orders, 0)

        const revenueSum = row
          .filter((r: any) => moment(r.createAt).isSame(moment().subtract(i, 'months'), 'month'))
          .reduce((acc: any, curr: any) => acc + curr.total_revenue, 0)

        seriesOrders.push(ordersCount)
        seriesRevenue.push(revenueSum)
      }
    } else if (t === 3) {
      // Yearly
      for (let i = 0; i < 6; i++) {
        const year = moment().subtract(i, 'years').format('YYYY')
        categories.push(year)

        const ordersCount = row
          .filter((r: any) => moment(r.createAt).isSame(moment().subtract(i, 'years'), 'year'))
          .reduce((acc: any, curr: any) => acc + curr.orders, 0)

        const revenueSum = row
          .filter((r: any) => moment(r.createAt).isSame(moment().subtract(i, 'years'), 'year'))
          .reduce((acc: any, curr: any) => acc + curr.total_revenue, 0)

        seriesOrders.push(ordersCount)
        seriesRevenue.push(revenueSum)
      }
    }

    setChtData({ cat: categories, ser: seriesOrders, serRevenue: seriesRevenue })
  }

  const series = [
    {
      name: 'Total Revenue',
      data: chData.serRevenue
    },
    {
      name: 'Orders',
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
    colors: [theme.palette.info.main, theme.palette.success.main],
    fill: { opacity: 0.5, type: 'gradient' },
    xaxis: {
      categories: chData.cat,
      axisBorder: { show: false },
      axisTicks: { color: 'rgba(38, 43, 67, 0.4)' },
      crosshairs: { stroke: { color: 'rgba(38, 43, 67, 0.4)' } }
    }
  }

  useEffect(() => {
    if (tab) {
      getProgress(parseInt(tab))
    }
  }, [tab, row])

  return <AppReactApexCharts options={options} series={series} type='bar' height={350} />
}

export default Chart
