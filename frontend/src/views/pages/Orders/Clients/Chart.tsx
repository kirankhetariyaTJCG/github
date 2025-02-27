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
  const [chData, setChtData] = useState<{ cat: string[]; newClients: number[]; existingClients: number[] }>({
    cat: [],
    newClients: [],
    existingClients: []
  })
  // Hooks
  const theme = useTheme()

  const getProgress = (t: number) => {
    let categories: string[] = []
    let newClientsSeries: number[] = []
    let existingClientsSeries: number[] = []

    if (t === 0) {
      // Daily
      for (let i = 6; i >= 0; i--) {
        const date = moment().subtract(i, 'days').format('YYYY-MM-DD')
        categories.push(date)

        const dayData = row.filter((row: any) => moment(row.createAt).format('YYYY-MM-DD') === date)

        const newClientsCount = dayData.reduce((acc: number, curr: any) => acc + curr.new_clients, 0)
        const existingClientsCount = dayData.reduce((acc: number, curr: any) => acc + curr.existing_clients, 0)

        newClientsSeries.push(newClientsCount)
        existingClientsSeries.push(existingClientsCount)
      }
    } else if (t === 1) {
      // Weekly
      for (let i = 0; i < 4; i++) {
        const weekStart = moment().subtract(i, 'weeks').startOf('week').format('MMM D')
        const weekEnd = moment().subtract(i, 'weeks').endOf('week').format('MMM D')
        categories.push(`Week ${i + 1} (${weekStart} - ${weekEnd})`)

        const weekData = row.filter((row: any) => {
          const rowDate = moment(row.createAt)
          return rowDate.isBetween(
            moment()
              .subtract(i + 1, 'weeks')
              .startOf('week'),
            moment().subtract(i, 'weeks').endOf('week'),
            null,
            '[]'
          )
        })

        const newClientsCount = weekData.reduce((acc: number, curr: any) => acc + curr.new_clients, 0)
        const existingClientsCount = weekData.reduce((acc: number, curr: any) => acc + curr.existing_clients, 0)

        newClientsSeries.push(newClientsCount)
        existingClientsSeries.push(existingClientsCount)
      }
    } else if (t === 2) {
      // Monthly
      for (let i = 0; i < 12; i++) {
        const month = moment().subtract(i, 'months').format('YYYY-MM')
        categories.push(month)

        const monthData = row.filter((row: any) => moment(row.createAt).isSame(moment().subtract(i, 'months'), 'month'))

        const newClientsCount = monthData.reduce((acc: number, curr: any) => acc + curr.new_clients, 0)
        const existingClientsCount = monthData.reduce((acc: number, curr: any) => acc + curr.existing_clients, 0)

        newClientsSeries.push(newClientsCount)
        existingClientsSeries.push(existingClientsCount)
      }
    } else if (t === 3) {
      // Yearly
      for (let i = 0; i < 6; i++) {
        const year = moment().subtract(i, 'years').format('YYYY')
        categories.push(year)

        const yearData = row.filter((row: any) => moment(row.createAt).isSame(moment().subtract(i, 'years'), 'year'))

        const newClientsCount = yearData.reduce((acc: number, curr: any) => acc + curr.new_clients, 0)
        const existingClientsCount = yearData.reduce((acc: number, curr: any) => acc + curr.existing_clients, 0)

        newClientsSeries.push(newClientsCount)
        existingClientsSeries.push(existingClientsCount)
      }
    }

    setChtData({ cat: categories, newClients: newClientsSeries, existingClients: existingClientsSeries })
  }

  const series = [
    {
      name: 'New Clients',
      data: chData.newClients
    },
    {
      name: 'Existing Clients',
      data: chData.existingClients
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
    dataLabels: { enabled: true },
    stroke: { curve: 'smooth' },
    fill: { opacity: 0.5, type: 'gradient' },
    colors: [theme.palette.info.main, theme.palette.primary.main],
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
