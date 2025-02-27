// MUI Imports
import { Box, Typography, Divider, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

// Style Imports
import 'swiper/swiper-bundle.css'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const Certificates = ({ section }: { section: any }) => {
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
        {Array.isArray(section?.sections) &&
          section?.sections?.length > 0 &&
          section?.sections?.map((certificate: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    border: '1px solid rgba(0,0,0,0.60)',
                    borderRadius: '8px',
                    p: 4,
                    my: 1,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': { boxShadow: theme => theme.shadows[3] },
                    height: 260,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                  onClick={() => AppUtils.checkValue(certificate?.link) && window.open(certificate?.link, '_blank', 'noopener,noreferrer')}
                >
                  <Icon icon={'ph:certificate-light'} color={colorData?.main} fontSize={50} />
                  <Typography
                    variant='h5'
                    sx={{ fontWeight: 600, color: '#000', ...AppUtils.getFontFamily(fontType), my: 4 }}
                  >
                    {certificate?.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      ...AppUtils.getFontFamily(fontType),
                      wordWrap: 'break-word',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      WebkitLineClamp: 5,
                      textOverflow: 'ellipsis'
                    }}
                    dangerouslySetInnerHTML={{ __html: certificate?.description }}
                  />
                </Box>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </Container>
  )
}

export default Certificates
