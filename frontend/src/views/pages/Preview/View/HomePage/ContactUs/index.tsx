// React Imports
import { useMemo, useState, useEffect } from 'react'

// MUI Imports
import { Box, Typography, Container, Divider } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'

// Custom Imports
import CsMap from '@/@core/components/CsMap'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import { SECTION_NAME } from '@/Helper/Constants/WebsiteEditor'

const links = ['FaceBook', 'Instagram', 'Twitter', 'Linkedin']

const ContactUs = () => {

  // State
  const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: 20.5937, lng: 78.9629 })

  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const sections = useSelector((state: any) => state.website.website.sections)
  const footerData = sections?.find((item: any) => item?.type === SECTION_NAME.FOOTER)
  const colorData = useSelector((state: any) => state.website.website.color)
  const restaurant = useSelector((state: any) => state.website.website.restaurant)

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?.latitude) && AppUtils.checkValue(restaurant?.longitude)) {
      setCenter({ lat: restaurant?.latitude, lng: restaurant?.longitude })
    }
  }, [restaurant])

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

  return (
    <Container maxWidth='lg' sx={{ mb: 16 }}>
      <Typography
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 600,
          color: colorData?.main,
          ...AppUtils.getFontFamily(fontType)
        }}
      >
        Contact Us
      </Typography>
      <Divider sx={{ bgcolor: colorData?.main, width: '6rem' }} />
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          justifyContent: 'space-between',
          width: '100%',
          my: 12,
          p: 4,
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            gap: 4,
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Box sx={{ display: 'flex', width: '100%', height: '100%', gap: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box
              sx={{
                width: { xs: '100%', md: '60%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}
            >
              <Box
                sx={{
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '1rem',
                  p: 8,
                  textAlign: 'center',
                  mb: 4,
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    p: 4,
                    bgcolor: colorData?.light,
                    borderRadius: '50%',
                    width: 'max-content',
                    mx: 'auto',
                  }}
                >
                  <Box
                    component={Icon}
                    icon={'subway:location-1'}
                    sx={{ color: colorData?.main, fontSize: { xs: 35, md: 55 } }}
                  />
                </Box>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, color: '#000', my: 4, ...AppUtils.getFontFamily(fontType) }}>
                  Location
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 400,
                    color: '#000',
                    cursor: 'pointer',
                    ...AppUtils.getFontFamily(fontType),
                  }}
                  onClick={() =>
                    restaurant?.address && window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant?.address)}`, '_blank')
                  }
                >
                  {restaurant?.address ? restaurant?.address : ''}
                </Typography>
              </Box>
              <Box
                sx={{
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '1rem',
                  p: 8,
                  textAlign: 'center',
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    p: 4,
                    bgcolor: colorData?.light,
                    borderRadius: '50%',
                    width: 'max-content',
                    mx: 'auto',
                  }}
                >
                  <Box
                    component={Icon}
                    icon={'fluent:call-24-filled'}
                    sx={{ color: colorData?.main, fontSize: { xs: 35, md: 55 } }}
                  />
                </Box>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, color: '#000', my: 4, ...AppUtils.getFontFamily(fontType) }}>
                  Contact
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 400,
                    color: '#000',
                    cursor: 'pointer',
                    ...AppUtils.getFontFamily(fontType),
                  }}
                  onClick={() => restaurant?.phone && window.open(`tel:${restaurant?.phone}`, '_blank', 'noopener,noreferrer')}
                >
                  {restaurant?.phone ? restaurant?.phone : ''}
                </Typography>
                {Array.isArray(restaurant?.additional_phones) && restaurant?.additional_phones?.length > 0 &&
                  restaurant?.additional_phones?.map((phone: any, index: number) => (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: '#000',
                        cursor: 'pointer',
                        ...AppUtils.getFontFamily(fontType),
                      }}
                      onClick={() => phone && window.open(`tel:${phone}`, '_blank', 'noopener,noreferrer')}
                    >
                      {phone}
                    </Typography>
                  ))
                }
              </Box>
            </Box>
            <Box
              sx={{
                width: { xs: '100%', md: '40%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: 4
              }}
            >
              <Box
                sx={{
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '1rem',
                  p: 8,
                  textAlign: 'center',
                  bgcolor: colorData?.main,
                  mb: 4,
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    p: 4,
                    bgcolor: '#fff',
                    borderRadius: '50%',
                    width: 'max-content',
                    mx: 'auto',
                  }}
                >
                  <Box
                    component={Icon}
                    icon={'majesticons:mail'}
                    sx={{ color: colorData?.main, fontSize: { xs: 35, md: 55 } }}
                  />
                </Box>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, color: '#fff', my: 4, ...AppUtils.getFontFamily(fontType) }}>
                  Email
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 400,
                    color: '#fff',
                    cursor: 'pointer',
                    ...AppUtils.getFontFamily(fontType),
                  }}
                  onClick={() => restaurant?.user_id?.email && window.open(`mailto:${restaurant?.user_id?.email}`, '_blank', 'noopener,noreferrer')}
                >
                  {restaurant?.user_id?.email ? restaurant?.user_id?.email : ''}
                </Typography>
              </Box>

              <Box
                sx={{
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '1rem',
                  p: 8,
                  textAlign: 'center',
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    p: 4,
                    bgcolor: colorData?.light,
                    borderRadius: '50%',
                    width: 'max-content',
                    mx: 'auto',
                  }}
                >
                  <Box
                    component={Icon}
                    icon={'iconamoon:link-duotone'}
                    sx={{ color: colorData?.main, fontSize: { xs: 35, md: 55 } }}
                  />
                </Box>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, color: '#000', my: 4, ...AppUtils.getFontFamily(fontType) }}>
                  Links
                </Typography>
                {Array.isArray(footerData?.links) &&
                  footerData?.links?.length > 0 &&
                  footerData?.links?.map((link: any, index: number) => {
                    if (link?.checked) {
                      return (
                        <Typography
                          key={index}
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 400,
                            color: colorData?.main,
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            ...AppUtils.getFontFamily(fontType),
                          }}
                          onClick={() => window.open(link?.value, '_blank', 'noopener,noreferrer')}
                        >
                          {links[index]}
                        </Typography>
                      )
                    }
                  })}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' }, height: { xs: '30rem', md: 'unset' } }}>
          <Box sx={{ borderRadius: '1rem', height: '100%', width: '100%', overflow: 'hidden' }}>
            <CsMap options={mapOptions} centerCords={center} zoom={15} />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default ContactUs
