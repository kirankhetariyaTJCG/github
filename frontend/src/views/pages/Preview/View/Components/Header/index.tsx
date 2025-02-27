// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, useMediaQuery, useScrollTrigger, LoadingButton, Typography, AppBar, Collapse, IconButton, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import DrawerView from './Drawer'

// Store Imports
import { setPageType } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'
import { SECTION_NAME } from '@/Helper/Constants/WebsiteEditor'

const Header = () => {
  // State
  const [open, setIsOpen] = useState<boolean>(false)
  const [impAnnouncement, setImpAnnouncement] = useState<boolean>(false)

  // Hooks
  const navbarType = useSelector((state: any) => state.website.website.navigation)
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const sections = useSelector((state: any) => state.website.website.sections)
  const siteLogoData = sections?.find((item: any) => item?.type === SECTION_NAME.LOGO)
  const allPages = sections?.find((item: any) => item?.type === SECTION_NAME.STAGING)
  const importantAnnouncement = sections?.find((item: any) => item?.type === SECTION_NAME.IMPORTANT_ANNOUNCEMENT)
  const colorData = useSelector((state: any) => state.website.website.color)
  const restaurant = useSelector((state: any) => state.website.website.restaurant)
  const pagesType = useSelector((state: any) => state.website.website.pageType)
  const dispatch = useDispatch()
  const trigger = useScrollTrigger({ threshold: 100, disableHysteresis: true })

  // Media Query
  const md = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  useEffect(() => {
    if (importantAnnouncement && importantAnnouncement?.isActive) {
      setImpAnnouncement(true)
    } else setImpAnnouncement(false)
  }, [importantAnnouncement?.isActive])

  return (
    <>
      <AppBar
        sx={[
          {
            top: { xs: 0, md: 57 },
            bgcolor: navbarType === 1 ? (trigger ? colorData?.main : 'transparent') : colorData?.main,
            transition: 'all 0.2s ease-in-out',
            zIndex: 100
          },
          navbarType === 1 && { boxShadow: 'none' }
        ]}
      >
        <Collapse in={impAnnouncement}>
          <Box sx={{ bgcolor: colorData?.light, py: 3 }}>
            <Container
              maxWidth='xl'
              sx={{
                display: 'flex',
                alignItems: { md: 'center' },
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', md: 'row' }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Box component={Icon} icon={'hugeicons:dish-01'} sx={{ color: colorData?.main, fontSize: 45 }} />
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      color: colorData?.main,
                      ...AppUtils.getFontFamily(fontType)
                    }}
                  >
                    {importantAnnouncement?.title}
                  </Typography>
                </Box>
                <IconButton sx={{ color: '#000', display: { xs: 'flex', md: 'none' } }} onClick={() => setImpAnnouncement(false)}>
                  <Icon icon={'ic:round-close'} />
                </IconButton>
              </Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', md: '1rem' },
                  color: colorData?.main,
                  ...AppUtils.getFontFamily(fontType),
                  my: { xs: 2, md: 0 }
                }}
                dangerouslySetInnerHTML={{ __html: importantAnnouncement?.description }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <LoadingButton
                  variant='outlined'
                  sx={{
                    borderColor: `${colorData?.main} !important`,
                    color: colorData?.main,
                    bgcolor: `${colorData?.light} !important`,
                    ...AppUtils.getFontFamily(fontType),
                    width: { xs: '100%', md: 'max-content' }
                  }}
                  onClick={() => setImpAnnouncement(false)}
                >
                  See Menu & Order
                </LoadingButton>
                <IconButton sx={{ color: '#000', display: { xs: 'none', md: 'flex' } }} onClick={() => setImpAnnouncement(false)}>
                  <Icon icon={'ic:round-close'} />
                </IconButton>
              </Box>
            </Container>
          </Box>
        </Collapse>
        <Box>
          <Container maxWidth='xl'>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                py: 2
              }}
            >
              <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => dispatch(setPageType(1))}>
                {siteLogoData?.logoType === 1 && (
                  <Typography
                    sx={{ fontWeight: 700, color: '#fff', fontSize: '1.5rem', ...AppUtils.getFontFamily(fontType) }}
                  >
                    {siteLogoData?.restaurantName}
                  </Typography>
                )}
                {siteLogoData?.logoType === 2 && (
                  <Box component={'img'} src={`${UrlHelper.imgPath}${siteLogoData?.restaurantLogo}`} sx={{ width: 100, height: 50 }} />
                )}
              </Box>
              {!md &&
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {Array.isArray(allPages?.sections) &&
                    allPages?.sections?.length > 0 &&
                    allPages?.sections?.map((page: { pageTitle: string; link: string; type: number }, index: number) => {
                      if (index > 0 && index < 5) {
                        if (page?.type === 3 && !restaurant?.has_delivery) return null;
                        return (
                          <Typography
                            key={index}
                            sx={{
                              fontWeight: 500,
                              color: pagesType === page?.type ? colorData?.main : '#fff',
                              bgcolor: pagesType === page?.type ? colorData?.secondary : navbarType === 1 ? 'transparent' : colorData?.main,
                              ...AppUtils.getFontFamily(fontType),
                              px: 2,
                              py: 1,
                              borderRadius: '8px',
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                cursor: 'pointer',
                                bgcolor: colorData?.secondary,
                                color: colorData?.main
                              }
                            }}
                            onClick={() => dispatch(setPageType(page?.type))}
                          >
                            {page?.pageTitle}
                          </Typography>
                        )
                      }
                    })}
                </Box>
              }
              {md ? (
                <IconButton sx={{ color: '#fff' }} size='large' onClick={() => setIsOpen(true)}>
                  <Icon icon='mingcute:menu-fill' />
                </IconButton>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {restaurant?.has_table_reservation &&
                      <LoadingButton
                        data-rid={restaurant?._id}
                        data-is-table="true"
                        variant='outlined'
                        sx={{
                          borderColor: '#fff !important',
                          bgcolor: navbarType === 1 ? (trigger ? colorData?.main : 'transparent') : colorData?.main,
                          color: '#fff',
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
                        ...AppUtils.getFontFamily(fontType)
                      }}
                    >
                      See Menu & Order
                    </LoadingButton>
                  </Box>
                </Box>
              )}
            </Box>
          </Container>
        </Box >
      </AppBar >

      <DrawerView open={open} setOpen={setIsOpen} pages={allPages?.sections} />
    </>
  )
}

export default Header
