'use client'

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
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'

// Icon Imports
import Icon from '@/@core/components/Icon'

const StatusView = () => {
  // State
  const [step, setStep] = useState<number>(1)

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2, height: 'calc(100vh - 6.5rem)' }}
    >
      <Card sx={{ width: { xs: '100%', lg: '65%' }, height: '100%', overflow: 'auto' }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
            {step > 1 && (
              <IconButton
                color='primary'
                sx={{ mr: 4, bgcolor: theme => theme.palette.primary.lightOpacity }}
                onClick={() => setStep(step - 1)}
              >
                <Icon icon={'ion:arrow-back-outline'} />
              </IconButton>
            )}
            <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Website Quality</Typography>
          </Box>
          {step === 1 && (
            <LoadingButton
              variant='contained'
              sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
              onClick={() => setStep(step + 1)}
            >
              Fix This
            </LoadingButton>
          )}
        </Box>
        <Box
          sx={{
            p: 6,
            width: 'auto',
            mx: 'auto'
          }}
        >
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 setStep={setStep} />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 setStep={setStep} step={step} />}
          {step === 5 && <Step5 setStep={setStep} />}
        </Box>
      </Card>
    </Box>
  )
}

export default StatusView
