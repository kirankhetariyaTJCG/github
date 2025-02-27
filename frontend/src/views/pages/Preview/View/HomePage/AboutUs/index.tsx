// MUI Imports
import { Avatar, Box, Container, Typography, Divider } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'

// Helper Imports
import UrlHelper from '@/Helper/Url'
import AppUtils from '@/Helper/AppUtils'

const AboutUs = ({ section }: any) => {
  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)

  return (
    <Box sx={{ mb: 18, px: { xs: 4, md: 12 } }}>
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 10, sm: 20 },
            justifyContent: 'space-evenly',
            flexDirection: { xs: 'column-reverse', md: 'row' }
          }}
        >
          <Box sx={{ width: { md: '50%' }, textAlign: 'center', mx: 'auto' }}>
            <Avatar
              src={`${UrlHelper.imgPath}${section?.imgSrc}`}
              sx={{
                width: { xs: '15rem', sm: '20rem', md: '100%' },
                height: { xs: '15rem', sm: '100%' },
                boxShadow: `20px 20px 0px 0 ${colorData?.light}`,
                borderRadius: '3rem'
              }}
            />
          </Box>
          <Box sx={{ width: { md: '50%' } }}>
            <Box>
              <Typography
                variant='h1'
                sx={{
                  ...section.style?.titleSx,
                  color: colorData?.main,
                  ...AppUtils.getFontFamily(fontType)
                }}
              >
                {section?.title}
              </Typography>
              <Divider sx={{ bgcolor: colorData?.main, width: '6rem' }} />
              <Box sx={{ mt: 8 }}>
                <Typography
                  sx={{
                    color: '#000',
                    fontSize: '1rem',
                    fontWeight: 500,
                    ...AppUtils.getFontFamily(fontType)
                  }}
                  dangerouslySetInnerHTML={{ __html: section?.description }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default AboutUs
