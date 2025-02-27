// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Third Party Imports
import { useSelector } from 'react-redux'

// Custom Imports
import Order from '../../HomePage/Order'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import { SECTION_NAME } from '@/Helper/Constants/WebsiteEditor'
import UrlHelper from '@/Helper/Url'

const HeroSection = ({ pageTitle }: { pageTitle: string }) => {
  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const sections = useSelector((state: any) => state.website.website.sections)
  const heroSectionsData = sections.find((item: any) => item?.type === SECTION_NAME.STAGING)
  const heroData = heroSectionsData?.sections?.find((section: any) => section?.pageTitle === pageTitle)

  return (
    <>
      <Box sx={{ mb: 16 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            minHeight: '40rem',
            flexDirection: 'column',
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 60%),  url('${UrlHelper.imgPath}${heroData?.bgImg?.replace(/\\/g, "/")}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <Box sx={{ textAlign: 'center', py: 4, px: { xs: 4, md: 40 } }}>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '2rem', md: '2.875rem' },
                fontWeight: 700,
                color: '#fff',
                ...AppUtils.getFontFamily(fontType)
              }}
            >
              {heroData?.title}
            </Typography>
            <Typography variant='h5' sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 500, color: '#fff', ...AppUtils.getFontFamily(fontType) }}>
              {heroData?.desc}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Order />
    </>
  )
}

export default HeroSection
