// MUI Imports
import { Box, Typography, Divider, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

// Style Imports
import 'swiper/swiper-bundle.css'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

const Awards = ({ section }: { section: any }) => {
  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)

  return (
    <Container maxWidth='lg' sx={{ mb: 16 }}>
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
          {section?.title}
        </Typography>
        <Divider sx={{ bgcolor: colorData?.main, width: '6rem' }} />
      </Box>
      <Swiper
        spaceBetween={20}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          568: { slidesPerView: 1 },
          660: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          915: { slidesPerView: 4 }
        }}
      >
        {Array.isArray(section?.sections) &&
          section?.sections?.length > 0 &&
          section?.sections?.map((award: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <Box sx={{ borderRadius: '10px', p: 2, bgcolor: '#F2F2F2' }}>
                  <Box
                    component={'img'}
                    src={`${UrlHelper.imgPath}${award?.src}`}
                    sx={{ width: '100%', height: '10rem', borderRadius: '8px' }}
                  />
                  <Typography sx={{ fontWeight: 600, my: 2, color: '#000', textAlign: 'center' }}>
                    {award?.title}
                  </Typography>
                </Box>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </Container>
  )
}

export default Awards
