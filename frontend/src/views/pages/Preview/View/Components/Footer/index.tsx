// MUI Imports
import { Box, LoadingButton, IconButton, Typography, Grid, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { setPageType, setToggleMenu } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import { SECTION_NAME } from '@/Helper/Constants/WebsiteEditor'
import UrlHelper from '@/Helper/Url'

const Footer = () => {
  // Hooks
  const sections = useSelector((state: any) => state.website.website.sections)
  const siteLogoData = sections?.find((item: any) => item?.type === SECTION_NAME.LOGO)
  const allPages = sections?.find((item: any) => item?.type === SECTION_NAME.STAGING)
  const footerData = sections?.find((item: any) => item?.type === SECTION_NAME.FOOTER)
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)
  const restaurant = useSelector((state: any) => state.website.website.restaurant)
  const dispatch = useDispatch()

  const links = ['basil:facebook-solid', 'ri:instagram-line', 'fa6-brands:x-twitter', 'ri:linkedin-fill']

  return (
    <Box sx={{ borderTop: theme => `1px solid ${theme.palette.divider}`, bgcolor: colorData?.main }}>
      <Container maxWidth='lg'>
        <Grid container spacing={4} sx={{ my: 16 }}>
          <Grid item xs={12} md={4}>
            <Box>
              {siteLogoData?.logoType === 1 && (
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '2rem',
                    color: '#fff',
                    ...AppUtils.getFontFamily(fontType)
                  }}
                >
                  {siteLogoData?.restaurantName}
                </Typography>
              )}
              {siteLogoData?.logoType === 2 && (
                <Box component={'img'} src={`${UrlHelper.imgPath}${siteLogoData?.restaurantLogo}`} sx={{ width: 100, height: 50 }} />
              )}
            </Box>
            <Typography
              sx={{ fontSize: '1rem', fontWeight: 400, color: '#fff', my: 2, ...AppUtils.getFontFamily(fontType) }}
            >
              {footerData?.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, pt: 2 }}>
              {Array.isArray(footerData?.links) &&
                footerData?.links?.length > 0 &&
                footerData?.links?.map((link: any, index: number) => {
                  if (link?.checked) {
                    return (
                      <IconButton
                        key={index}
                        color='primary'
                        size='large'
                        sx={{ bgcolor: `${colorData?.light} !important` }}
                        onClick={() => window.open(link?.value, '_blank', 'noopener,noreferrer')}
                      >
                        <Box component={Icon} icon={links[index]} sx={{ color: colorData?.main }} />
                      </IconButton>
                    )
                  }
                })}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              sx={{
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 500,
                mb: 4,
                ...AppUtils.getFontFamily(fontType)
              }}
            >
              Pages
            </Typography>
            <Box>
              {Array.isArray(allPages?.sections) &&
                allPages?.sections?.length > 0 &&
                allPages?.sections?.map((page: any, index: number) => {
                  if (index > 0 && index < 5) {

                    if (page?.type === 3 && !restaurant?.has_delivery) return null;

                    return (
                      <Typography
                        key={index}
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: '#fff',
                          mb: 2,
                          ...AppUtils.getFontFamily(fontType),
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': { color: colorData?.secondary, cursor: 'pointer' }
                        }}
                        onClick={() => dispatch(setPageType(page?.type))}
                      >
                        {page?.pageTitle}
                      </Typography>
                    )
                  }
                })}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              sx={{
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 500,
                mb: 4,
                ...AppUtils.getFontFamily(fontType)
              }}
            >
              Links
            </Typography>
            <Box>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#fff',
                  ...AppUtils.getFontFamily(fontType),
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { color: colorData?.secondary, cursor: 'pointer' }
                }}
                onClick={() => dispatch(setPageType(6))}
              >
                Table Reservation
              </Typography>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#fff',
                  mt: 2,
                  ...AppUtils.getFontFamily(fontType),
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { color: colorData?.secondary, cursor: 'pointer' }
                }}
                onClick={() => dispatch(setPageType(7))}
              >
                Order Ahead
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              sx={{
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 500,
                mb: 4,
                ...AppUtils.getFontFamily(fontType)
              }}
            >
              Get in touch
            </Typography>
            <Typography
              sx={{ fontSize: '1rem', fontWeight: 400, color: '#fff', my: 4, ...AppUtils.getFontFamily(fontType) }}
            >
              {footerData?.getInTouchDesc}
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              {restaurant?.has_table_reservation &&
                <LoadingButton
                  data-rid={restaurant?._id}
                  data-is-table="true"
                  variant='outlined'
                  sx={{
                    borderColor: '#fff !important',
                    color: '#fff !important',
                    bgcolor: `${colorData?.main} !important`,
                    py: 4,
                    ...AppUtils.getFontFamily(fontType)
                  }}
                >
                  Table Reservation
                </LoadingButton>
              }
              <LoadingButton
                data-rid={restaurant?._id}
                variant='contained'
                sx={{
                  bgcolor: `${colorData?.secondary} !important`,
                  color: colorData?.btnTextColor,
                  py: 4,
                  ...AppUtils.getFontFamily(fontType)
                }}
                color='primary'
              >
                See Menu & Order
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {footerData?.isCopyRight &&
        <Box sx={{ py: 8, textAlign: 'center', borderTop: `1px solid #D8D8D8` }}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: '#fff', ...AppUtils.getFontFamily(fontType) }}>
            CopyRight © {footerData?.copyRight} {restaurant?.name}
          </Typography>
        </Box>
      }
    </Box>
  )
}

export default Footer
