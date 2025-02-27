'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import { Card, Box, Typography, IconButton, Switch, Collapse, LoadingButton } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { editRestaurantDetail, generateWebsite } from '@/redux-store/Restaurant/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const OptimizedWebsite = () => {
  // State
  const [step, setStep] = useState<number>(1)
  const [isDone, setIsDone] = useState<boolean>(false)
  const [isOptimize, setIsOptimize] = useState<boolean>(false)

  // Hooks
  const router = useRouter()
  const { restaurant, loading } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object?.keys(restaurant)?.length > 0) {
      setIsOptimize(restaurant?.enable_sales_optimization ?? false)
      setIsDone((restaurant?.enable_sales_optimization ?? false))
    }
  }, [restaurant])

  const createWebsite = async () => {
    if (!isDone) {
      const res = await generateWebsite({ restaurant_id: restaurant?._id }, dispatch)
      if (res?.success && res?.statusCode === 201) {
        dispatch(editRestaurantDetail({
          data:
          {
            enable_sales_optimization: true,
            id: restaurant?._id
          },
          old_restaurant_data: restaurant
        }))
        setIsDone(true)
      }
    } else {
      router.push(`/website-editor/?restaurant_id=${restaurant?._id}`)
    }
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: '35rem' }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {step > 1 && (
              <IconButton
                color='primary'
                sx={{ mr: 4, bgcolor: theme => theme.palette.primary.lightOpacity }}
                onClick={() => setStep(step - 1)}
              >
                <Icon icon={'ion:arrow-back-outline'} />
              </IconButton>
            )}
            <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
              {step === 3 || step === 5 ? 'Confirm Your Purchase' : 'Sales Optimized Website'}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: 6 }}>
          {!isDone &&
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                pb: 4
              }}
            >
              <Typography>Looking for a new website designed to maximize online sales?</Typography>
              <Switch
                checked={isOptimize}
                onChange={(e: any) => setIsOptimize(e.target.checked)}
              />
            </Box>
          }
          <Collapse in={isOptimize}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {!isDone && (
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
              )}
              {isDone && (
                <Box sx={{ display: 'flex', gap: 4, my: 4 }}>
                  <Box>
                    <Box
                      component={Icon}
                      icon={'icon-park-twotone:check-one'}
                      sx={{ color: theme => theme.palette.success.main, fontSize: 80 }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>Your website is generated</Typography>
                    <Typography sx={{ fontSize: '0.8rem', mt: 2 }}>
                      Your website has been successfully generated and is now ready to use. You can start exploring its
                      features, making customizations, and ensuring everything is functioning as expected. This marks the
                      first step toward building your online presence, and you’re all set to take it live!
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box
                sx={{ pt: 4, borderTop: theme => `1px solid ${theme.palette.divider}`, textAlign: 'center', width: '100%' }}
              >
                <LoadingButton
                  disabled={loading}
                  variant='contained'
                  onClick={createWebsite}
                >
                  {isDone ? 'View & Edit Your Website' : 'Generate Your Website'}
                </LoadingButton>
              </Box>
            </Box>
          </Collapse>
          <Collapse in={!isOptimize}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box component={'ul'} sx={{ pl: 4.5 }}>
                <Box component={'li'}>Online ordering seamlessly integrated</Box>
                <Box component={'li'}>Best performance on desktop, mobile and tablet</Box>
                <Box component={'li'}>Easy to find in Google and Bing</Box>
              </Box>
              <Box component={'img'} src='/images/Setup/Frame.svg' sx={{ width: '15rem', height: '15rem' }} />
            </Box>
          </Collapse>
        </Box>
      </Card>
    </Box>
  )
}

export default OptimizedWebsite
