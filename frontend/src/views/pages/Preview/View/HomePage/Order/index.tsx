// MUI Imports
import { Box, Typography, Container, LoadingButton } from '@/Helper/MUIImports'

// Third party Imports
import { useSelector } from 'react-redux'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const Order = () => {
  // Hooks
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const colorData = useSelector((state: any) => state.website.website.color)
  const restaurant = useSelector((state: any) => state.website.website.restaurant)

  return (
    <Container maxWidth='lg' sx={{ mb: 16 }}>
      <Box
        sx={{
          borderRadius: '10px',
          bgcolor: colorData?.main,
          p: 6,
          textAlign: 'center',
          mx: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <Box
          component={'img'}
          src='/images/preview/background_1.svg'
          sx={{
            width: '12rem',
            height: 'auto',
            position: 'absolute',
            left: 0,
            top: 0,
            display: { xs: 'none', md: 'block' }
          }}
        />
        <Box
          component={'img'}
          src='/images/preview/dots.svg'
          sx={{
            width: '4rem',
            height: 'auto',
            position: 'absolute',
            right: '1rem',
            bottom: '1rem',
            display: { xs: 'none', md: 'block' }
          }}
        />
        <Box sx={{ width: { md: '50rem' } }}>
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '1.5rem', md: '2.875rem' },
              fontWeight: 600,
              color: '#fff',
              ...AppUtils.getFontFamily(fontType)
            }}
          >
            Your order will be confirmed in REAL-TIME
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
            mx: 'auto',
            mt: 4,
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          {restaurant?.has_table_reservation &&
            <LoadingButton
              data-rid={restaurant?._id}
              data-is-table="true"
              size='large'
              variant='outlined'
              sx={{
                borderColor: '#fff !important',
                bgcolor: `${colorData?.main} !important`,
                color: '#fff',
                py: 4,
                ...AppUtils.getFontFamily(fontType)
              }}
            >
              Table Reservation
            </LoadingButton>
          }
          <LoadingButton
            data-rid={restaurant?._id}
            size='large'
            variant='contained'
            sx={{
              bgcolor: `${colorData?.secondary} !important`,
              color: colorData?.btnTextColor,
              py: 3.8,
              borderWidth: '2px !important',
              ...AppUtils.getFontFamily(fontType)
            }}
          >
            See Menu & Order
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  )
}

export default Order
