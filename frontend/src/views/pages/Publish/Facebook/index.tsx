'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useState } from 'react'

// MUI Imports
import { Card, Box, LoadingButton, Typography, IconButton, TextField, InputAdornment } from '@/Helper/MUIImports'

// Third Party Imports
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import UrlHelper from '@/Helper/Url'

const FacebookView = () => {
  // State
  const [step, setStep] = useState<number>(1)

  // Hooks
  const router = useRouter()
  const restaurant = useSelector((state: any) => state.restaurant.restaurant)
  const link = UrlHelper.menuLink.replace('{id}', restaurant?._id)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Card
        sx={{
          width: '35rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            p: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
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
              {step === 4 ? 'Facebook Hot Link' : 'Facebook Shop Now'}
            </Typography>
          </Box>
          <LoadingButton
            variant='contained'
            sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
            onClick={() => (step !== 4 ? setStep(step + 1) : router.push('/setup/publish/sales-optimized-website'))}
          >
            Next
          </LoadingButton>
        </Box>
        <Box sx={{ p: 6, width: '100%' }}>
          {step === 1 && (
            <Box>
              <Box component={'img'} src='/images/Setup/addFacebookButton.png' sx={{ width: '100%', height: 'auto' }} />
              <Typography sx={{ fontSize: '1rem', my: 4, textAlign: 'center' }}>
                Add a direct link to your menu on your restaurant's Facebook page.
              </Typography>
            </Box>
          )}
          {step === 2 && (
            <Box sx={{ textAlign: 'center' }}>
              <Box
                component={'img'}
                src='/images/Setup/fbPageButton.png'
                sx={{ width: '100%', height: 'auto' }}
              />
              <Typography sx={{ fontSize: '1rem', mt: 4, textAlign: 'center' }}>
                Go to your Facebook page and edit your call to action button.
              </Typography>
            </Box>
          )}
          {step === 3 && (
            <Box>
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                value={link}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        onClick={() =>
                          navigator.clipboard
                            .writeText(link)
                            .then(() => toast.success('Link Copied to clipboard'))
                            .catch(() => toast.success('Faild to copy link'))
                        }
                      >
                        <Icon icon={'icon-park-twotone:copy'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Box component={'img'} src='/images/Setup/orderFood.png' sx={{ width: '100%', height: 'auto', my: 2 }} />
              <Typography sx={{ fontSize: '1rem', textAlign: 'center' }}>
                Add this link to Facebook's 'Start Order' button to give your food clients access to your online menu.
              </Typography>
            </Box>
          )}
          {step === 4 && (
            <>
              <Typography sx={{ fontWeight: 500 }}>
                Use this personalized link when posting on Facebook. This link works on desktop, mobile, tablet and
                helps you sell more through Facebook.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <Box component={'img'} src='/images/Setup/CreatePost.svg' sx={{ width: '19.5em', height: '19.5em' }} />
              </Box>
              <TextField
                sx={{ mt: 4 }}
                fullWidth
                value={link}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        onClick={() =>
                          navigator.clipboard
                            .writeText(link)
                            .then(() => toast.success('Link Copied to clipboard'))
                            .catch(() => toast.success('Faild to copy link'))
                        }
                      >
                        <Icon icon={'icon-park-twotone:copy'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </>
          )}
        </Box>
      </Card>
    </Box>
  )
}

export default FacebookView
