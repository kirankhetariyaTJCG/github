'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import { Box, Card, Tab, TabContext, useMediaQuery } from '@/Helper/MUIImports'

// Custom Imports
import Registration from './Registration'
import TermsAndCondition from './Terms&Condition'
import PrivacyPolicy from './PrivacyPolicy'
import CustomTabList from '@/@core/components/mui/TabList'

// Icon Imports
import Icon from '@/@core/components/Icon'

const DetailsView = () => {
  // State
  const [value, setValue] = useState<string>('0')
  const arr = [
    { label: 'Offical Details', icon: 'fluent:document-lock-32-regular', component: <Registration /> },
    { label: 'Privacy Policy', icon: 'iconoir:privacy-policy', component: <PrivacyPolicy /> },
    { label: 'Terms & Conditions', icon: 'fluent:document-arrow-right-24-regular', component: <TermsAndCondition /> }
  ]

  // Media Query
  const hideText = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  return (
    <>
      <TabContext value={value}>
        <Card sx={{ width: '100%', height: '100%' }}>
          <CustomTabList onChange={(_: any, newValue: string) => setValue(newValue)} variant='fullWidth'>
            {Array.isArray(arr) &&
              arr?.length > 0 &&
              arr?.map((item: any, index: number) => {
                return (
                  <Tab
                    key={index}
                    value={index.toString()}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                        <Box component={Icon} icon={item?.icon} sx={{ pr: 1 }} />
                        {!hideText && item?.label}
                      </Box>
                    }
                  />
                )
              })}
          </CustomTabList>
          <Box sx={{ overflow: 'auto', height: 'calc(100vh - 8.5rem)' }}>{arr[Number(value)]?.component}</Box>
        </Card>
      </TabContext>
    </>
  )
}

export default DetailsView
