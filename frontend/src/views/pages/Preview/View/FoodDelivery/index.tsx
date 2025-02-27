// MUI Imports
import { Box, Typography, Divider, Container } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'

// Custom Imports
import Delivery from '../HomePage/Delivery'
import SpecialOffers from '../HomePage/SpecialOffers'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import { SECTION_NAME } from '@/Helper/Constants/WebsiteEditor'

const FoodDelivery = () => {
  // Hooks
  const colorData = useSelector((state: any) => state.website.website.color)
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const sections = useSelector((state: any) => state.website.website.sections)
  const deliverySection = sections?.find((item: any) => item?.type === SECTION_NAME.DELIVERY_ZONE)

  return (
    <>
      <Container maxWidth='lg' sx={{ textAlign: 'center', mb: 16 }}>
        <Box component={Icon} icon={'ic:round-delivery-dining'} sx={{ color: colorData?.main, fontSize: 45 }} />
        <Typography
          variant='h3'
          sx={{
            fontWeight: 600,
            color: colorData?.main,
            ...AppUtils.getFontFamily(fontType)
          }}
        >
          Takeaway Food & Delivery
        </Typography>
        <Divider sx={{ bgcolor: colorData?.main, width: '6rem', mx: 'auto', my: 2 }} />
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, color: '#4D4D4D', ...AppUtils.getFontFamily(fontType) }}>
          We're located in Amsterdam and are delighted to take your online order.
        </Typography>
        <Typography
          sx={{ fontSize: '1.1rem', fontWeight: 500, color: '#4D4D4D', ...AppUtils.getFontFamily(fontType), mt: 4 }}
        >
          Take your time to browse our interactive online menu and place the order when ready. It takes us about a
          minute to confirm your order and give you an estimated ready time.
        </Typography>
      </Container>
      <Delivery section={deliverySection} />
      <SpecialOffers />
    </>
  )
}

export default FoodDelivery
