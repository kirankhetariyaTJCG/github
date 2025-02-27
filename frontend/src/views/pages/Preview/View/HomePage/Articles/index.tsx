// MUI Imports
import { Box, Typography, LoadingButton, Divider, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Style Imports
import 'swiper/swiper-bundle.css'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

const Articles = ({ section }: { section: any }) => {
  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)

  return (
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
          section?.sections?.map((article: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    borderRadius: '10px',
                    bgcolor: '#F2F2F2',
                    p: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    alignItems: 'start',
                    height: 420
                  }}
                >
                  <Box>
                    <Box
                      component={'img'}
                      src={`${UrlHelper.imgPath}${article?.imgSrc}`}
                      sx={{ width: '100%', height: '12rem', borderRadius: '8px' }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        my: 2,
                        color: 'rgba(0,0,0,0.85)',
                        ...AppUtils.getFontFamily(fontType),
                        fontSize: '1.2rem',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 2,
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {article?.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        color: 'rgba(0,0,0,0.85)',
                        ...AppUtils.getFontFamily(fontType),
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 3,
                        textOverflow: 'ellipsis'
                      }}
                      dangerouslySetInnerHTML={{ __html: article?.description }}
                    />
                  </Box>
                  <LoadingButton
                    variant='outlined'
                    size='small'
                    sx={{
                      borderRadius: '1.5rem',
                      color: colorData?.main,
                      bgcolor: '#F2F2F2 !important',
                      borderColor: `${colorData?.main} !important`,
                      // mt: 4,
                      ...AppUtils.getFontFamily(fontType)
                    }}
                    endIcon={<Icon icon={'line-md:arrow-right'} />}
                    onClick={() => window.open(article?.url, '_blank', 'noopener,noreferrer')}
                  >
                    Read More
                  </LoadingButton>
                </Box>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </Container>
  )
}

export default Articles
