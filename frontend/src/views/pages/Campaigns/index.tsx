'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import LoadingButton from '@mui/lab/LoadingButton'

// Custom Imports
import AddCampaign from './AddCampaign'

// Icon Imports
import Icon from '@/@core/components/Icon'

const CampaignView = () => {
  // State
  const [isStart, setIsStart] = useState<boolean>(false)
  const [item, setItem] = useState<any>({})

  const campaignArr = [
    {
      icon: 'gridicons:cart',
      heading: 'New clients',
      title: 'Encourage second order',
      desc: '60% of the new clients never place a second order. Offer a time-limited incentive to motivate your clients to return.'
    },
    {
      icon: 'mingcute:sleep-line',
      heading: 'Clients that are slipping away',
      title: 'Re-engage clients',
      desc: 'Revive interest with limited time offers. Re-engage these clients before you lose them.'
    },
    {
      icon: 'ic:round-remove-shopping-cart',
      heading: 'All clients',
      title: 'Cart abandonment',
      desc: 'Use the cart abandonment notifications to remind distracted clients of their uncompleted orders.'
    }
  ]

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <Collapse in={!isStart}>
        <Typography
          sx={{
            fontSize: '1.125rem',
            fontWeight: 500,
            p: 4,
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          Campaigns
        </Typography>

        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {Array.isArray(campaignArr) &&
              campaignArr?.length > 0 &&
              campaignArr?.map((item: any, index: number) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <Box
                      sx={{
                        border: theme => `1px solid ${theme.palette.divider}`,
                        mb: 4,
                        borderRadius: '8px',
                        minHeight: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Box sx={{ p: 4, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.9rem', textTransform: 'uppercase', mr: 4 }}>
                          {item?.heading}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column',
                          flex: 1,
                          justifyContent: 'space-between',
                          p: 4
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            mt: 4,
                            textAlign: 'center'
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: theme => theme.palette.primary.lightOpacity,
                              borderRadius: '50%',
                              p: 3,
                              display: 'flex'
                            }}
                          >
                            <Box
                              component={Icon}
                              icon={item?.icon}
                              fontSize={35}
                              sx={{ color: theme => theme.palette.primary.main }}
                            />
                          </Box>
                          <Box sx={{ my: 4 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '1.2rem', mb: 2 }}>{item?.title}</Typography>
                            <Typography sx={{ fontWeight: 400, fontSize: '0.9rem' }}>{item?.desc}</Typography>
                          </Box>
                        </Box>
                        <LoadingButton
                          size='large'
                          fullWidth
                          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                          onClick={() => {
                            setItem({ ...item, index: index })
                            setIsStart(true)
                          }}
                        >
                          Start
                        </LoadingButton>
                      </Box>
                    </Box>
                  </Grid>
                )
              })}
          </Grid>
        </Box>
      </Collapse>
      <Collapse in={isStart}>
        <AddCampaign item={item} setIsStart={setIsStart} />
      </Collapse>
    </Card>
  )
}

export default CampaignView
