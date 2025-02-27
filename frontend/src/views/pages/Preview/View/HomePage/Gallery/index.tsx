// React Imports
import { useEffect } from 'react';

// MUI Imports
import { Box, Typography, Container, Divider, Avatar } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Fancybox } from '@fancyapps/ui';

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

// Style Imports
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'swiper/swiper-bundle.css'

const Gallery = ({ section }: any) => {
  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {
      animated: true,
      Hash: false
    })

    return () => Fancybox.destroy()
  }, [])

  return (
    <Box sx={{ mb: 16 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.5rem', md: '2.875rem' },
              fontWeight: 600,
              color: colorData?.main,
              ...AppUtils.getFontFamily(fontType),
            }}
          >
            {section?.title}
          </Typography>
          <Divider sx={{ bgcolor: colorData?.main, width: '6rem' }} />
        </Box>
        {section?.description && (
          <Typography
            sx={{
              color: '#000',
              fontWeight: 500,
              fontSize: '1rem',
              ...AppUtils.getFontFamily(fontType),
              mb: 4,
            }}
            dangerouslySetInnerHTML={{ __html: section?.description }}
          />
        )}
        <Swiper
          spaceBetween={20}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            568: { slidesPerView: 1 },
            660: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            915: { slidesPerView: 3.5 },
          }}
        >
          {Array.isArray(section?.images) &&
            section?.images?.length > 0 &&
            section?.images?.map((img: any, index: number) => {
              return (
                <SwiperSlide
                  key={index}
                  style={{
                    overflow: 'hidden',
                    borderRadius: '8px',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      '&:hover .titleBox': { bottom: '0' },
                      '&:hover .image': { transform: 'scale(1.03)' },
                    }}
                  >
                    {/* Add Fancybox anchor */}
                    <a
                      href={`${UrlHelper.imgPath}${img?.src}`}
                      data-fancybox="gallery"
                      data-caption={img?.title}
                    >
                      <Avatar
                        className="image"
                        variant="rounded"
                        src={`${UrlHelper.imgPath}${img?.src}`}
                        sx={{
                          width: '100%',
                          height: '12rem',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </a>
                    <Box
                      className="titleBox"
                      sx={{
                        position: 'absolute',
                        zIndex: '10',
                        bgcolor: '#fff',
                        opacity: 0.8,
                        width: '100%',
                        py: 2,
                        bottom: '-3.125rem',
                        transition: 'all 0.3s ease',
                        borderRadius: '0 0 8px 8px',
                      }}
                    >
                      <Typography
                        sx={{ color: '#000', textAlign: 'center', fontWeight: 700 }}
                      >
                        {img?.title}
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
              )
            })}
        </Swiper>
      </Container>
    </Box>

  )
}

export default Gallery
