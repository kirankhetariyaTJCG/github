// React Imports
import { useEffect, useState } from 'react';

// Next Imports
import dynamic from 'next/dynamic';

// MUI Imports
import { useTheme } from '@mui/material/styles';

// Third Party Imports
import { ApexOptions } from 'apexcharts';
import moment from 'moment';
import { promotionData } from './data';

// Custom Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'));

const Chart = (props: any) => {

  const [chData, setChtData] = useState<{ cat: string[], ser: number[] }>({ cat: [], ser: [] });
  
  // Hooks
  const theme = useTheme();

  const getProgress = (t: number) => {
    let categories: string[] = [];
    let series: number[] = [];

    if (t === 0) { // Daily
      for (let i = 6; i >= 0; i--) {
        const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
        categories.push(date);
        const availableData = promotionData.filter((row: any) => row.date === date)?.reduce((a: any, c: any) => a += c.availableData, 0) || 0;
        series.push(availableData);
      }
    } else if (t === 1) { // Weekly
      for (let i = 1; i <= 4; i++) {
        const weekStart = moment().subtract(i, 'weeks').startOf('week').format('MMM D');
        categories.push(`Week ${i} (${weekStart})`);
        const availableData = promotionData.filter((row: any) => {
          const rowDate = moment(row.date);
          return rowDate.isBetween(moment().subtract(i, 'weeks').startOf('week'), moment().subtract(i - 1, 'weeks').endOf('week'), null, '[]');
        }).reduce((sum: number, row: any) => sum + (row.availableData || 0), 0);
        series.push(availableData);
      }
    } else if (t === 2) { // Monthly
      for (let i = 11; i >= 0; i--) {
        const month = moment().subtract(i, 'months').format('YYYY-MM');
        categories.push(month);
        const availableData = promotionData.filter((row: any) => moment(row.date).isSame(moment().subtract(i, 'months'), 'month')).reduce((sum: number, row: any) => sum + (row.availableData || 0), 0);
        series.push(availableData);
      }
    } else if (t === 3) { // Yearly
      for (let i = 5; i >= 0; i--) {
        const year = moment().subtract(i, 'years').format('YYYY');
        categories.push(year);
        const availableData = promotionData.filter((row: any) => moment(row.date).isSame(moment().subtract(i, 'years'), 'year')).reduce((sum: number, row: any) => sum + (row.availableData || 0), 0);
        series.push(availableData);
      }
    }

    // Update state with the generated categories and series
    setChtData({ cat: categories, ser: series });
  };

  useEffect(() => {
    getProgress(parseInt(props.tab));
  }, [props.tab]);


  const chartData: { series: { name: string, data: any }[], options: ApexOptions } = {
    series: [
      {
        name: 'Total Revenue',
        data: chData.ser,
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 1,
      },
      colors: [theme.palette.secondary.main],
      xaxis: {
        categories: chData.cat,
        title: {
          text: 'Date',
        },
      },
      yaxis: {
        title: {
          text: 'Total Revenue (US$)',
        },
      },
      title: {
        text: 'Promotions Revenue Over Time',
        align: 'center',
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: [theme.palette.info.dark],
          inverseColors: false,
        },
      },
      noData: {
        text: 'No Data Available.',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: theme.palette.secondary.main,
          fontSize: '2rem',
        }
      }
    },
  };

  return (
    <>
      <AppReactApexCharts type='area' width='100%' height={450} options={chartData.options} series={chartData.series} />
    </>
  );
};

export default Chart;
