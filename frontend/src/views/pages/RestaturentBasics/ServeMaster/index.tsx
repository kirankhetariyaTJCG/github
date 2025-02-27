'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import { Card, Typography, Box } from '@/Helper/MUIImports'

// Custom Imports
import Services from './Services'
import TableReservation from './TableReservation'
import ScheduledOrders from './ScheduledOrders'

// Icon Imports
import Icon from '@/@core/components/Icon'

const ServeView = () => {
  // State

  const [value, setValue] = useState<number>(0)
  const arr = [
    {
      label: 'Services',
      title: 'Do you offer pickup from your location?',
      component: <Services />,
      icon: 'fluent:service-bell-24-regular'
    },
    {
      label: 'Table Reservation',
      title: 'Do you offer food delivery?',
      component: <TableReservation />,
      icon: 'lucide-lab:chairs-table-platter'
    },
    {
      label: 'Scheduled Orders',
      title: 'Do you offer on premise services?',
      component: <ScheduledOrders />,
      icon: 'mdi:book-clock-outline'
    }
  ]

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          width: '100%',
          px: 4,
          pb: 4
        }}
      >
        {Array.isArray(arr) &&
          arr?.length > 0 &&
          arr?.map((item: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  p: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', sm: 'space-between' },
                  border: theme =>
                    index === value ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                  bgcolor: theme => (index === value ? theme.palette.primary.lighterOpacity : '#fff'),
                  borderRadius: '8px',
                  width: '100%',
                  cursor: 'pointer'
                }}
                onClick={() => setValue(index)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      bgcolor: theme => theme.palette.primary.lightOpacity,
                      display: 'flex',
                      p: 2,
                      borderRadius: '50%'
                    }}
                  >
                    <Box component={Icon} icon={item?.icon} sx={{ color: theme => theme.palette.primary.main }} />
                  </Box>
                  <Typography sx={{ fontWeight: 500, display: { xs: 'none', sm: 'flex' } }}>{item?.label}</Typography>
                </Box>
              </Box>
            )
          })}
      </Box>
      <Card sx={{ width: '100%', height: 'calc(100vh - 11.5rem)', overflow: 'auto' }}>
        <Box sx={{ p: 4 }}>{value !== null && arr[value]?.component}</Box>
      </Card>
    </>
  )
}

export default ServeView
