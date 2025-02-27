'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tab from '@mui/material/Tab'
import useMediaQuery from '@mui/material/useMediaQuery'
import TabContext from '@mui/lab/TabContext'

// Custom Imports
import PaidService from './PaidService'
import BillingService from './BillingService'
import Languages from './Languages'
import Notifications from './Notifications'
import CustomTabList from '@/@core/components/mui/TabList'

// Icon Imports
import Icon from '@/@core/components/Icon'

const AccountSettingsView = () => {
  // State
  const [value, setValue] = useState<string>('0')
  const arr = [
    { label: 'Paid Service', icon: 'fluent:money-hand-24-regular', component: <PaidService /> },
    { label: 'Billing Service', icon: 'uil:bill', component: <BillingService /> },
    { label: 'Notifications', icon: 'majesticons:bell-line', component: <Notifications /> },
    { label: 'Supported Languages', icon: 'ic:round-translate', component: <Languages /> }
  ]

  // Media Query
  const hideText = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  return (
    <>
      <TabContext value={value}>
        <Card sx={{ width: '100%', height: '100%' }}>
          <Box>
            <CustomTabList onChange={(_: any, newValue: string) => setValue(newValue)} variant='fullWidth'>
              {Array.isArray(arr) &&
                arr?.length > 0 &&
                arr?.map((item: any, index: number) => {
                  return (
                    <Tab
                      key={index}
                      value={index.toString()}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                          <Box component={Icon} icon={item?.icon} sx={{ pb: 1 }} />
                          {!hideText && item?.label}
                        </Box>
                      }
                    />
                  )
                })}
            </CustomTabList>
          </Box>
          <Box>{arr[Number(value)]?.component}</Box>
        </Card>
      </TabContext>
    </>
  )
}

export default AccountSettingsView
