'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

// Icon Imports
import Icon from '@/@core/components/Icon'

const OverView = () => {
  // State
  const [step, setStep] = useState<number>(1)

  // Hooks
  const router = useRouter()

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: '45rem' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            p: 4
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {step > 1 && (
              <IconButton
                color='primary'
                sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                onClick={() => setStep(step - 1)}
              >
                <Icon icon={'ion:arrow-back-outline'} />
              </IconButton>
            )}
            <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Promotions</Typography>
          </Box>
          <LoadingButton
            variant='contained'
            onClick={() => (step === 3 ? router.push('/marketing-tools/promotions/self-made') : setStep(step + 1))}
          >
            {step === 3 ? 'Get Started' : 'Next'}
          </LoadingButton>
        </Box>
        {step === 1 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'column',
              p: 4
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: '1.5rem', mb: 6 }}>
              Make promo deals and clients will:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
              <Box
                sx={{
                  textAlign: 'center',
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    p: 2,
                    borderBottom: theme => `1px solid ${theme.palette.divider}`
                  }}
                >
                  Spend more per order
                </Typography>
                <Box
                  component={'img'}
                  sx={{ width: '15rem', height: '15rem', p: 2 }}
                  src='/images/KickStarter/Shop.svg'
                />
              </Box>
              <Box
                sx={{
                  textAlign: 'center',
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    p: 2,
                    borderBottom: theme => `1px solid ${theme.palette.divider}`
                  }}
                >
                  Order more often
                </Typography>
                <Box
                  component={'img'}
                  sx={{ width: '15rem', height: '15rem', p: 2 }}
                  src='/images/KickStarter/OrderMore.svg'
                />
              </Box>
            </Box>
          </Box>
        )}
        {(step === 2 || step === 3) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
              textAlign: 'center',
              p: 4
            }}
          >
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 6 }}>
              {step === 2 ? 'How clients see promo deals on mobile' : 'How clients see promo deals on desktop'}
            </Typography>
            <Box
              component={'img'}
              src={`/images/KickStarter/${step === 2 ? 'Mobile' : 'Desktop'}.png`}
              sx={{ width: 'auto', height: '20rem' }}
            />
          </Box>
        )}
      </Card>
    </Box>
  )
}

export default OverView
