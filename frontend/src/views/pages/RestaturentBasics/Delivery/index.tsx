'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useState } from 'react'

// MUI Imports
import { Box, Grid, Typography, LoadingButton, Button, ButtonGroup, Card, Divider } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'

// Custom Imports
import Drawer from './Drawer'
import DeliveryMap from './Map'
import AdvanceSettings from './AdvanceSettings'

// Icon Imports
import Icon from '@/@core/components/Icon'

const DeliveryView = () => {
  // State
  const [isAdvance, setIsAdvance] = useState<boolean>(false)
  const [isMap, setIsMap] = useState<boolean>(true)

  // Hooks
  const router = useRouter()
  const { restaurant } = useSelector((state: any) => state.restaurant)

  return (
    <>
      <Card sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
        {!restaurant?.has_delivery && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              height: '100%'
            }}
          >
            <Box
              sx={{ display: 'flex', p: 4, bgcolor: theme => theme.palette.primary.lightOpacity, borderRadius: '50%' }}
            >
              <Box
                component={Icon}
                icon={'hugeicons:delivery-truck-02'}
                sx={{ color: theme => theme.palette.primary.main, fontSize: 100 }}
              />
            </Box>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, my: 4 }}>
              Please enable the delivery option from Serve Master
            </Typography>
            <LoadingButton
              size='large'
              sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              onClick={() => router.push('/setup/restaurant/serve-master')}
            >
              Go To Serve Master
            </LoadingButton>
          </Box>
        )}
        {restaurant?.has_delivery && (
          <>
            <ButtonGroup variant='outlined' sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'center' }}>
              <Button variant={isMap ? 'contained' : 'outlined'} onClick={() => setIsMap(true)}>
                Map
              </Button>
              <Button variant={!isMap ? 'contained' : 'outlined'} onClick={() => setIsMap(false)}>
                Zone
              </Button>
            </ButtonGroup>
            <Divider sx={{ display: { xs: 'flex', sm: 'none' }, my: { xs: 4, sm: 0 } }} />
            <Grid container sx={{ width: '100%', height: '100%' }}>
              <Grid item xs={12} sm={8} sx={{ display: { xs: isMap ? 'flex' : 'none', sm: 'flex' } }}>
                <Box sx={{ width: '100%', height: '100%' }}>
                  <DeliveryMap setIsAdvance={setIsAdvance} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ display: { xs: !isMap ? 'flex' : 'none', sm: 'flex' } }}>
                <Drawer />
              </Grid>
            </Grid>
          </>
        )}
      </Card>

      {isAdvance && <AdvanceSettings setOpen={setIsAdvance} open={isAdvance} />}

    </>
  )
}

export default DeliveryView
