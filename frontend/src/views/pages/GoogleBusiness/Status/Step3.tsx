// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'

// Custom Imports
import Instruction from './Instruction'

// Icon Imports
import Icon from '@/@core/components/Icon'

interface Props {
  setStep: (step: number) => void
}

const Step3 = (props: Props) => {
  // Props
  const { setStep } = props

  // State
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: { sm: '50%' } }}>
          <Typography sx={{ fontWeight: 500 }}>
            To be able to update your location we need to be added as Managers on the location.
          </Typography>
          <Typography sx={{ fontWeight: 500, mb: 4 }}>
            Follow these step by step instructions on how to add a user on the location.
          </Typography>
          <LoadingButton sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }} onClick={() => setOpen(true)}>
            See Instructions
          </LoadingButton>
          <Typography sx={{ fontSize: '1.3rem', mt: 4 }}>
            Waiting for you to finish this step in Google Business
          </Typography>
        </Box>
        <Box sx={{ width: { sm: '50%' } }}>
          <Box
            sx={{
              mx: 'auto',
              p: 8,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'ceter',
              bgcolor: theme => theme.palette.info.lightOpacity,
              width: 'max-content'
            }}
          >
            <Box
              component={Icon}
              icon={'mdi:google-my-business'}
              fontSize={180}
              sx={{ color: theme => theme.palette.info.main }}
            />
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 6 }} />
      <LoadingButton
        size='large'
        sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
        onClick={() => setStep(4)}
      >
        I’m not the location owner
      </LoadingButton>

      <Instruction open={open} setOpen={setOpen} />
    </>
  )
}

export default Step3
