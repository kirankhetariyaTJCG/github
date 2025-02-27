// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'

// Third Party Imports
import { useSelector } from 'react-redux'

// Custom Imports
import SpecialOffersView from '../HomePage/SpecialOffers'
import SocialMedia from '../HomePage/SocialMedia'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import { SECTION_NAME } from '@/Helper/Constants/WebsiteEditor'

const SpecialOffers = () => {
  // Hooks
  const colorData = useSelector((state: any) => state.website.website.color)
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const sections = useSelector((state: any) => state.website.website.sections)
  const socialMediaData = sections?.find((item: any) => item?.type === SECTION_NAME.SOCIAL_MEDIA)

  return (
    <>
      <Container maxWidth='md' sx={{ textAlign: 'center', mb: 16 }}>
        <Box component={Icon} icon={'mdi:food'} sx={{ color: colorData?.main, fontSize: 45 }} />
        <Typography
          variant='h3'
          sx={{
            fontWeight: 600,
            color: colorData?.main,
            ...AppUtils.getFontFamily(fontType)
          }}
        >
          Satisfy Your Cravings with Our Tasty Deals
        </Typography>
        <Divider sx={{ bgcolor: colorData?.main, width: '6rem', mx: 'auto', my: 2 }} />
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, color: '#4D4D4D', ...AppUtils.getFontFamily(fontType) }}>
          Why settle for the usual? Our handpicked promotions are crafted just for you—giving you irresistible discounts
          on your favorite meals.
        </Typography>
        <Typography
          sx={{ fontSize: '1.1rem', fontWeight: 500, color: '#4D4D4D', ...AppUtils.getFontFamily(fontType), mt: 4 }}
        >
          From quick bites to full feasts, enjoy the savings while they last, and leave the cooking to us!
        </Typography>
      </Container>
      <SpecialOffersView />
      <SocialMedia section={socialMediaData} />
    </>
  )
}

export default SpecialOffers
