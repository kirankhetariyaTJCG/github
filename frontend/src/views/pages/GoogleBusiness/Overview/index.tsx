'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'

// Custom Imports
import Step1 from './Step1'
import Step3 from './Step3'

// Icon Imports
import Icon from '@/@core/components/Icon'

const OverView = () => {
  // State
  const [step, setStep] = useState<number>(1)
  const [domain, setDomain] = useState('')
  const [value, setValue] = useState<number | null>(null)

  // Hooks
  const router = useRouter()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Card sx={{ width: '45rem' }}>
        <Box
          sx={{
            p: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: { xs: 2, sm: 0 } }}>
            {step > 1 && (
              <IconButton
                color='primary'
                sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                onClick={() => setStep(step - 1)}
              >
                <Icon icon={'ion:arrow-back-outline'} />
              </IconButton>
            )}
            <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
              {step === 1 ? 'Google Business Listing' : step === 2 ? 'Set Your Domain' : 'Choose your Company'}
            </Typography>
          </Box>
          <LoadingButton
            variant='contained'
            onClick={() => (step === 3 ? router.replace('/marketing-tools/google-business/status') : setStep(step + 1))}
          >
            {step === 3 ? 'Submit' : 'Next'}
          </LoadingButton>
        </Box>
        <Box sx={{ p: 4 }}>
          {(step === 1 || step === 2) && <Step1 step={step} setStep={setStep} domain={domain} setDomain={setDomain} />}
          {step === 3 && <Step3 value={value} setValue={setValue} />}
        </Box>
      </Card>
    </Box>
  )
}

export default OverView
