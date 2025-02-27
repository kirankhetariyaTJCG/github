'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, TextField, InputAdornment } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import PlaceAutocomplete from '@/@core/components/PlaceAutocomplete'
import CsMobileNo from '@/@core/components/CsMobileNo'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import AppUtils from '@/Helper/AppUtils'

interface NameData {
  name: string
  phone: string
  address: string
  tax: string
}

const Registration = () => {
  // States
  const [stdCode, setStdCode] = useState<{ value: string; label: string }>({ value: '91', label: '+91' })

  // Hooks
  const dispatch = useDispatch()
  const { restaurant, loading } = useSelector((state: any) => state.restaurant)

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object?.keys(restaurant)?.length > 0) {
      formik.setFieldValue('name', restaurant?.company?.company_name ?? '')
      formik.setFieldValue('address', restaurant?.company?.address ?? '')
      formik.setFieldValue('phone', restaurant?.company?.phone ?? '')
      formik.setFieldValue('company', restaurant?.company?.company ?? '')
      formik.setFieldValue('tax', restaurant?.company?.tax ?? '')
      formik.setFieldValue('officer', restaurant?.company?.officer ?? '')
      setStdCode({ value: String(restaurant?.country_code ?? 91), label: `+${restaurant?.country_code ?? 91}` })
    }
  }, [restaurant])

  const schema = yup.object().shape({
    name: yup.string().required(ErrorConstants.NAME_ERROR),
    phone: yup.string().required(ErrorConstants.MOBILE_NO_ERROR)
  })

  const values: NameData = {
    name: '',
    phone: '',
    address: '',
    tax: ''
  }

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (values: NameData) => {
      const payload = {
        company_name: values?.name,
        address: values?.address,
        country_code: Number(stdCode?.value),
        phone: values?.phone,
        agree: true,
        tax: values?.tax,
      }
      dispatch(editRestaurantDetail({
        data:{ company: payload, id: restaurant?._id },
        old_restaurant_data: restaurant
      }))
    }
  })

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '-webkit-fill-available',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 6,
          border: theme => `1px solid ${theme.palette.divider}`,
          borderRadius: '10px',
          width: '35rem'
        }}
        component={'form'}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Box>
          <TextField
            sx={{ mb: 6 }}
            fullWidth
            label='Company Name'
            placeholder='Enter Company Name'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'lets-icons:shop-light'} />
                </InputAdornment>
              )
            }}
          />
          <PlaceAutocomplete
            sx={{ mb: 6 }}
            label='Company Registration Address'
            placeholder='Enter Company Registration Address...'
            value={formik.values.address}
            onChange={(value: any, latLng?: { lat: number; lng: number }) => {
              formik.setFieldValue('address', value)
            }}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'mingcute:location-2-line'} />
                </InputAdornment>
              )
            }}
          />
          <CsMobileNo
            sx={{ width: '100%', mb: 6 }}
            fullWidth
            label={'Company Phone No'}
            name='phone'
            placeholder={'Enter Company Phone No'}
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            stdcode={stdCode}
            stdCodeChange={(val: { value: string; label: string; country_code_initials: string }) => {
              // formik.setFieldValue('country_code', val?.value)
              setStdCode(val)
            }}
          />
          <TextField
            sx={{ mb: 6 }}
            fullWidth
            label='Tax ID Number'
            placeholder='Enter Tax ID Number'
            name='tax'
            value={formik.values.tax}
            onChange={(e: any) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10)
              formik.handleChange(e)
            }}
            error={formik.touched.tax && Boolean(formik.errors.tax)}
            helperText={formik.touched.tax && formik.errors.tax}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon={'solar:user-id-linear'} />
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Box sx={{ textAlign: 'end' }}>
          <LoadingButton
            variant='contained'
            type='submit'
            loading={loading}
            loadingPosition='start'
            startIcon={loading ? <>&nbsp;</> : <></>}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Registration
