// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import LoadingButton from '@mui/lab/LoadingButton'

// Icon Imports
import Icon from '@/@core/components/Icon'

const Step1 = () => {
  // State
  const [isExpand, setIsExpand] = useState<number | null>(null)

  const arr = ['Location Details', 'Opening hours', 'Website URL', 'Menu URL', 'Order URL']

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component={Icon}
            icon={'icon-park-twotone:caution'}
            fontSize={35}
            sx={{ color: theme => theme.palette.warning.main }}
          />
          <Typography sx={{ fontWeight: 700, ml: 4 }}>Improvements required!</Typography>
        </Box>
        <LoadingButton size='small' sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}>
          Re-Scan
        </LoadingButton>
      </Box>
      <Divider sx={{ my: 6 }} />
      <Typography sx={{ fontWeight: 500 }}>
        Your Google Business listing need to be optimized for great sales conversion
      </Typography>
      <Box sx={{ my: 4 }}>
        {Array.isArray(arr) &&
          arr?.length > 0 &&
          arr?.map((item: any, index: number) => {
            return (
              <Accordion
                key={index}
                expanded={isExpand === index}
                onChange={() => (isExpand === index ? setIsExpand(null) : setIsExpand(index))}
                sx={{
                  mb: 4,
                  boxShadow: 'none',
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '6px !important',
                  '&:before': { bgcolor: 'transparent' }
                }}
              >
                <AccordionSummary>
                  <Box
                    component={Icon}
                    icon={'icon-park-twotone:caution'}
                    sx={{ color: theme => theme.palette.warning.main }}
                  />
                  <Typography sx={{ fontWeight: '600 !important', fontSize: '1rem', ml: 2 }}>
                    {item} (optimization required)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        border: theme => `1px solid ${theme.palette.divider}`,
                        borderRadius: '6px',
                        p: 2,
                        width: { sm: '50%' },
                        mr: { sm: 2.5 }
                      }}
                    >
                      <Typography sx={{ fontWeight: 600 }}>Google Business:</Typography>
                      <Box
                        sx={{ p: 4, bgcolor: theme => theme.palette.customColors.bodyBg, textAlign: 'center', mt: 2 }}
                      >
                        <Typography sx={{ fontWeight: 500 }}>Listing without info, we can fix this for you</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        border: theme => `1px solid ${theme.palette.divider}`,
                        borderRadius: '6px',
                        p: 2,
                        width: { sm: '50%' },
                        ml: { sm: 2.5 }
                      }}
                    >
                      <Typography sx={{ fontWeight: 600 }}>Will be replaced with:</Typography>
                      <Box sx={{ pb: 14, mt: 2 }}>
                        <Typography
                          sx={{ fontWeight: 600, color: theme => `${theme.palette.primary.main} !important` }}
                        >
                          sahajanandrestaurant.com
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            )
          })}
      </Box>
    </>
  )
}

export default Step1
