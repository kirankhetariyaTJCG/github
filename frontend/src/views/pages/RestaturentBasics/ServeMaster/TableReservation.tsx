'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, TextField, InputAdornment, Typography, Switch, LoadingButton, Collapse, CircularProgress } from '@/Helper/MUIImports'

// Third Party Imports
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'
import { editRestaurentData } from '@/redux-store/Restaurant'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import AppUtils from '@/Helper/AppUtils'

interface Values {
  reservationTableMaxTime: number,
  reservationTableMinTime: number,
  reservationTableHoldTimeIfLate: number,
  reservationTableMaxGuests: number,
  reservationTableMinGuests: number,
  allowsGuestPreOrder: boolean
}

const TableReservationView = () => {

  // Hooks
  const dispatch = useDispatch()
  const { restaurant, loading } = useSelector((state: any) => state.restaurant);

  // State
  const [isReserve, setReserve] = useState<boolean>(restaurant?.has_table_reservation ?? false)

  const initialValues: Values = {
    reservationTableMaxTime: 8,
    reservationTableMinTime: 15,
    reservationTableHoldTimeIfLate: 15,
    reservationTableMaxGuests: 8,
    reservationTableMinGuests: 1,
    allowsGuestPreOrder: false
  }

  const schema = yup.object().shape({
    reservationTableMaxTime: yup
      .number()
      .min(1, 'Time must be at least 1 days')
      .required(`${ErrorConstants.MAX_TIME_ERROR} in advance`),
    reservationTableMinTime: yup
      .number()
      .min(15, 'Time must be at least 15 minutes')
      .required(`${ErrorConstants.MIN_TIME_ERROR} in advance`),
    reservationTableHoldTimeIfLate: yup
      .number()
      .min(5, 'Time must be at least 5 minutes')
      .required(ErrorConstants.MAX_TIME_ERROR),
    reservationTableMaxGuests: yup.number().required(`${ErrorConstants.MAXIMUM_ERROR} of guests`),
    reservationTableMinGuests: yup
      .number()
      .min(1, 'People must be at least 1')
      .required(`${ErrorConstants.MINIMUM_ERROR} of guests`),
    allowsGuestPreOrder: yup.boolean()
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values: Values) => {
      const TableReservationData = isReserve
        ? {
          reservation_table_min_guests: Number(values.reservationTableMinGuests),
          reservation_table_max_guests: Number(values.reservationTableMaxGuests),
          allows_guest_pre_order: values.allowsGuestPreOrder,
          reservation_table_min_time: Number(values.reservationTableMinTime),
          reservation_table_max_time: Number(values.reservationTableMaxTime),
          reservation_table_hold_time_if_late: Number(values.reservationTableHoldTimeIfLate),
          has_table_reservation: isReserve
        }
        : {
          reservation_table_min_guests: 1,
          reservation_table_max_guests: 8,
          allows_guest_pre_order: false,
          reservation_table_min_time: 15,
          reservation_table_max_time: 1,
          reservation_table_hold_time_if_late: 5,
          has_table_reservation: isReserve
        }
      dispatch(editRestaurantDetail({
        data: {
          id: restaurant._id,
          ...TableReservationData
        },
        old_restaurant_data: restaurant
      }))
      dispatch(editRestaurentData({ data: { has_table_reservation: isReserve }, isServe: true }))
    }
  })

  const handleChange = (e: any) => formik.setFieldValue(e.target.name, e.target.value === '0' ? 1 : AppUtils.parseNumber(e.target.value))


  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object?.keys(restaurant)?.length > 0) {
      if (restaurant?.has_table_reservation) {
        formik.setFieldValue('reservationTableMaxTime', restaurant?.reservation_table_max_time ?? 1)
        formik.setFieldValue('reservationTableMinTime', restaurant?.reservation_table_min_time ?? 15)
        formik.setFieldValue('reservationTableHoldTimeIfLate', restaurant?.reservation_table_hold_time_if_late ?? 5)
        formik.setFieldValue('reservationTableMaxGuests', restaurant?.reservation_table_max_guests ?? 0)
        formik.setFieldValue('reservationTableMinGuests', restaurant?.reservation_table_min_guests ?? 1)
        formik.setFieldValue('allowsGuestPreOrder', restaurant?.allows_guest_pre_order ?? false)
      }
    }
  }, [restaurant])

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
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 700 }}>Table Reservation</Typography>
        <LoadingButton
          variant='contained'
          loading={loading}
          loadingPosition='start'
          startIcon={<Icon icon={'material-symbols:save-rounded'} />}
          onClick={() => formik.handleSubmit()}
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
        <Typography sx={{ fontWeight: 500, width: '-webkit-fill-available' }}>
          Do you offer table reservation?
        </Typography>
        <Switch
          checked={isReserve}
          disabled={loading}
          onChange={(e: any) => {
            setReserve(e.target.checked)
            // dispatch(editRestaurantDetail({
            //   data: {
            //     id: restaurant?._id,
            //     has_table_reservation: e.target.checked
            //   },
            //   old_restaurant_data: restaurant
            // }));
            // dispatch(editRestaurentData({ data: { has_table_reservation: e.target.checked }, isServe: true }))
          }}
        />
      </Box>
      <Collapse in={isReserve}>
        <Box
          sx={{
            width: '100%',
            pt: 4,
            px: 4,
            overflow: 'auto',
            height: 'calc(100vh - 19.5rem)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}
          >
            <Box
              sx={{
                border: theme => `1px solid ${theme.palette.divider}`,
                p: 4,
                borderRadius: '8px',
                width: { sm: '50%' }
              }}
            >
              <Typography sx={{ fontWeight: 600, pb: 2, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
                Guests
              </Typography>
              <Box sx={{ my: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 2, sm: 4 },
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}
                >
                  <Typography sx={{ fontWeight: 500, width: '-webkit-fill-available' }}>Minimum Guests:</Typography>
                  <TextField
                    fullWidth
                    name='reservationTableMinGuests'
                    placeholder='Enter Minimum Guests'
                    value={formik.values.reservationTableMinGuests}
                    onChange={handleChange}
                    error={formik.touched.reservationTableMinGuests && Boolean(formik.errors.reservationTableMinGuests)}
                    helperText={formik.touched.reservationTableMinGuests && formik.errors.reservationTableMinGuests}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Typography
                            sx={{
                              fontWeight: 400,
                              borderLeft: theme => `1px solid ${theme.palette.divider}`,
                              pl: 2,
                              width: '4rem',
                              textAlign: 'right'
                            }}
                          >
                            People
                          </Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 2, sm: 4 },
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <Typography sx={{ fontWeight: 500, width: '-webkit-fill-available' }}>Maximum Guests:</Typography>
                <TextField
                  fullWidth
                  name='reservationTableMaxGuests'
                  placeholder='Enter Maximum Guests'
                  value={formik.values.reservationTableMaxGuests}
                  onChange={handleChange}
                  error={formik.touched.reservationTableMaxGuests && Boolean(formik.errors.reservationTableMaxGuests)}
                  helperText={formik.touched.reservationTableMaxGuests && formik.errors.reservationTableMaxGuests}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Typography
                          sx={{
                            fontWeight: 400,
                            borderLeft: theme => `1px solid ${theme.palette.divider}`,
                            pl: 2,
                            width: '4rem',
                            textAlign: 'right'
                          }}
                        >
                          People
                        </Typography>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                border: theme => `1px solid ${theme.palette.divider}`,
                p: 4,
                borderRadius: '8px',
                width: { sm: '50%' }
              }}
            >
              <Typography sx={{ fontWeight: 600, pb: 2, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
                Time
              </Typography>
              <Box sx={{ my: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 2, sm: 4 },
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}
                >
                  <Typography sx={{ fontWeight: 500, width: '-webkit-fill-available' }}>
                    Minimum time in advance:
                  </Typography>
                  <TextField
                    name='reservationTableMinTime'
                    placeholder='Enter Minimum time in advance'
                    value={formik.values.reservationTableMinTime}
                    onChange={handleChange}
                    error={
                      formik.touched.reservationTableMinTime &&
                      Boolean(formik.errors.reservationTableMinTime)
                    }
                    helperText={
                      formik.touched.reservationTableMinTime && formik.errors.reservationTableMinTime
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Typography
                            sx={{
                              fontWeight: 400,
                              borderLeft: theme => `1px solid ${theme.palette.divider}`,
                              pl: 2,
                              width: '4rem',
                              textAlign: 'right'
                            }}
                          >
                            Minutes
                          </Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 2, sm: 4 },
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <Typography sx={{ fontWeight: 500, width: '-webkit-fill-available' }}>
                  Maximum time in advance:
                </Typography>
                <TextField
                  name='reservationTableMaxTime'
                  placeholder='Enter Maximum time in advance'
                  value={formik.values.reservationTableMaxTime}
                  onChange={handleChange}
                  error={
                    formik.touched.reservationTableMaxTime && Boolean(formik.errors.reservationTableMaxTime)
                  }
                  helperText={formik.touched.reservationTableMaxTime && formik.errors.reservationTableMaxTime}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Typography
                          sx={{
                            fontWeight: 400,
                            borderLeft: theme => `1px solid ${theme.palette.divider}`,
                            pl: 2,
                            width: '4rem',
                            textAlign: 'right'
                          }}
                        >
                          Days
                        </Typography>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 4, width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                gap: { xs: 2, sm: 4 },
                justifyContent: 'space-between',
                border: theme => `1px solid ${theme.palette.divider}`,
                p: 4,
                borderRadius: '8px',
                flexDirection: { xs: 'column', sm: 'row' }
              }}
            >
              <Typography sx={{ fontWeight: 500, width: '-webkit-fill-available' }}>Reservation Interval:</Typography>
              <TextField
                fullWidth
                name='reservationTableHoldTimeIfLate'
                placeholder='Enter Reservation Interval'
                value={formik.values.reservationTableHoldTimeIfLate}
                onChange={handleChange}
                error={formik.touched.reservationTableHoldTimeIfLate && Boolean(formik.errors.reservationTableHoldTimeIfLate)}
                helperText={formik.touched.reservationTableHoldTimeIfLate && formik.errors.reservationTableHoldTimeIfLate}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          borderLeft: theme => `1px solid ${theme.palette.divider}`,
                          pl: 2,
                          width: '4rem',
                          textAlign: 'right'
                        }}
                      >
                        Minutes
                      </Typography>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                width: '100%',
                border: theme => `1px solid ${theme.palette.divider}`,
                p: 4,
                borderRadius: '8px',
                justifyContent: 'space-between'
              }}
            >
              <Typography sx={{ fontWeight: 500, width: '-webkit-fill-available' }}>
                Allow guests to pre-order food when booking a table
              </Typography>
              <Switch
                checked={formik.values.allowsGuestPreOrder}
                onChange={(e: any) => formik.setFieldValue('allowsGuestPreOrder', e.target.checked)}
              />
            </Box>
          </Box>
        </Box>
      </Collapse>
      <Collapse in={!isReserve}>
        <Box sx={{ p: 4, overflow: 'auto', height: 'calc(100vh - 20.5rem)' }}>
          <Typography sx={{ color: theme => theme.palette.text.disabled, textAlign: 'center', fontSize: '1.2rem' }}>
            Get more sales from online table reservation
          </Typography>
          <Box
            component={'img'}
            src='/images/Setup/TableReservation.svg'
            sx={{ width: '100%', height: 'auto', mt: 2 }}
          />
        </Box>
      </Collapse>
    </>
  )
}

export default TableReservationView
