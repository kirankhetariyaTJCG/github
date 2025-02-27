// React Imports
import { useState } from 'react'

// MUI Imports
import { Box, Typography, IconButton, Container, Divider } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

// Custom Imports
import VideosDialog from './VideoDialog'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Style Imports
import 'swiper/swiper-bundle.css'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

const Videos = ({ section }: { section: any }) => {

  // State
  const [videoInfo, setVideoInfo] = useState<{ open: boolean, row: any }>({ open: false, row: {} })

  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)

  return (
    <>
      <Container maxWidth='lg' sx={{ mb: 16 }}>
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
            {section?.title}
          </Typography>
          <Divider sx={{ bgcolor: colorData?.main, width: '6rem' }} />
        </Box>
        {section?.description &&
          <Typography sx={{ color: '#000', fotnWeight: 500, fontSize: '1rem', ...AppUtils.getFontFamily(fontType), mb: 4 }}>
            {section?.description}
          </Typography>}

        <Swiper
          spaceBetween={20}
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
            section?.sections?.map((video: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      position: 'relative',
                      backgroundImage: `url(${UrlHelper.imgPath}${video?.imgSrc?.replace(/\\/g, "/")})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      height: '13rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      '&:hover .playButton': {
                        transform: 'scale(1)'
                      },
                    }}
                  >
                    <IconButton
                      className='playButton'
                      sx={{ color: colorData?.main, bgcolor: `${colorData?.light} !important`, fontSize: 30, transform: 'scale(0)', transition: 'all 0.2s ease-in-out' }}
                      onClick={() => setVideoInfo({ open: true, row: video })}
                    >
                      <Icon icon={'stash:play-solid'} />
                    </IconButton>
                  </Box>
                </SwiperSlide>
              )
            })}
        </Swiper>
      </Container>

      <VideosDialog open={videoInfo?.open} setOpen={setVideoInfo} row={videoInfo?.row} />
    </>
  )
}

export default Videos
