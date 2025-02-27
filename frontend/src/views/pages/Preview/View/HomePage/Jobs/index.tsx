// React Imports
import { useState } from 'react'

// MUI Imports
import { Box, Divider, LoadingButton, Typography, IconButton, Container, Collapse } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'
import moment from 'moment'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const Jobs = ({ section }: { section: any }) => {
  // State
  const [activeJob, setActiveJob] = useState<number | null>(null)

  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)
  const restaurant = useSelector((state: any) => state.website.website.restaurant)

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
          We're hiring
        </Typography>
        <Divider sx={{ bgcolor: colorData?.main, width: '6rem' }} />
      </Box>
      <Box>
        {Array.isArray(section?.sections) &&
          section?.sections?.length > 0 &&
          section?.sections?.map((job: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  borderRadius: '8px',
                  boxShadow: '0 0 1.25rem 0 #0000001A',
                  border: theme => `1px solid ${theme.palette.divider}`,
                  p: 4,
                  mb: 6
                }}
              >
                <Box sx={{ display: 'flex', alignItems: { sm: 'center' }, justifyContent: 'space-between' }}>
                  <Box>
                    <Typography
                      sx={{
                        color: '#000',
                        fontSize: { xs: '0.8rem', sm: '1rem' },
                        fontWeight: 500,
                        ...AppUtils.getFontFamily(fontType)
                      }}
                    >
                      Posted on {moment(job?.postedOn).format('MMMM DD [at] hh:mm A')}
                    </Typography>
                    <Typography
                      variant='h4'
                      sx={{
                        color: '#000',
                        fontWeight: 600,
                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                        ...AppUtils.getFontFamily(fontType)
                      }}
                    >
                      {job?.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LoadingButton
                      variant='outlined'
                      sx={{
                        display: { xs: 'none', md: 'flex' },
                        borderColor: '#000 !important',
                        color: '#000',
                        bgcolor: 'transparent !important',
                        ...AppUtils.getFontFamily(fontType)
                      }}
                      onClick={() =>
                        restaurant?.user_id?.email && window.open(`mailto:${restaurant?.user_id?.email}`, '_blank', 'noopener,noreferrer')}
                    >
                      Apply
                    </LoadingButton>
                    <IconButton
                      sx={{ color: '#000' }}
                      onClick={() => (activeJob === index ? setActiveJob(null) : setActiveJob(index))}
                    >
                      <Icon
                        icon={'icon-park-outline:right'}
                        style={{
                          transition: 'all 0.2s ease-in-out',
                          transform: activeJob === index ? 'rotate(90deg)' : 'none'
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
                <Collapse in={activeJob === index}>
                  <Box sx={{ mt: 4 }}>
                    <Typography
                      sx={{ color: '#000', fontSize: '1rem', fontWeight: 500, ...AppUtils.getFontFamily(fontType) }}
                    >
                      Job Description
                    </Typography>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: '0.9rem', ...AppUtils.getFontFamily(fontType), my: 4, color: '#000' }}
                      dangerouslySetInnerHTML={{ __html: job?.description }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography
                          sx={{ color: '#000', fontSize: '1rem', fontWeight: 500, ...AppUtils.getFontFamily(fontType) }}
                        >
                          Send an application to
                        </Typography>
                        <Typography
                          sx={{
                            color: colorData?.main,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            fontWeight: 500,
                            ...AppUtils.getFontFamily(fontType),
                            textDecoration: 'underline',
                            userSelect: 'none',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'none' }
                          }}
                          onClick={() => restaurant?.user_id?.email && window.open(`mailto:${restaurant?.user_id?.email}`, '_blank', 'noopener,noreferrer')}
                        >
                          {restaurant?.user_id?.email ?? ''}
                        </Typography>
                      </Box>
                      <LoadingButton
                        variant='outlined'
                        sx={{
                          display: { xs: 'flex', md: 'none' },
                          borderColor: '#000 !important',
                          color: '#000',
                          bgcolor: 'transparent !important',
                          ...AppUtils.getFontFamily(fontType)
                        }}
                      >
                        Apply
                      </LoadingButton>
                    </Box>
                  </Box>
                </Collapse>
              </Box>
            )
          })}
      </Box>
    </Container>
  )
}

export default Jobs
