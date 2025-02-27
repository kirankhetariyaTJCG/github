'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, LoadingButton, Typography, TextField, InputAdornment, MenuItem, FormControl, Select, Switch, Collapse, FormHelperText } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'
import { editRestaurentData } from '@/redux-store/Restaurant'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface Values {
  pickupOrderAdvanceMinTime: string
  pickupType: string
  deliveryOrderAdvanceMaxTime: string
  deliveryOrderAdvanceMinTime: string
  deliveryType: string
  pickupOrderAdvanceMaxTime: string
  allowsImmediateOrder: boolean
}

const values: Values = {
  deliveryOrderAdvanceMaxTime: '4',
  deliveryOrderAdvanceMinTime: '90',
  deliveryType: 'minutes',
  pickupOrderAdvanceMinTime: '1',
  pickupType: 'hours',
  pickupOrderAdvanceMaxTime: '4',
  allowsImmediateOrder: false
}

const ScheduledOrdersView = () => {
  // State
  const { restaurant, loading } = useSelector((state: any) => state.restaurant);
  const [isReserve, setReserve] = useState<boolean>(restaurant?.has_schedule_order ?? false)

  // Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object?.keys(restaurant)?.length > 0) {
      if (restaurant?.has_schedule_order) {
        formik.setFieldValue('deliveryOrderAdvanceMaxTime', restaurant?.delivery_order_advance_max_time ?? 4)
        formik.setFieldValue('deliveryOrderAdvanceMinTime', restaurant?.delivery_order_advance_min_time ?? 90)
        formik.setFieldValue('pickupOrderAdvanceMinTime', restaurant?.pickup_order_advance_min_time ?? 1)
        formik.setFieldValue('pickupOrderAdvanceMaxTime', restaurant?.pickup_order_advance_max_time ?? 4)
        formik.setFieldValue('allowsImmediateOrder', restaurant?.allows_immediate_order ?? false)
        formik.setFieldValue('pickupType', restaurant?.pickup_type ?? "hours")
        formik.setFieldValue('deliveryType', restaurant?.delivery_type ?? 'minutes')
      }
    }
  }, [restaurant])

  const formik = useFormik({
    initialValues: values,
    onSubmit: (values: Values) => {
      console.log("values", values);
      const scheduleOrderData = isReserve ? {
        delivery_order_advance_min_time: Number(values.deliveryOrderAdvanceMinTime),
        delivery_order_advance_max_time: Number(values.deliveryOrderAdvanceMaxTime),
        pickup_order_advance_min_time: Number(values.pickupOrderAdvanceMinTime),
        pickup_order_advance_max_time: Number(values.pickupOrderAdvanceMaxTime),
        has_schedule_order: isReserve,
        allows_immediate_order: values.allowsImmediateOrder,
        pickup_type: values.pickupType,
        delivery_type: values.deliveryType
      } : {
        delivery_order_advance_min_time: 90,
        delivery_order_advance_max_time: 4,
        pickup_order_advance_min_time: 1,
        pickup_order_advance_max_time: 4,
        has_schedule_order: isReserve,
        allows_immediate_order: false,
        pickup_type: 'hours',
        delivery_type: 'minutes'
      }
      dispatch(editRestaurantDetail
        ({
          data: {
            id: restaurant._id,
            ...scheduleOrderData,
          },
          old_restaurant_data: restaurant
        }))
      dispatch(editRestaurentData({ data: { has_schedule_order: isReserve }, isServe: true }))

    }
  })

  const handleChange = (e: any) => formik.setFieldValue(e.target.name, AppUtils.parseNumber(e.target.value))

  return (
    <>
      <Box
        sx={{
          pb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 700 }}>Scheduled Orders</Typography>
        <LoadingButton
          variant='contained'
          onClick={() => formik.handleSubmit()}
          loading={loading}
          loadingPosition='start'
          startIcon={<Icon icon={'material-symbols:save-rounded'} />}
        >
          Save
        </LoadingButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, sm: 4 },
          gap: 4,
          width: '100%',
          justifyContent: 'space-between',
          borderBottom: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography sx={{ fontWeight: 500 }}>Let clients request a time</Typography>
        <Switch
          checked={isReserve}
          onChange={(e: any) => {
            setReserve(e.target.checked)
          }}
        />
      </Box>
      <Collapse in={isReserve}>
        <Box sx={{ p: 4, overflow: 'auto', height: 'calc(100vh - 19.5rem)' }}>
          <Box sx={{ display: 'flex', gap: 4, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, p: 4, borderRadius: '8px' }}>
              <Typography sx={{ fontWeight: 600, pb: 2, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
                Settings for pickup
              </Typography>
              <Box sx={{ my: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: { sm: 'center' },
                    gap: { xs: 2, sm: 4 },
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>Minimum time in advance:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, width: { sm: '50%' } }}>
                    <TextField
                      sx={{ width: '100%' }}
                      fullWidth
                      name='pickupOrderAdvanceMinTime'
                      value={formik.values.pickupOrderAdvanceMinTime}
                      onChange={handleChange}
                      error={formik.touched.pickupOrderAdvanceMinTime && Boolean(formik.errors.pickupOrderAdvanceMinTime)}
                      helperText={formik.touched.pickupOrderAdvanceMinTime && formik.errors.pickupOrderAdvanceMinTime}
                    />
                    <FormControl fullWidth>
                      <Select
                        name='pickupType'
                        value={formik.values.pickupType}
                        onChange={(e: any) => formik.setFieldValue('pickupType', e.target.value)}
                        error={formik.touched.pickupType && Boolean(formik.errors.pickupType)}
                      >
                        <MenuItem value={'hours'}>Hours</MenuItem>
                        <MenuItem value={'minutes'}>Minutes</MenuItem>
                        <MenuItem value={'days'}>Days</MenuItem>
                      </Select>
                      {formik.touched.pickupType && Boolean(formik.errors.pickupType) && (
                        <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                          {formik.touched.pickupType && formik.errors.pickupType}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: { sm: 'center' },
                  gap: { xs: 2, sm: 4 },
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>Maximum time in advance:</Typography>
                <Box sx={{ width: { sm: '50%' } }}>
                  <TextField
                    fullWidth
                    name='pickupOrderAdvanceMaxTime'
                    value={formik.values.pickupOrderAdvanceMaxTime}
                    onChange={handleChange}
                    error={formik.touched.pickupOrderAdvanceMaxTime && Boolean(formik.errors.pickupOrderAdvanceMaxTime)}
                    helperText={formik.touched.pickupOrderAdvanceMaxTime && formik.errors.pickupOrderAdvanceMaxTime}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Typography>Days</Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                  {formik.values.pickupOrderAdvanceMaxTime === '' && (
                    <Typography sx={{ textAlign: 'center' }}>This means the same day only!</Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, p: 4, borderRadius: '8px' }}>
              <Typography sx={{ fontWeight: 600, pb: 2, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
                Settings for delivery
              </Typography>
              <Box sx={{ my: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: { sm: 'center' },
                    gap: { xs: 2, sm: 4 },
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>Minimum time in advance:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, width: { sm: '50%' } }}>
                    <TextField
                      sx={{ width: '100%' }}
                      fullWidth
                      name='deliveryOrderAdvanceMinTime'
                      value={formik.values.deliveryOrderAdvanceMinTime}
                      onChange={handleChange}
                      error={formik.touched.deliveryOrderAdvanceMinTime && Boolean(formik.errors.deliveryOrderAdvanceMinTime)}
                      helperText={formik.touched.deliveryOrderAdvanceMinTime && formik.errors.deliveryOrderAdvanceMinTime}
                    />
                    <FormControl fullWidth>
                      <Select
                        name='deliveryType'
                        value={formik.values.deliveryType}
                        onChange={(e: any) => formik.setFieldValue('deliveryType', e.target.value)}
                        error={formik.touched.deliveryType && Boolean(formik.errors.deliveryType)}
                      >
                        <MenuItem value={'hours'}>Hours</MenuItem>
                        <MenuItem value={'minutes'}>Minutes</MenuItem>
                        <MenuItem value={'days'}>Days</MenuItem>
                      </Select>
                      {formik.touched.deliveryType && Boolean(formik.errors.deliveryType) && (
                        <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
                          {formik.touched.deliveryType && formik.errors.deliveryType}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: { sm: 'center' },
                  gap: { xs: 2, sm: 4 },
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>Maximum time in advance:</Typography>
                <Box sx={{ width: { sm: '50%' } }}>
                  <TextField
                    fullWidth
                    name='deliveryOrderAdvanceMaxTime'
                    value={formik.values.deliveryOrderAdvanceMaxTime}
                    onChange={handleChange}
                    error={formik.touched.deliveryOrderAdvanceMaxTime && Boolean(formik.errors.deliveryOrderAdvanceMaxTime)}
                    helperText={formik.touched.deliveryOrderAdvanceMaxTime && formik.errors.deliveryOrderAdvanceMaxTime}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Typography>Days</Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                  {formik.values.deliveryOrderAdvanceMaxTime === '' && (
                    <Typography sx={{ textAlign: 'center' }}>This means the same day only!</Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          {/* <Typography sx={{ fontWeight: 600, pb: 2, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
            Other
          </Typography> */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
              border: theme => `1px solid ${theme.palette.divider}`,
              borderRadius: '8px',
              p: 2
            }}
          >
            <Typography sx={{ pl: 2, fontWeight: 500 }}>
              Hide “as soon as possible” (allow only scheduled orders)
            </Typography>
            <Switch
              checked={formik.values.allowsImmediateOrder}
              onChange={(e: any) => formik.setFieldValue('allowsImmediateOrder', e.target.checked)}
            />
          </Box>
        </Box>
      </Collapse>
    </>
  )
}

export default ScheduledOrdersView
