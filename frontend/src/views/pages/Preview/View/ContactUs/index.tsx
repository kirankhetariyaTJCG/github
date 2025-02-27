// React Imports
import { useMemo, useEffect, useState } from 'react'

// MUI Imports
import { Box, LoadingButton, Divider, TextField, Typography, Card, IconButton, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import OpeningHours from '../HomePage/OpeningHours'
import SocialMedia from '../HomePage/SocialMedia'
import CsMap from '@/@core/components/CsMap'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import { CommonTypes } from '@/types'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import { SECTION_NAME } from '@/Helper/Constants/WebsiteEditor'
import UrlHelper from '@/Helper/Url'
import { setPageType } from '@/redux-store/Website'

const portals = ['ri:facebook-fill', 'ri:instagram-fill', 'ri:twitter-x-fill', 'ri:linkedin-fill']

const ContactUs = () => {

  // State
  const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: 20.5937, lng: 78.9629 })

  // Hooks
  const colorData = useSelector((state: any) => state.website.website.color)
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const sections = useSelector((state: any) => state.website.website.sections)
  const siteLogoData = sections?.find((item: any) => item?.type === SECTION_NAME.LOGO)
  const socialMediaData = sections?.find((item: any) => item?.type === SECTION_NAME.SOCIAL_MEDIA)
  const footerData = sections?.find((item: any) => item?.type === SECTION_NAME.FOOTER)
  const restaurant = useSelector((state: any) => state.website.website.restaurant)
  const dispatch = useDispatch
  const customStyle = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: colorData?.main,
      }
    }
  }

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

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?.latitude) && AppUtils.checkValue(restaurant?.longitude)) {
      setCenter({ lat: restaurant?.latitude, lng: restaurant?.longitude })
    }
  }, [restaurant])

  const values: CommonTypes = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  }

  const schema = yup.object().shape({
    firstName: yup.string().required(ErrorConstants.FIRST_NAME_ERROR),
    lastName: yup.string().required(ErrorConstants.LAST_NAME_ERROR),
    email: yup.string().required(ErrorConstants.EMAIL_ERROR).email(ErrorConstants.VALID_EMAIL_ERROR),
    message: yup.string().required(ErrorConstants.MESSAGE_ERROR)
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: values => {
      console.log('Values --->', values)
    }
  })

  return (
    <>
      <Container maxWidth='lg'>
        <Box sx={{ mb: 16 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '1.5rem', md: '2.875rem' },
                fontWeight: 600,
                color: colorData?.main,
                ...AppUtils.getFontFamily(fontType)
              }}
            >
              Contact Us
            </Typography>
            <Divider sx={{ bgcolor: colorData?.main, width: '8rem' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexDirection: { xs: 'column', sm: "row" } }}>
            <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
              <Box component={'img'} src='/images/contact_us.png' sx={{ width: '90%', height: 'auto' }} />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
              <Card sx={{ p: 6 }} component={'form'} noValidate onSubmit={formik.handleSubmit}>
                <Box sx={{ mb: 4 }}>
                  <Typography sx={{ color: '#4D4D4D', mb: 2, fontWeight: 600, ...AppUtils.getFontFamily(fontType) }}>
                    First Name
                  </Typography>
                  <TextField
                    sx={customStyle}
                    size='small'
                    fullWidth
                    placeholder='Enter First Name'
                    name='firstName'
                    value={formik.values.firstName}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Box>
                <Box sx={{ mb: 4 }}>
                  <Typography sx={{ color: '#4D4D4D', mb: 2, fontWeight: 600, ...AppUtils.getFontFamily(fontType) }}>
                    Last Name
                  </Typography>
                  <TextField
                    sx={customStyle}
                    size='small'
                    fullWidth
                    placeholder='Enter Last Name'
                    name='lastName'
                    value={formik.values.lastName}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Box>
                <Box sx={{ mb: 4 }}>
                  <Typography sx={{ color: '#4D4D4D', mb: 2, fontWeight: 600, ...AppUtils.getFontFamily(fontType) }}>
                    Email
                  </Typography>
                  <TextField
                    sx={customStyle}
                    size='small'
                    fullWidth
                    placeholder='Enter Email'
                    name='email'
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Box>
                <Box sx={{ mb: 4 }}>
                  <Typography sx={{ color: '#4D4D4D', mb: 2, fontWeight: 600, ...AppUtils.getFontFamily(fontType) }}>
                    Your Message
                  </Typography>
                  <TextField
                    sx={customStyle}
                    size='small'
                    fullWidth
                    placeholder='Enter Your Message'
                    multiline
                    minRows={3}
                    name='message'
                    value={formik.values.message}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                  />
                </Box>
                <LoadingButton
                  variant='contained'
                  type='submit'
                  fullWidth
                  sx={{ color: '#fff', bgcolor: `${colorData?.main} !important` }}
                >
                  Send Message
                </LoadingButton>
              </Card>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mb: 16 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '1.5rem', md: '2.875rem' },
                fontWeight: 600,
                color: colorData?.main,
                ...AppUtils.getFontFamily(fontType)
              }}
            >
              Find us on map
            </Typography>
            <Divider sx={{ bgcolor: colorData?.main, width: '8rem' }} />
          </Box>
          <Box sx={{ width: '100%', height: { sm: '31.25rem' }, borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            <Box sx={{ height: { xs: '30rem', sm: '100%' }, mb: { xs: 4, sm: 0 } }}>
              <CsMap
                options={mapOptions}
                zoom={15}
                centerCords={center}
              />
            </Box>
            <Box
              sx={{
                width: { xs: '100%', sm: '35%' },
                py: 4,
                px: 6,
                position: { xs: 'unset', sm: 'absolute' },
                right: '1rem',
                zIndex: '9',
                bottom: '1rem',
                boxShadow: '0 0 1.375rem rgba(0, 0, 0, 0.2)',
                bgcolor: '#fff',
                borderRadius: '1.25rem'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {siteLogoData?.logoType === 1 && (
                  <Typography
                    sx={{ fontWeight: 700, color: colorData?.main, fontSize: '1.5rem', ...AppUtils.getFontFamily(fontType) }}
                  >
                    {siteLogoData?.restaurantName}
                  </Typography>
                )}
                {siteLogoData?.logoType === 2 && (
                  <Box component={'img'} src={`${UrlHelper.imgPath}${siteLogoData?.restaurantLogo}`} sx={{ width: 100, height: 50 }} />
                )}
              </Box>
              <Box>
                <Typography variant='h5' sx={{ color: 'rgba(0,0,0,0.90)', ...AppUtils.getFontFamily(fontType), mb: 2 }}>
                  Email
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box component={Icon} icon='ic:round-email' sx={{ color: colorData?.main, fontSize: 20 }} />
                  <Typography sx={{ fontSize: '1rem', fontWeight: 400, ...AppUtils.getFontFamily(fontType), wordBreak: 'break-all' }}>
                    {restaurant?.user_id?.email ? restaurant?.user_id?.email : ''}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ my: 2 }}>
                <Typography variant='h5' sx={{ color: 'rgba(0,0,0,0.90)', ...AppUtils.getFontFamily(fontType), mb: 2 }}>
                  Location
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box>
                    <Box component={Icon} icon='mdi:location' sx={{ color: colorData?.main, fontSize: 20 }} />
                  </Box>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 400, ...AppUtils.getFontFamily(fontType) }}>
                    {restaurant?.address ? restaurant?.address : ''}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
                  <Box component={Icon} icon='mingcute:phone-fill' sx={{ color: colorData?.main, fontSize: 20 }} />
                  <Typography sx={{ fontSize: '1rem', fontWeight: 400, ...AppUtils.getFontFamily(fontType) }}>
                    {restaurant?.phone ? restaurant?.phone : ''}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {Array.isArray(restaurant?.additional_phones) && restaurant?.additional_phones?.length > 0 &&
                    restaurant?.additional_phones?.map((phone: any, index: number) => {
                      return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box component={Icon} icon='mingcute:phone-fill' sx={{ color: colorData?.main, fontSize: 20 }} />
                          <Typography sx={{ fontSize: '1rem', fontWeight: 400, ...AppUtils.getFontFamily(fontType) }}>
                            {phone}
                          </Typography>
                        </Box>
                      )
                    })
                  }
                </Box>
              </Box>
              <Box>
                <Typography variant='h5' sx={{ color: 'rgba(0,0,0,0.90)', ...AppUtils.getFontFamily(fontType), mb: 2 }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {Array.isArray(footerData?.links) &&
                    footerData?.links?.length > 0 &&
                    footerData?.links?.map((link: any, index: number) => {
                      if (link?.checked) {
                        return (
                          <IconButton
                            key={index}
                            size='small'
                            sx={{ bgcolor: `${colorData?.light} !important` }}
                            onClick={() => window.open(link?.value, '_blank', 'noopener,noreferrer')}
                          >
                            <Box component={Icon} icon={portals[index]} sx={{ color: colorData?.main }} />
                          </IconButton>
                        )
                      }
                    })}
                </Box>
              </Box>
              <LoadingButton
                size='large'
                fullWidth
                sx={{
                  mt: 4,
                  bgcolor: `${colorData?.main} !important`,
                  color: '#fff'
                }}
                variant='contained'
                onClick={() => window.open(`https://www.google.com/maps?q=${center?.lat},${center?.lng}&hl=en-US`, '_blank')}
              >
                Visit us on map
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Container>
      <OpeningHours />
      {AppUtils.checkValue(socialMediaData) && <SocialMedia section={socialMediaData} />}
    </>
  )
}

export default ContactUs
