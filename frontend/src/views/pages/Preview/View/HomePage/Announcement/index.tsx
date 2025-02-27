// MUI Imports
import { Box, Typography, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

// Style Imports
import 'swiper/swiper-bundle.css'
import 'swiper/css/pagination'

const iconsArray = [
  'gridicons:speaker',
  'ion:restaurant',
  'solar:hearts-bold',
  'material-symbols:flightsmode',
  'hugeicons:delivery-truck-02',
  'mingcute:dish-cover-line'
]

const Announcement = ({ section }: any) => {
  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)

  return (
    <Container maxWidth='lg' sx={{ mb: 16 }}>
      <Box>
        <Box
          component={Swiper}
          spaceBetween={20}
          loop={true}
          sx={{ px: 2 }}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
        >
          {Array.isArray(section?.sections) &&
            section?.sections?.length > 0 &&
            section?.sections.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      borderRadius: '10px',
                      backgroundImage: `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%), url(${UrlHelper.imgPath}${item?.img?.replace(/\\/g, "/")})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      p: { xs: 4, md: 8 },
                      height: { xs: '25rem', md: '20rem' }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 6 }}>
                      <Icon icon={iconsArray[item?.type - 1]} fontSize={35} color='#fff' />
                      <Typography
                        variant='h4'
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: '1.2rem', sm: '1.3rem' },
                          color: '#fff',
                          ...AppUtils.getFontFamily(fontType)
                        }}
                      >
                        {item?.title}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: '#fff',
                        width: { sm: '35%' },
                        lineHeight: 2,
                        ...AppUtils.getFontFamily(fontType)
                      }}
                      dangerouslySetInnerHTML={{ __html: item?.desc }}
                    />
                  </Box>
                </SwiperSlide>
              )
            })}
        </Box>
      </Box>
    </Container>
  )
}

export default Announcement
