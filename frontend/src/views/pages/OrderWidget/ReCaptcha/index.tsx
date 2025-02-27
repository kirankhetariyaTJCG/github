'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import { Box, Card, Typography, LoadingButton, Switch, Divider } from '@/Helper/MUIImports'

// Third Party Imports
import { useDispatch, useSelector } from 'react-redux'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const CaptchaView = () => {
  // State
  const [isCaptcha, setIsCaptcha] = useState<boolean>(false)

  // Hooks
  const router = useRouter()
  const { restaurant, loading } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object.keys(restaurant)?.length > 0) {
      setIsCaptcha(restaurant?.recaptcha_enabled)
    }
  }, [restaurant])

  const handleNext = () => {
    const data = {
      id: restaurant?._id,
      recaptcha_enabled: isCaptcha
    }
    dispatch(editRestaurantDetail({ data, old_restaurant_data: restaurant }))
    router.push('/online-ordering/integrations/catalog')
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ width: { xs: '100%', lg: '65%' } }}>
        <Box
          sx={{
            p: 4,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>ReCAPTCHA</Typography>
          <LoadingButton
            variant='contained'
            onClick={handleNext}
            loading={loading}
            loadingPosition='start'
            startIcon={<Icon icon="material-symbols:save" fontSize='5.5rem' />}>
            Save
          </LoadingButton>
        </Box>
        <Box sx={{ p: 6, width: { sm: '40rem' }, mx: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Typography>Do you want to enable ReCAPTCHA?</Typography>
            <Switch checked={isCaptcha} onChange={() => setIsCaptcha(!isCaptcha)} />

          </Box>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '1.3rem', fontWeight: 500, mb: 2 }}>
              Help protect your website from fraudulent activity, spam and abuse without creating friction.
            </Typography>
            <Box component={'img'} src='/images/ReCaptcha.svg' sx={{ width: '25rem', height: 'auto' }} />
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default CaptchaView
