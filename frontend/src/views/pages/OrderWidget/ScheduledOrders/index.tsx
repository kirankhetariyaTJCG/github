'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, LoadingButton, Switch, Typography, Card, TextField, InputAdornment, Collapse, Divider, FormControlLabel, Checkbox } from '@/Helper/MUIImports'

// Third Party Imports
import { useDispatch, useSelector } from 'react-redux'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const ScheduledOrdersView = () => {
  // State
  const [isSchdule, setIsSchdule] = useState<boolean>(false)
  const [pickup, setPickup] = useState<number>(0)
  const [delivery, setDelivery] = useState<number>(0)
  const [isPickup, setIsPickup] = useState<boolean>(false)
  const [isDelivery, setIsDelivery] = useState<boolean>(false)

  // Hooks
  const { restaurant, loading } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object.keys(restaurant)?.length > 0) {
      setIsPickup(AppUtils.checkValue(restaurant?.order_later_limit_pickup))
      setPickup(restaurant?.order_later_limit_pickup ?? 0)
      setIsDelivery(AppUtils.checkValue(restaurant?.order_later_limit_delivery))
      setDelivery(restaurant?.order_later_limit_delivery ?? 0)
      setIsSchdule(restaurant?.limit_orders_enabled)
    }
  }, [restaurant])

  const handleNext = () => {
    const data = {
      id: restaurant?._id,
      limit_orders_enabled: isSchdule,
      order_later_limit_delivery: delivery,
      order_later_limit_pickup: pickup
    }
    dispatch(editRestaurantDetail({ data, old_restaurant_data: restaurant }))
    router.push('/online-ordering/order-widget/service-fees')
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ width: { xs: '100%', lg: '65%' } }}>
        <Box
          sx={{
            p: 4,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Limit Scheduled Orders</Typography>
          <LoadingButton
            variant='contained'
            onClick={handleNext}
            loading={loading}
            loadingPosition='start'
            startIcon={<Icon icon="material-symbols:save" fontSize='5.5rem' />}>
            Save
          </LoadingButton>
        </Box>
        <Box sx={{ p: 6, width: { sm: '40rem' }, mx: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>Do you need to limit scheduled orders by time slots?</Typography>
            <Switch checked={isSchdule} onChange={(e: any) => setIsSchdule(e.target.checked)} />
          </Box>
          <Divider sx={{ my: 4 }} />
          <Collapse in={isSchdule}>
            <FormControlLabel
              control={<Checkbox checked={isPickup} onChange={() => setIsPickup(!isPickup)} />}
              label='Limit pickup orders'
            />
            <Collapse in={isPickup} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                sx={{ width: '100%', pl: 4, mt: 1 }}
                value={pickup}
                onChange={(e: any) => setPickup(Number(AppUtils.parseNumber(e.target.value)))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Typography>Orders per 15 mins</Typography>
                    </InputAdornment>
                  )
                }}
              />
            </Collapse>
            <FormControlLabel
              control={<Checkbox checked={isDelivery} onChange={() => setIsDelivery(!isDelivery)} />}
              label='Limit delivery orders'
            />
            <Collapse in={isDelivery} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                sx={{ width: '100%', pl: 4, mt: 1 }}
                value={delivery}
                onChange={(e: any) => setDelivery(Number(AppUtils.parseNumber(e.target.value)))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Typography>orders per 120 min</Typography>
                    </InputAdornment>
                  )
                }}
              />
            </Collapse>
          </Collapse>
          <Collapse in={!isSchdule}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                component={'img'}
                src='/images/OrderWidget/LimitedOrders.svg'
                sx={{ width: { sm: '25rem' }, height: 'auto' }}
              />
            </Box>
          </Collapse>
        </Box>
      </Card>
    </Box>
  )
}

export default ScheduledOrdersView
