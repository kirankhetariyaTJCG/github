'use client'

// React Imports
import { useMemo, useState, useEffect, useCallback } from 'react'

// MUI Imports
import { Box, LoadingButton, Card, Typography, Divider, TextField, InputAdornment, IconButton, Grid, Tooltip, Collapse, Switch } from '@/Helper/MUIImports'

// Third party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

// Custom Imports
import CsMap from '@/@core/components/CsMap'
import CsMobileNo from '@/@core/components/CsMobileNo'
import PlaceAutocomplete from '@/@core/components/PlaceAutocomplete'
import CustomBackdrop from '@/@core/components/CsBackdropLoader'

// Store Imports
import { sendVerificationEmail, editRestaurantDetail } from '@/redux-store/Restaurant/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface NameData {
  restaurant_name: string
  phone: string
  email: string
  zipcode: string
  address: string
  is_email_verified: boolean
  is_website: boolean
  website: string
  option_phones: { value: string; stdCode: { value: any; label: string } }[]
}

const DetailsView = () => {
  // State
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [stdCode, setStdCode] = useState<{ value: string; label: string }>({ value: '91', label: '+91' })
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 20.5937, lng: 78.9629 })
  const [zoom, setZoom] = useState<number>(1.8)

  // Hooks
  const dispatch = useDispatch()
  const { restaurant, loading } = useSelector((state: any) => state.restaurant)

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object.keys(restaurant)?.length > 0) {
      formik.setFieldValue('restaurant_name', restaurant?.name ?? '')
      setStdCode(
        restaurant?.phone?.includes(" ")
          ? (() => {
            const [code] = restaurant.phone.split(" ")

            return { value: code.replace("+", ""), label: code }
          })()
          : { value: "91", label: "+91" }
      )
      formik.setFieldValue('email', restaurant?.user?.email ?? '')
      formik.setFieldValue('phone', restaurant?.phone?.includes(" ") ? restaurant?.phone.split(" ")[1] : restaurant?.phone ?? '')
      formik.setFieldValue('is_email_verified', restaurant?.user?.is_email_verified ?? false)
      formik.setFieldValue(
        'option_phones',
        formatPhoneNumber(restaurant?.additional_phones ? restaurant?.additional_phones : [])
      )
      formik.setFieldValue('address', restaurant?.address ?? '')
      formik.setFieldValue('is_website', restaurant?.website ? true : false)
      formik.setFieldValue('website', restaurant?.website ?? '')
      if (AppUtils.checkValue(restaurant?.latitude) && AppUtils.checkValue(restaurant?.longitude)) {
        setCenter({ lat: restaurant?.latitude, lng: restaurant?.longitude })
        setZoom(15)
      }
    }
  }, [restaurant])

  const schema = yup.object().shape({
    restaurant_name: yup.string().required(ErrorConstants.RESTAURANT_NAME_ERROR),
    phone: yup.string().required(ErrorConstants.PHONE_NO_ERROR).min(10, 'Phone number must be at least 10 digits'),
    email: yup.string(),
    address: yup.mixed().required(ErrorConstants.ADDRESS_ERROR),
    website: yup.string().test((val, context) => {
      const is_website = context.parent.is_website
      if (is_website && !AppUtils.checkValue(val)) {
        return context.createError({ message: "Please enter valid domain name" })
      } else return true
    })
  })

  const values: NameData = {
    restaurant_name: '',
    phone: '',
    email: '',
    zipcode: '',
    address: '',
    option_phones: [],
    website: '',
    is_email_verified: false,
    is_website: false,
  }

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (values: NameData) => {
      const option_phones = values.option_phones.map(item => `+${item?.stdCode?.value} ${item?.value}`)
      const data = {
        id: restaurant?._id,
        name: values.restaurant_name,
        phone: `${stdCode.label} ${values.phone}`,
        additional_phones: option_phones,
        address: values.address,
        latitude: center?.lat,
        longitude: center?.lng,
        website: values?.is_website ? values.website : ''
      }
      dispatch(editRestaurantDetail({ data, old_restaurant_data: restaurant }))
    }
  })

  const mapOptions: google.maps.MapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      gestureHandling: 'cooperative'
    }),
    []
  )

  const handleMarkerDragEnd = useCallback((event: any) => {
    const newLat = event.latLng?.lat()
    const newLng = event.latLng?.lng()

    if (newLat && newLng) {
      const newPosition = { lat: newLat, lng: newLng }
      setCenter(newPosition)
      dispatch(
        editRestaurantDetail({
          data: { id: restaurant?._id, latitude: newLat, longitude: newLng },
          old_restaurant_data: restaurant
        })
      )
    }
  }, [restaurant])

  const formatPhoneNumber = (apiData: any) => {
    return apiData.map((phone: any) => {
      const stdCode = phone.slice(0, 3)

      return {
        label: 'Restaurant Phone Number (Optional)',
        value: phone.slice(3),
        stdCode: { value: stdCode.replace('+', ''), label: stdCode }
      }
    })
  }

  const handlePhoneNoChange = (e: any, i: number) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
    formik.setFieldValue(`option_phones[${i}].value`, newValue)
  }

  const handleVerifyEmail = () => {
    !formik.values.is_email_verified
      ? sendVerificationEmail({ email: formik.values.email, isLogin: false }, dispatch)
      : toast.error("your email is already verified", { position: 'top-right', closeOnClick: true, draggable: true })
  }

  const stdCodeChange = (val: { value: string; label: string; country_code_initials: string }) => {
    formik.setFieldValue('country_code', val?.value)
    setStdCode(val)
  }

  const handleAddressChange = (value: any, latLng?: { lat: number; lng: number }) => {
    formik.setFieldValue('address', value)
    if (latLng) {
      setCenter({ lat: latLng?.lat, lng: latLng?.lng })
      setZoom(15)
    }
  }

  const addPhoneNo = () =>
    formik.setFieldValue('option_phones', [
      ...formik.values.option_phones,
      { label: 'Restaurant Phone Number (Optional)', value: '', stdCode: { value: '91', label: '+91' } }
    ])

  return (
    <Card sx={{ position: 'relative', width: '100%', height: '100%', p: 4 }}>
      <Grid container columnSpacing={6} sx={{ width: '100%', m: 0, height: '100%' }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            pl: '0 !important',
            borderBottom: { xs: '2px solid rgba(38, 43, 67, 0.12)', sm: 'none' },
            mb: { xs: 4, sm: 0 }
          }}
        >
          <Box component={'form'} noValidate onSubmit={formik.handleSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Restaurant Details</Typography>
              <LoadingButton
                variant='contained'
                loading={loading}
                loadingPosition='start'
                startIcon={<Icon icon="material-symbols:save" fontSize='5.5rem' />}
                type='submit'
              >
                Save
              </LoadingButton>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ overflow: 'auto', p: 4, height: { sm: 'calc(100vh - 11.5rem)' } }}>
              <TextField
                sx={{ mb: 6 }}
                fullWidth
                label='Restaurant Name'
                placeholder='Enter Restaurant Name'
                name='restaurant_name'
                value={formik.values.restaurant_name}
                onChange={formik.handleChange}
                error={formik.touched.restaurant_name && Boolean(formik.errors.restaurant_name)}
                helperText={formik.touched.restaurant_name && formik.errors.restaurant_name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon={'lets-icons:shop-light'} />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                sx={{ mb: 6 }}
                fullWidth
                label='Restaurant Email'
                disabled={true}
                placeholder='Enter Restaurant Email'
                name='email'
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon={'mage:email'} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Tooltip
                        title={
                          formik.values.is_email_verified ? 'Your email has been verified' : 'Please verify your email'
                        }
                        arrow
                      >
                        <IconButton
                          sx={{
                            bgcolor: theme =>
                              formik.values.is_email_verified
                                ? theme.palette.success.lightOpacity
                                : theme.palette.warning.lightOpacity,
                            color: theme =>
                              `${formik.values.is_email_verified
                                ? theme.palette.success.main
                                : theme.palette.warning.main
                              } !important`
                          }}
                          onClick={handleVerifyEmail}
                        >
                          <Icon
                            icon={formik.values.is_email_verified ? 'flowbite:badge-check-solid' : 'ep:warning-filled'}
                          />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
              <CustomBackdrop open={loading} color="#fff" />
              <CsMobileNo
                sx={{ width: '100%', mb: 6 }}
                fullWidth
                label={'Restaturent Phone No'}
                name='phone'
                placeholder={'Enter Restaturent Phone No'}
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                stdcode={stdCode}
                stdCodeChange={stdCodeChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        disabled={formik.values.option_phones?.length === 3}
                        onClick={addPhoneNo}
                      >
                        <Icon icon={'lucide:plus'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {Array.isArray(formik.values.option_phones) && formik.values.option_phones.length > 0 && (
                <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {formik.values.option_phones.map((item, i) => (
                    <CsMobileNo
                      key={i}
                      sx={{ width: '100%' }}
                      fullWidth
                      name={`option_phones[${i}].value`}
                      placeholder='Enter Restaurant Phone No (Optional)'
                      value={item.value}
                      onChange={e => handlePhoneNoChange(e, i)}
                      stdcode={item.stdCode}
                      stdCodeChange={val => formik.setFieldValue(`option_phones[${i}].stdCode`, val)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              onClick={() =>
                                formik.setFieldValue(
                                  'option_phones',
                                  formik.values.option_phones.filter((_, index) => index !== i)
                                )
                              }
                            >
                              <Box
                                component={Icon}
                                icon='mdi:delete-outline'
                                sx={{ color: theme => `${theme.palette.error.main} !important` }}
                              />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  ))}
                </Box>
              )}
              <PlaceAutocomplete
                sx={{ mb: 4 }}
                label='Address'
                placeholder='Enter Address...'
                value={formik.values.address}
                onChange={handleAddressChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon={'carbon:location'} />
                    </InputAdornment>
                  )
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Do you have a real www. website domain name?
                </Typography>
                <Switch
                  checked={formik.values.is_website}
                  onChange={(e) => formik.setFieldValue('is_website', e.target.checked)}
                  color="primary"
                />
              </Box>
              <Collapse in={formik.values.is_website}>
                <TextField
                  fullWidth
                  label='Website Name'
                  placeholder='Enter Website Name'
                  sx={{ mb: 4 }}
                  name='website'
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                  InputProps={{ startAdornment: <InputAdornment position='start'>www.</InputAdornment> }}
                />
              </Collapse>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ pl: { xs: '0 !important', sm: '1.5rem !important' } }}>
          <Box sx={{ position: 'relative', width: '100%', height: { xs: '20rem', sm: '100%' } }}>
            <Box sx={{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
              <CsMap
                centerCords={center}
                onMarkerDragEnd={handleMarkerDragEnd}
                draggable={true}
                options={mapOptions}
                zoom={zoom}
                onLoad={() => setIsLoad(true)}
              />
            </Box>
            <LoadingButton
              sx={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                bgcolor: '#fff !important',
                color: '#000',
                opacity: isLoad ? 1 : 0,
                transition: 'all 0.5s ease-in-out'
              }}
              size='small'
              variant='contained'
              disabled={loading}
              startIcon={<Icon icon={'hugeicons:drag-left-04'} style={{ fontSize: '21px' }} />}
            >
              Drag marker to change location
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Card >
  )
}

export default DetailsView
