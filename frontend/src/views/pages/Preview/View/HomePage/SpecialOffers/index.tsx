// MUI Imports
import { Box, Avatar, Typography, Divider, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

// Store Imports
import { setToggleMenu } from '@/redux-store/Website'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

// Style Imports
import 'swiper/swiper-bundle.css'

const SpecialOffers = () => {
  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)
  const promotions = useSelector((state: any) => state.self_made.promotions)
  const dispatch = useDispatch()


  return (
    <>
      {Array.isArray(promotions) &&
        promotions?.length > 0 &&
        <Box sx={{ mb: 16 }}>
          <Container maxWidth='lg'>
            <Box sx={{ mb: 8 }}>
              <Typography
                variant='h1'
                sx={{
                  fontSize: { xs: '1.5rem', md: '2.875rem' },
                  fontWeight: 600,
                  color: colorData?.main,
                  ...AppUtils.getFontFamily(fontType)
                }}
              >
                Spacial Offers
              </Typography>
              <Divider sx={{ bgcolor: colorData?.main, width: '6rem' }} />
            </Box>
            <Swiper
              spaceBetween={50}
              loop={true}
              breakpoints={{
                0: { slidesPerView: 1 },
                568: { slidesPerView: 1 },
                660: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                915: { slidesPerView: 3.5 }
              }}
            >
              {promotions?.map((offer: any, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        borderRadius: '10px',
                        p: 2,
                        my: 1,
                        ml: 1,
                        bgcolor: '#F2F2F2',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        userSelect: 'none',
                        '&:hover': { boxShadow: theme => theme.shadows[3] }
                      }}
                    >
                      <Avatar
                        className='img'
                        variant='rounded'
                        src={`${UrlHelper.imgPath}${offer?.promotion_image}`}
                        sx={{ width: '100%', height: '10rem' }}
                      />
                      <Typography sx={{ fontWeight: 600, my: 2, fontSize: '1.1rem', color: '#000', ...AppUtils.getFontFamily(fontType) }}>
                        {offer?.name}
                      </Typography>
                      <Typography sx={{ fontWeight: 300, mb: 2, color: '#000', ...AppUtils.getFontFamily(fontType) }}>
                        {offer?.description}
                      </Typography>
                    </Box>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </Container>
        </Box>
      }
    </>
  )
}

export default SpecialOffers
