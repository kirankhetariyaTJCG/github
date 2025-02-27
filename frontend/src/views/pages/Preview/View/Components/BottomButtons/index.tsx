// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide'
import LoadingButton from '@mui/lab/LoadingButton'
import useScrollTrigger from '@mui/material/useScrollTrigger'

// Third Party Imports
import { useSelector } from 'react-redux'

// Styles Imports
import '../../../style.module.css'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const BottomButtons = () => {
  // Hooks
  const colorData = useSelector((state: any) => state.website.website.color)
  const fontType = useSelector((state: any) => state.website.website.fonts)
  const trigger = useScrollTrigger({ threshold: 900, disableHysteresis: true })
  const restaurant = useSelector((state: any) => state.website.website.restaurant)

  // Media Query
  const md = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  return (
    <>
      {md && (
        <Slide in={trigger} direction='up'>
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              boxShadow: theme => theme.shadows[3],
              zIndex: 100
            }}
          >
            {restaurant?.has_table_reservation &&
              <LoadingButton
                data-rid={restaurant?._id}
                data-is-table="true"
                variant='contained'
                fullWidth
                sx={{
                  borderRadius: 0,
                  py: 4,
                  bgcolor: `${colorData?.main} !important`,
                  color: `${colorData?.main === '#FF5833' || colorData?.main === '#1E3446' ? '#fff' : colorData?.btnTextColor
                    } !important`,
                  ...AppUtils.getFontFamily(fontType)
                }}
              >
                Table Reservation
              </LoadingButton>
            }
            <LoadingButton
              data-rid={restaurant?._id}
              variant='contained'
              fullWidth
              sx={{
                borderRadius: 0,
                py: 4,
                bgcolor: `${colorData?.secondary} !important`,
                color: `${colorData?.btnTextColor} !important`,
                ...AppUtils.getFontFamily(fontType)
              }}
            >
              See Menu & Order
            </LoadingButton>
          </Box>
        </Slide>
      )}
    </>
  )
}

export default BottomButtons
