// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

const Step2 = () => {
  // State
  const [isView, setIsView] = useState<boolean>(false)

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography>Would you like to take orders & table reservations through an existing website?</Typography>
        <ButtonGroup sx={{ mb: { xs: 2, sm: 0 }, border: theme => `1px solid ${theme.palette.divider}` }}>
          <Button
            variant={isView ? 'contained' : 'outlined'}
            color='success'
            sx={{ border: 'none !important' }}
            onClick={() => setIsView(true)}
          >
            Yes
          </Button>
          <Button
            variant={!isView ? 'contained' : 'outlined'}
            color='error'
            sx={{ border: 'none !important' }}
            onClick={() => setIsView(false)}
          >
            No
          </Button>
        </ButtonGroup>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <LoadingButton variant='contained' size='large' sx={{ fontWeight: 700, mb: 4 }}>
            See MENU & Order
          </LoadingButton>
          <LoadingButton variant='contained' size='large' color='info' sx={{ fontWeight: 700 }}>
            Table Reservation
          </LoadingButton>
          <Typography sx={{ fontSize: '1.2rem', width: '10rem', mt: 4 }}>Add the buttons to your website</Typography>
        </Box>
        <Box component={'img'} src='/images/Setup/Website.png' sx={{ width: '20rem', height: '15rem' }} />
      </Box>
    </>
  )
}

export default Step2
