'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'

// Icon Imports
import Icon from '@/@core/components/Icon'

const OverView = () => {
  // State
  const [step, setStep] = useState<number>(1)

  // Hooks
  const router = useRouter()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 20 }}>
      <Card sx={{ width: { xs: '100%', lg: '65%' }, height: { xs: '100%', lg: '70%' } }}>
        <Box
          sx={{
            p: 4,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'row' }, alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
            {step > 1 && (
              <IconButton
                color='primary'
                sx={{ mr: 4, bgcolor: theme => theme.palette.primary.lightOpacity }}
                onClick={() => setStep(step - 1)}
              >
                <Icon icon={'ion:arrow-back-outline'} />
              </IconButton>
            )}
            <Typography sx={{ fontWeight: 600, fontSize: '1.2rem' }}>Kickstarter</Typography>
          </Box>
          <LoadingButton
            variant='contained'
            onClick={() => (step === 3 ? router.push('/marketing-tools/kick-starter/first-promo') : setStep(step + 1))}
          >
            Next
          </LoadingButton>
        </Box>
        <Divider />
        <Box sx={{ p: 6, width: { sm: '42rem' }, mx: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4
            }}
          >
            <Box>
              {/* {step === 3 && <Typography sx={{ fontWeight: 500, mb: 4 }}>Immediate effects:</Typography>} */}
              <Box sx={{ display: 'flex' }}>
                {/* {step === 3 && (
                  <Box
                    component={Icon}
                    icon={'ph:check-fat-fill'}
                    sx={{ mr: 2, color: theme => theme.palette.success.main }}
                  />
                )} */}
                <Typography sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
                  {step === 1
                    ? 'Encourage first order'
                    : step === 2
                    ? 'Invite clients to order online'
                    : 'Immediate effects:'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', my: 3 }}>
                {step === 3 && (
                  <Box
                    component={Icon}
                    fontSize={35}
                    icon={'ph:check-fat-fill'}
                    sx={{ mr: 2, color: theme => theme.palette.success.main }}
                  />
                )}
                <Typography sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
                  {step === 1
                    ? 'Persuade your clients into placing their first online order.'
                    : step === 2
                    ? "Your offline clients don't know your restaurant is taking online orders?"
                    : 'Pocket the fees commissioned by 3rd party portals for your regular clients'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                {step == 3 && (
                  <Box
                    component={Icon}
                    icon={'ph:check-fat-fill'}
                    sx={{ mr: 2, color: theme => theme.palette.success.main }}
                  />
                )}
                <Typography sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
                  {step === 1
                    ? 'Offering a first-time promo is a great type of seal-the-deal strategy that can turn visitors into recurring customers.'
                    : step === 2
                    ? 'Announcing them via an email / sms will help you kickstart your online sales, as of right now.'
                    : 'Expand your customer base and get repeat business'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 2 }}>
                {step == 3 && (
                  <Box
                    component={Icon}
                    icon={'ph:check-fat-fill'}
                    sx={{ fontSize: '3.1rem', mr: 2, color: theme => theme.palette.success.main }}
                  />
                )}
                <Typography sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
                  {step === 3 &&
                    'Offering a first-time promo is a great type of seal-the-deal strategy that can turn visitors into recurring customers.'}
                </Typography>
              </Box>
            </Box>
            <Box
              component={'img'}
              src={`/images/KickStarter/${step === 1 ? 'FirstPromo.png' : step === 2 ? 'OrderOnline.png' : 'Chef.png'}`}
              sx={{ width: 250, height: 200 }}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default OverView
