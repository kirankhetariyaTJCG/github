import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import moment from 'moment'

const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const Chart = (props: any) => {
  const { row, type, tab } = props
  const [chartData, setChartData] = useState<{ series: any[]; categories: any[] }>({ series: [], categories: [] })
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
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
      },
      zoom: {
        enabled: false
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false
    },
    dataLabels: {
      enabled: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 10,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      }
    },
    colors: [
      theme.palette.primary.dark,
      theme.palette.secondary.dark,
      theme.palette.error.dark,
      theme.palette.success.dark,
      theme.palette.warning.dark,
      theme.palette.info.dark
    ],
    fill: {
      opacity: 1,
      type: 'solid'
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: 'rgba(38, 43, 67, 0.4)' },
      crosshairs: { stroke: { color: 'rgba(38, 43, 67, 0.4)' } },
      labels: {
        style: {
          colors: 'rgba(38, 43, 67, 0.4)',
          fontSize: '13px',
          fontWeight: 500
        }
      },
      categories: chartData.categories
    },
    legend: {
      position: 'bottom',
      offsetY: 0
    },
    noData: {
      text: 'No Data Available.',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: theme.palette.secondary.main,
        fontSize: '2rem'
      }
    }
  }

  const generateCategories = (tab: number) => {
    let categories: string[] = []

    if (tab === 0) {
      for (let i = 6; i >= 0; i--) {
        categories.push(moment().subtract(i, 'days').format('YYYY-MM-DD'))
      }
    } else if (tab === 1) {
      for (let i = 1; i <= 4; i++) {
        categories.push(`Week ${i}`)
      }
    } else if (tab === 2) {
      for (let i = 11; i >= 0; i--) {
        categories.push(moment().subtract(i, 'months').format('YYYY-MM'))
      }
    } else if (tab === 3) {
      for (let i = 5; i >= 0; i--) {
        categories.push(moment().subtract(i, 'years').format('YYYY'))
      }
    }

    return categories
  }

  const processData = (tab: number) => {
    let groupedData: any = {}
    const categories = generateCategories(tab)

    categories.forEach(category => {
      groupedData[category] = {
        visit: 0,
        affilate: 0,
        direct: 0,
        email: 0,
        inside_web: 0,
        organic: 0,
        paid_ads: 0,
        social_media: 0,
        referral: 0
      }
    })

    row.forEach((item: any) => {
      let category = ''
      if (tab === 0) {
        category = moment(item.createAt).format('YYYY-MM-DD')
      } else if (tab === 1) {
        const weekNumber = moment(item.createAt).week() - moment().startOf('month').week() + 1
        category = `Week ${Math.min(Math.max(weekNumber, 1), 4)}`
      } else if (tab === 2) {
        category = moment(item.createAt).format('YYYY-MM')
      } else if (tab === 3) {
        category = moment(item.createAt).format('YYYY')
      }

      if (groupedData[category]) {
        groupedData[category] = {
          visit: groupedData[category].visit + item.visit,
          affilate: groupedData[category].affilate + item.affilate,
          direct: groupedData[category].direct + item.direct,
          email: groupedData[category].email + item.email,
          inside_web: groupedData[category].inside_web + item.inside_web,
          organic: groupedData[category].organic + item.organic,
          paid_ads: groupedData[category].paid_ads + item.paid_ads,
          social_media: groupedData[category].social_media + item.social_media,
          referral: groupedData[category].referral + item.referral
        }
      }
    })

    return { groupedData, categories }
  }

  // Update chart data when tab changes
  useEffect(() => {
    const { groupedData, categories } = processData(parseInt(tab))
    const series: any[] =
      type === '1'
        ? [
            { name: 'Affiliate', data: categories.map((category: any) => groupedData[category].affilate || 0) },
            { name: 'Direct', data: categories.map((category: any) => groupedData[category].direct || 0) },
            { name: 'Email', data: categories.map((category: any) => groupedData[category].email || 0) },
            { name: 'Inside Web', data: categories.map((category: any) => groupedData[category].inside_web || 0) },
            { name: 'Organic', data: categories.map((category: any) => groupedData[category].organic || 0) },
            { name: 'Paid Ads', data: categories.map((category: any) => groupedData[category].paid_ads || 0) },
            { name: 'Social Media', data: categories.map((category: any) => groupedData[category].social_media || 0) },
            { name: 'Referral', data: categories.map((category: any) => groupedData[category].referral || 0) }
          ]
        : [{ name: 'Visits', data: categories.map((category: any) => groupedData[category].visit || 0) }]

    setChartData({ series, categories })
  }, [tab, row, type])

  return <AppReactApexCharts type='bar' width='100%' height={450} options={options} series={chartData.series} />
}

export default Chart
