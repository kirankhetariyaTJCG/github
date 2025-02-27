'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'

// Custom Imports
import Step1 from './Step1'
import Step2 from './Step2'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './Step7'

// Icon Imports
import Icon from '@/@core/components/Icon'

const OverView = () => {
  // State
  const [step, setStep] = useState<number>(1)
  const [isView, setIsView] = useState<boolean>(false)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Card sx={{ width: '45rem' }}>
        <Box
          sx={{
            p: 4,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
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
            <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Autopilot</Typography>
          </Box>
          <LoadingButton variant='contained' onClick={() => (step !== 7 ? setStep(step + 1) : setStep(1))}>
            Next
          </LoadingButton>
        </Box>
        {step === 1 && <Step1 />}
        {(step === 2 || step === 3) && <Step2 step={step} />}
        {step === 4 && <Step4 isView={isView} setIsView={setIsView} />}
        {step === 5 && <Step5 />}
        {step === 6 && <Step6 />}
        {step === 7 && <Step7 />}
      </Card>
    </Box>
  )
}

export default OverView
