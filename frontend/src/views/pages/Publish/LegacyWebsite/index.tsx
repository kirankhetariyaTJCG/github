'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, Card, Collapse, LoadingButton, Typography, Switch } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import ButtonsCode from './ButtonsCode'

// Icon Imports
import Icon from '@/@core/components/Icon'
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'
import AppUtils from '@/Helper/AppUtils'

const LegacyWebsiteView = () => {
  // State
  const [isView, setIsView] = useState<boolean>(false)
  const [isDone, setIsDone] = useState<boolean>(false)
  const [isCode, setIsCode] = useState<boolean>(false)

  // Hooks
  const { restaurant, loading } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object?.keys(restaurant)?.length > 0) {
      setIsView(restaurant?.is_code_genrated ?? false)
      setIsDone((restaurant?.is_code_genrated ?? false))
    }
  }, [restaurant])

  const handleSave = () => {
    if (!isDone) {
      dispatch(editRestaurantDetail({
        data: { is_code_genrated: true, id: restaurant?._id },
        old_restaurant_data: restaurant
      }))
      setIsDone(true)
    } else {
      setIsCode(true)
    }
  }

  return (
    <>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ width: '45rem' }}>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              borderBottom: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Publish Website Ordering</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            {!isView &&
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  pb: 4,
                  borderBottom: theme => `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography>Want to accept orders and reservations on your website?</Typography>
                <Switch checked={isView} onChange={(e: any) => setIsView(e.target.checked)} />
              </Box>
            }
            <Collapse in={!isView}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                  <LoadingButton variant='contained' sx={{ fontWeight: 700, mb: 4 }}>
                    See Menu & Order
                  </LoadingButton>
                  <LoadingButton variant='contained' color='info' sx={{ fontWeight: 700 }}>
                    Table Reservation
                  </LoadingButton>
                  <Typography sx={{ mt: 2 }}>Add the buttons to your website</Typography>
                </Box>
                <Box component={'img'} src='/images/Setup/Website.png' sx={{ width: '50%', height: 'auto' }} />
              </Box>
            </Collapse>
            <Collapse in={isView && !isDone}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: '12rem',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  {loading && <Box component={Icon} icon='svg-spinners:blocks-wave' fontSize={50} sx={{ my: 6 }} />}
                  {!loading && (
                    <Box component={'img'} src='/images/generate_website.jpg' sx={{ width: '18rem', height: 'auto' }} />
                  )}
                </Box>
                <Box
                  sx={{ pt: 4, borderTop: theme => `1px solid ${theme.palette.divider}`, textAlign: 'center', width: '100%' }}
                >
                  <LoadingButton
                    disabled={loading}
                    variant='contained'
                    onClick={handleSave}
                  >
                    Generate Code
                  </LoadingButton>
                </Box>
              </Box>
            </Collapse>
            <Collapse in={isDone}>
              <Box sx={{ display: 'flex', py: 4, gap: 4 }}>
                <Box>
                  <Box
                    component={Icon}
                    icon={'icon-park-twotone:check-one'}
                    sx={{ color: theme => theme.palette.success.main, fontSize: 80 }}
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.2rem' }}>
                    You have successfully created the <b>HTML Code</b>
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', mt: 2 }}>
                    Your HTML code has been successfully created, marking the foundation of your web page. Now, you can
                    enhance it with styles, scripts, and other elements to build a fully functional website. This is a key
                    step in bringing your online project to life, and you’re ready to move forward with further development!
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{ width: '100%', borderTop: theme => `1px solid ${theme.palette.divider}`, pt: 4, textAlign: 'center' }}
              >
                <LoadingButton variant='contained' onClick={() => setIsCode(true)}>View HTML Code</LoadingButton>
              </Box>
            </Collapse>
          </Box>
        </Card>
      </Box>

      <ButtonsCode open={isCode} setOpen={setIsCode} />
    </>
  )
}

export default LegacyWebsiteView
