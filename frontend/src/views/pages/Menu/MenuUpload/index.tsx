'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'

// Third Party Imports
import { toast } from 'react-toastify'

// Custom Imports
import UploadFile from './UploadFile'

// Icon Imports
import Icon from '@/@core/components/Icon'

const UploadView = () => {
  // State
  const [isView, setIsView] = useState<boolean>(false)
  const [step, setStep] = useState<number>(0)

  return (
    <>
      <Card sx={{ width: '100%', height: '100%' }}>
        <Box
          sx={{
            p: 4,
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
            {step > 0 && (
              <IconButton
                color='primary'
                sx={{ mr: 4, bgcolor: theme => theme.palette.primary.lightOpacity }}
                onClick={() => setStep(step - 1)}
              >
                <Icon icon={'ion:arrow-back-outline'} />
              </IconButton>
            )}
            <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Menu upload (optional)</Typography>
          </Box>
          <LoadingButton
            variant='contained'
            onClick={() => (isView ? setStep(step + 1) : toast.error('Please Select Yes to insert menu'))}
          >
            Next
          </LoadingButton>
        </Box>
        <Box sx={{ p: 6, width: { sm: '42rem' }, mx: 'auto' }}>
          <Collapse in={step === 0}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' }
              }}
            >
              <Typography>Do you want us to insert your menu?</Typography>
              <ButtonGroup sx={{ border: theme => `1px solid ${theme.palette.divider}` }}>
                <Button
                  sx={{ border: 'none !important' }}
                  color='success'
                  variant={isView ? 'contained' : 'outlined'}
                  onClick={() => setIsView(true)}
                >
                  Yes
                </Button>
                <Button
                  sx={{ border: 'none !important' }}
                  color='error'
                  variant={!isView ? 'contained' : 'outlined'}
                  onClick={() => setIsView(false)}
                >
                  No
                </Button>
              </ButtonGroup>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Typography sx={{ fontSize: '1.2rem', mb: 2 }}>Upload your menu & let us do all the work</Typography>
                <Box component={Icon} icon={'vscode-icons:file-type-word'} fontSize={40} />
                <Box component={Icon} sx={{ mx: 2 }} icon={'vscode-icons:file-type-excel'} fontSize={40} />
                <Box component={Icon} icon={'vscode-icons:file-type-pdf2'} fontSize={40} />
              </Box>
              <Box component={'img'} src='/images/Setup/MenuSetup.svg' sx={{ width: '15rem', height: '15rem' }} />
            </Box>
          </Collapse>
          <Collapse in={step === 1}>
            <UploadFile />
          </Collapse>
          <Collapse in={step === 2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component={Icon}
                icon={'fa-solid:thumbs-up'}
                fontSize={40}
                sx={{ color: theme => theme.palette.success.main }}
              />
              <Typography sx={{ fontWeight: 700, ml: 4 }}>So far so good!</Typography>
            </Box>
            <Divider sx={{ my: 6 }} />
            <Typography>Your files are being reviewed.</Typography>
          </Collapse>
        </Box>
      </Card>
    </>
  )
}

export default UploadView
